-- =============================================================================
-- LuxeBook — localStorage → PostgreSQL Migration Helper
-- =============================================================================
-- This script documents and demonstrates how to migrate data from the
-- current localStorage-based frontend state into the PostgreSQL schema.
--
-- IMPORTANT: This is a REFERENCE SCRIPT, not a direct executable.
-- In practice, you would run a one-time Node.js migration script that:
--   1. Exports localStorage state from browser (or exports mock/test data)
--   2. Transforms the JSON shapes documented here
--   3. Inserts using parameterized queries (never raw SQL with user data)
--
-- Run AFTER: schema.sql, seed.sql
-- =============================================================================


-- =============================================================================
-- SECTION 1: localStorage Key Inventory
-- =============================================================================
-- The following localStorage keys are used by the React app.
-- Each maps to a database entity as documented below.
-- =============================================================================

/*
 KEY                                     → TABLE / RESOLUTION
 ─────────────────────────────────────────────────────────────────────
 luxebook_auth                           → ELIMINATED (replaced by JWT/session)
 luxebook_user                           → users table
 luxebook_reservations_${user.id}        → bookings table
 luxebook_reservations                   → bookings (guest, user_id = NULL)
 luxebook_transaction_history_${user.id} → transactions table
 luxebook_latest_transaction_${user.id}  → ELIMINATED (use v_latest_transaction_per_user view)
 luxebook_active_membership_${user.id}   → memberships table (status = 'active')
 luxebook_pending_membership_${user.id}  → memberships table (status = 'pending')
 luxebook_portfolio                      → portfolio_items table
 luxebook_reviews_${user.id}             → reviews table
 ─────────────────────────────────────────────────────────────────────
*/


-- =============================================================================
-- SECTION 2: User Migration
-- =============================================================================
-- Source: authService.js — localStorage key: 'luxebook_user'
--
-- localStorage shape:
-- {
--   "id":    "usr_abc123xyz",      ← legacy_id
--   "name":  "john",               ← derived from email, replace with real name
--   "email": "john@example.com",
--   "role":  "member"
-- }
-- =============================================================================

-- Insert migrated user (parameterized in real migration script)
-- $legacy_id = parsed localStorage user.id (e.g. "usr_abc123xyz")
-- $name      = parsed localStorage user.name
-- $email     = parsed localStorage user.email
-- $role      = parsed localStorage user.role ('member' | 'admin')

/*
INSERT INTO users (legacy_id, name, email, role)
VALUES ($legacy_id, $name, $email, $role)
ON CONFLICT (email) DO UPDATE SET
    legacy_id  = EXCLUDED.legacy_id,
    name       = EXCLUDED.name,
    role       = EXCLUDED.role,
    updated_at = NOW()
RETURNING id;
-- Store the returned UUID for subsequent FK references.
*/


-- =============================================================================
-- SECTION 3: Booking Migration
-- =============================================================================
-- Source: CalendarBooking.jsx — localStorage key: 'luxebook_reservations_${user.id}'
--
-- localStorage shape per booking:
-- {
--   "bookingId":    "LB-77821",
--   "serviceId":    1,              ← maps to services.legacy_id
--   "serviceName":  "Signature Grooming",
--   "duration":     "75 Minutes",
--   "price":        185,
--   "date":         "Friday, October 04, 2024",  ← needs parsing!
--   "time":         "09:00 AM",                  ← needs 24h conversion
--   "customerName": "John Doe",
--   "customerEmail":"john@example.com",
--   "customerPhone": "+1555000000",
--   "status":       "Confirmed",
--   "timestamp":    "2024-10-01T12:00:00.000Z"
-- }
--
-- CRITICAL MIGRATION STEPS:
--   1. Parse date string "Friday, October 04, 2024" → 2024-10-04 (DATE)
--   2. Parse time string "09:00 AM" → 09:00:00 (TIME, 24h format)
--   3. Resolve serviceId integer → services.id UUID via legacy_id
--   4. Derive status: if date < NOW() and not cancelled → 'completed'
--                     if date >= NOW() and not cancelled → 'upcoming'
--                     if was 'cancelled' → 'cancelled'
--   5. Compute tax_amount = ROUND(price * 0.08) (matches CalendarBooking.jsx)
-- =============================================================================

-- Reference implementation of date parsing (PostgreSQL):
-- SELECT TO_DATE('October 04, 2024', 'Month DD, YYYY');
-- → 2024-10-04

-- Reference implementation of time parsing (PostgreSQL):
-- SELECT TO_TIMESTAMP('09:00 AM', 'HH:MI AM')::TIME;
-- → 09:00:00

