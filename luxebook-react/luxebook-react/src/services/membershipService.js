/**
 * Membership Service
 * Handles transient selection state and active membership status.
 */

const PENDING_MEMBERSHIP_KEY = "luxebook_pending_membership";
const ACTIVE_MEMBERSHIP_KEY = "luxebook_active_membership";

import { authService } from "./authService";

const getUserKey = (baseKey) => {
  const user = authService.getCurrentUser();
  return user ? `${baseKey}_${user.id}` : baseKey;
};

export const membershipService = {
  /**
   * Saves a membership tier selection before authentication/payment.
   * @param {Object} tierDetails 
   */
  setPendingMembership: (tierDetails) => {
    const payload = {
      ...tierDetails,
      selectedAt: new Date().toISOString()
    };
    localStorage.setItem(getUserKey(PENDING_MEMBERSHIP_KEY), JSON.stringify(payload));
  },

  /**
   * Retrieves the currently selected pending membership.
   * @returns {Object|null}
   */
  getPendingMembership: () => {
    const data = localStorage.getItem(getUserKey(PENDING_MEMBERSHIP_KEY));
    return data ? JSON.parse(data) : null;
  },

  /**
   * Clears the pending selection.
   */
  clearPendingMembership: () => {
    localStorage.removeItem(getUserKey(PENDING_MEMBERSHIP_KEY));
  },

  /**
   * Activates a membership after successful payment.
   * @param {Object} membershipDetails 
   */
  activateMembership: (membershipDetails) => {
    const payload = {
      ...membershipDetails,
      status: "active",
      activatedAt: new Date().toISOString(),
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
    };
    localStorage.setItem(getUserKey(ACTIVE_MEMBERSHIP_KEY), JSON.stringify(payload));
    membershipService.clearPendingMembership();
  },

  /**
   * Retrieves the user's active membership.
   * @returns {Object|null}
   */
  getActiveMembership: () => {
    const data = localStorage.getItem(getUserKey(ACTIVE_MEMBERSHIP_KEY));
    return data ? JSON.parse(data) : null;
  }
};
