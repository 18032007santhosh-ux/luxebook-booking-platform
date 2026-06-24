import { supabase } from './supabaseClient';
import { authService } from './authService';

export const membershipService = {
  /**
   * Saves a membership tier selection.
   * @param {Object} tierDetails 
   */
  setPendingMembership: async (tierDetails) => {
    const user = authService.getCurrentUser();
    localStorage.setItem("luxebook_pending_membership_tier", JSON.stringify(tierDetails));

    if (user) {
      await supabase.from('memberships').delete().eq('user_id', user.id).eq('status', 'pending');

      const { error } = await supabase
        .from('memberships')
        .insert({
          user_id: user.id,
          tier_id: tierDetails.id.toLowerCase(),
          status: 'pending',
          selected_at: new Date().toISOString()
        });
      if (error) console.error("Error setting pending membership in DB:", error);
    }
  },

  /**
   * Retrieves the currently selected pending membership.
   */
  getPendingMembership: () => {
    const data = localStorage.getItem("luxebook_pending_membership_tier");
    return data ? JSON.parse(data) : null;
  },

  /**
   * Clears the pending selection.
   */
  clearPendingMembership: async () => {
    localStorage.removeItem("luxebook_pending_membership_tier");
    const user = authService.getCurrentUser();
    if (user) {
      await supabase.from('memberships').delete().eq('user_id', user.id).eq('status', 'pending');
    }
  },

  /**
   * Activates a membership after successful payment in Supabase.
   */
  activateMembership: async (membershipDetails) => {
    const user = authService.getCurrentUser();
    if (!user) return;

    const tierId = (membershipDetails.id || membershipDetails.tierId || 'signature').toLowerCase();

    await supabase.from('memberships')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .eq('status', 'active');

    const { data, error } = await supabase
      .from('memberships')
      .insert({
        user_id: user.id,
        tier_id: tierId,
        status: 'active',
        selected_at: new Date().toISOString(),
        activated_at: new Date().toISOString(),
        expires_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error("Error activating membership:", error);
      throw new Error(error.message);
    }

    const cachedData = {
      id: tierId,
      name: membershipDetails.name || (tierId === 'gold' ? 'Gold Reserve' : tierId === 'onyx' ? 'Onyx Elite' : 'Signature Club'),
      tier: tierId,
      status: 'active',
      activatedAt: data.activated_at,
      expiresAt: data.expires_at
    };

    localStorage.setItem(`luxebook_active_membership_${user.id}`, JSON.stringify(cachedData));
    localStorage.removeItem("luxebook_pending_membership_tier");
    return cachedData;
  },

  /**
   * Retrieves the user's active membership from local cache.
   */
  getActiveMembership: () => {
    const user = authService.getCurrentUser();
    if (!user) return null;
    const data = localStorage.getItem(`luxebook_active_membership_${user.id}`);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Syncs active membership from Supabase.
   */
  syncActiveMembership: async (userId) => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from('memberships')
      .select('*, membership_tiers(name)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (error) {
      console.error("Error syncing active membership:", error);
      return null;
    }

    if (data) {
      const cachedData = {
        id: data.tier_id,
        name: data.membership_tiers?.name || data.tier_id,
        tier: data.tier_id,
        status: 'active',
        activatedAt: data.activated_at,
        expiresAt: data.expires_at
      };
      localStorage.setItem(`luxebook_active_membership_${userId}`, JSON.stringify(cachedData));
      return cachedData;
    } else {
      localStorage.removeItem(`luxebook_active_membership_${userId}`);
      return null;
    }
  }
};