-- Reference implementation of status derivation:
-- CASE
--   WHEN original_status = 'cancelled' THEN 'cancelled'
--   WHEN booking_date < CURRENT_DATE   THEN 'completed'
--   ELSE 'upcoming'
-- END

/*
INSERT INTO bookings (
    booking_ref, user_id, service_id,
    service_name, service_duration, base_price, tax_amount,
    booking_date, booking_time,
    guest_name, guest_email, guest_phone,
    status, created_at
)
SELECT
    $booking_ref,
    (SELECT id FROM users WHERE legacy_id = $user_legacy_id),
    (SELECT id FROM services WHERE legacy_id = $service_legacy_id),
    $service_name,
    $service_duration,
    $price,
    ROUND($price * 0.08),
    TO_DATE($date_without_weekday, 'Month DD, YYYY'),
    TO_TIMESTAMP($time_string, 'HH:MI AM')::TIME,
    $customer_name,
    $customer_email,
    $customer_phone,
    CASE
        WHEN $original_status = 'cancelled' THEN 'cancelled'
        WHEN TO_DATE($date_without_weekday, 'Month DD, YYYY') < CURRENT_DATE THEN 'completed'
        ELSE 'upcoming'
    END,
    $timestamp::TIMESTAMPTZ
ON CONFLICT (booking_ref) DO NOTHING;
*/

-- Helper: strip weekday prefix from date string
-- 'Friday, October 04, 2024' → 'October 04, 2024'
-- In Node.js: dateStr.split(', ').slice(1).join(', ')
-- In PostgreSQL (approximate): REGEXP_REPLACE(date_str, '^[^,]+, ', '')


-- =============================================================================
-- SECTION 4: Transaction Migration
-- =============================================================================
-- Source: paymentService.js — localStorage key: 'luxebook_transaction_history_${user.id}'
--
-- localStorage shape per transaction:
-- {
--   "id":       "TXN-1700000000000-A1B2C3",
--   "amount":   5000,
--   "currency": "USD",
--   "item":     "Signature Club",      ← membership tier name OR service title
--   "date":     "2024-10-01T12:00:00.000Z",
--   "status":   "COMPLETED",
--   "last4":    "8892"
-- }
--
-- MIGRATION STEPS:
--   1. Determine if 'item' matches a membership tier name → set membership_id
--      OR if 'item' matches a service title → set booking_id
--   2. Preserve original 'id' as the PRIMARY KEY (VARCHAR(50))
-- =============================================================================

/*
INSERT INTO transactions (id, user_id, booking_id, amount, currency, item_name, card_last4, status, transacted_at)
VALUES (
    $txn_id,
    (SELECT id FROM users WHERE legacy_id = $user_legacy_id),
    NULL,   -- resolve booking_id separately after matching
    $amount,
    $currency,
    $item,
    $last4,
    $status,
    $date::TIMESTAMPTZ
)
ON CONFLICT (id) DO NOTHING;
*/


-- =============================================================================
-- SECTION 5: Membership Migration
-- =============================================================================
-- Source: membershipService.js
--
-- Active membership localStorage shape (luxebook_active_membership_${user.id}):
-- {
--   "id":          "signature",     ← tier_id
--   "name":        "Signature Club",
--   "price":       "$5,000 / year",
--   "benefits":    [...],
--   "status":      "active",
--   "activatedAt": "2024-10-01T12:00:00.000Z",
--   "expiresAt":   "2025-10-01T12:00:00.000Z",
--   "selectedAt":  "2024-10-01T10:00:00.000Z"
-- }
--
-- Pending membership localStorage shape (luxebook_pending_membership_${user.id}):
-- {
--   "id":         "gold",
--   "name":       "Gold Reserve",
--   "price":      "$15,000 / year",
--   "benefits":   [...],
--   "selectedAt": "2024-10-01T10:00:00.000Z"
-- }
-- =============================================================================

/*
-- Migrate ACTIVE membership
INSERT INTO memberships (user_id, tier_id, status, selected_at, activated_at, expires_at)
VALUES (
    (SELECT id FROM users WHERE legacy_id = $user_legacy_id),
    $tier_id,       -- e.g. 'signature'
    'active',
    $selected_at::TIMESTAMPTZ,
    $activated_at::TIMESTAMPTZ,
    $expires_at::TIMESTAMPTZ
)
ON CONFLICT DO NOTHING;

-- Migrate PENDING membership (if exists alongside active)
INSERT INTO memberships (user_id, tier_id, status, selected_at)
VALUES (
    (SELECT id FROM users WHERE legacy_id = $user_legacy_id),
    $tier_id,
    'pending',
    $selected_at::TIMESTAMPTZ
)
ON CONFLICT DO NOTHING;
*/


-- =============================================================================
-- SECTION 6: Reviews Migration
-- =============================================================================
-- Source: CustomerDashboard.jsx — localStorage key: 'luxebook_reviews_${user.id}'
--
-- localStorage shape (array):
-- [
--   {
--     "bookingId": "LB-77821",    ← matches bookings.booking_ref
--     "rating":    4,
--     "comment":   "Amazing experience!"
--   }
-- ]
-- =============================================================================

/*
INSERT INTO reviews (booking_id, user_id, rating, comment)
SELECT
    b.id,
    (SELECT id FROM users WHERE legacy_id = $user_legacy_id),
    $rating,
    $comment
FROM bookings b
WHERE b.booking_ref = $booking_ref
ON CONFLICT (booking_id, user_id) DO UPDATE SET
    rating     = EXCLUDED.rating,
    comment    = EXCLUDED.comment,
    updated_at = NOW();
*/


-- =============================================================================
-- SECTION 7: Portfolio Migration
-- =============================================================================
-- Source: PortfolioContext.jsx — localStorage key: 'luxebook_portfolio'
--
-- localStorage shape (array of items):
-- {
--   "id":            1,            ← legacy_id (or Date.now() for uploaded items)
--   "title":         "...",
--   "category":      "spa",
--   "categoryLabel": "Spa Interiors",
--   "type":          "Interior Design • Wellness Experience",
--   "isFeatured":    true,
--   "isLarge":       true,
--   "isPortrait":    false,
--   "image":         "https://..." OR "data:image/jpeg;base64,..."
-- }
--
-- WARNING: 'image' values starting with "data:" are base64-encoded images.
-- These MUST be uploaded to object storage (S3/R2/etc.) before inserting
-- the URL. Storing base64 in PostgreSQL TEXT columns is an anti-pattern
-- at scale (large row sizes, no CDN caching, no optimization).
-- =============================================================================

/*
-- For items with base64 images: upload to S3 first, then insert URL.
-- For items with external URLs: insert directly.

INSERT INTO portfolio_items
    (legacy_id, title, category_id, category_label, type_label, is_featured, is_large, is_portrait, image_url)
VALUES (
    $id::BIGINT,
    $title,
    $category,       -- already a slug
    $category_label,
    $type,
    $is_featured,
    COALESCE($is_large, FALSE),
    COALESCE($is_portrait, FALSE),
    $image_url       -- CDN URL after base64 upload, or external URL as-is
)
ON CONFLICT (legacy_id) DO UPDATE SET
    title          = EXCLUDED.title,
    is_featured    = EXCLUDED.is_featured,
    image_url      = EXCLUDED.image_url,
    updated_at     = NOW();
*/


-- =============================================================================
-- SECTION 8: Cleanup After Migration
-- =============================================================================
-- Once migration is validated and all legacy_id references are resolved,
-- remove compatibility shim columns.
-- =============================================================================

/*
-- Run these ONLY after verifying migration completeness:
ALTER TABLE services         DROP COLUMN IF EXISTS legacy_id;
ALTER TABLE portfolio_items  DROP COLUMN IF EXISTS legacy_id;
ALTER TABLE users            DROP COLUMN IF EXISTS legacy_id;
*/


-- =============================================================================
-- SECTION 9: Eliminate Redundant localStorage Keys
-- =============================================================================
-- After migration, the frontend localStorage calls should be replaced with
-- API calls. The table below maps each removal:
-- =============================================================================

/*
ELIMINATED localStorage KEY             → REPLACEMENT
────────────────────────────────────────────────────────────────────────────
luxebook_auth = "true"                  → JWT/session cookie (httpOnly)
luxebook_user                           → GET /api/auth/me
luxebook_latest_transaction_*           → SELECT * FROM v_latest_transaction_per_user WHERE user_id = ?
luxebook_portfolio                      → GET /api/portfolio
luxebook_reservations_*                 → GET /api/bookings?userId=me
luxebook_active_membership_*            → SELECT * FROM v_active_membership_per_user WHERE user_id = ?
luxebook_pending_membership_*           → SELECT * FROM memberships WHERE user_id=? AND status='pending'
luxebook_reviews_*                      → GET /api/reviews?userId=me
luxebook_transaction_history_*          → GET /api/transactions?userId=me
────────────────────────────────────────────────────────────────────────────
*/

-- =============================================================================
-- END OF MIGRATION NOTES
-- =============================================================================
