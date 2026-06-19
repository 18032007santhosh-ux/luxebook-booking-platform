-- =============================================================================
-- LuxeBook Luxury Booking Platform — PostgreSQL Schema
-- =============================================================================
-- Version    : 1.0.0
-- Generated  : 2026-06-19
-- Derived from: Complete source code analysis of luxebook-react/src
-- Compatible : PostgreSQL 14+
-- =============================================================================
-- Tables:
--   01. service_categories
--   02. services
--   03. users
--   04. membership_tiers
--   05. bookings
--   06. transactions
--   07. memberships
--   08. reviews
--   09. portfolio_items
--   10. support_tickets
--   11. time_slots
-- =============================================================================

-- Enable UUID generation (required for gen_random_uuid())
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 01. SERVICE_CATEGORIES
-- =============================================================================
-- Purpose: Normalizes service categories used across the service catalog,
--          portfolio gallery, and booking filters.
-- Source : src/data/services.js (category field), ExploreServices.jsx (filter
--          buttons), PortfolioManagement.jsx (category dropdown values).
-- =============================================================================
CREATE TABLE IF NOT EXISTS service_categories (
    id          VARCHAR(50)   PRIMARY KEY,
    -- Slug identifier: 'hair' | 'facials' | 'spa' | 'wellness'

    label       VARCHAR(100)  NOT NULL,
    -- Display label: 'Hair Styling' | 'Facial & Skin' | 'Spa' | 'Wellness'

    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  service_categories              IS 'Normalised service category master list.';
COMMENT ON COLUMN service_categories.id           IS 'URL-safe slug; matches category values in SERVICES_DATA and PortfolioContext.';
COMMENT ON COLUMN service_categories.label        IS 'Human-readable display label used in filter UIs.';


-- =============================================================================
-- 02. SERVICES
-- =============================================================================
-- Purpose: Master catalog of bookable luxury services.
-- Source : src/data/services.js (SERVICES_DATA array, 6 initial items).
--          ExploreServices.jsx links to /appointments/:serviceId.
--          CalendarBooking.jsx resolves service by SERVICES_DATA.id integer.
-- =============================================================================
CREATE TABLE IF NOT EXISTS services (
    id          UUID           PRIMARY KEY DEFAULT gen_random_uuid(),

    legacy_id   INTEGER        UNIQUE,
    -- Maps to the old integer id (1–6) in SERVICES_DATA for migration compatibility.
    -- Safe to drop after migration is complete.

    title       VARCHAR(200)   NOT NULL,
    -- e.g. "Signature Grooming", "Deep Sanctuary"

    price       NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    -- Base price in USD. Snapshot is copied to bookings.base_price at booking time.

    category_id VARCHAR(50)    NOT NULL REFERENCES service_categories(id) ON UPDATE CASCADE,

    duration    VARCHAR(50)    NOT NULL,
    -- Human-readable: "75 Minutes", "90 Minutes", "120 Minutes", "60 Minutes"

    description TEXT,

    image_url   TEXT,
    -- External CDN URL (Google AIDA public links in development)

    tag         VARCHAR(50),
    -- Optional highlight badge, e.g. "Popular". NULL for most services.

    is_active   BOOLEAN        NOT NULL DEFAULT TRUE,
    -- Soft-delete flag. Inactive services are hidden from catalog but
    -- preserved for historical booking references.

    created_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  services            IS 'Master catalog of bookable wellness/concierge services.';
COMMENT ON COLUMN services.legacy_id  IS 'Compatibility shim for integer IDs used in the React app URL params. Drop after migration.';
COMMENT ON COLUMN services.tag        IS 'Marketing badge shown on service cards (e.g. "Popular"). NULL means no badge.';
COMMENT ON COLUMN services.is_active  IS 'FALSE = soft-deleted. Keeps historical booking references intact.';


-- =============================================================================
-- 03. USERS
-- =============================================================================
-- Purpose: All platform users — both customers (role='member') and
--          administrators (role='admin').
-- Source : src/services/authService.js (mockUser shape: id, name, email, role),
--          src/pages/Profile.jsx (editable: name, email, phone),
--          src/components/routing/ProtectedRoute.jsx (role checks),
--          src/components/routing/AdminRoute.jsx.
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),

    legacy_id       VARCHAR(50)  UNIQUE,
    -- Maps to the "usr_" + random string generated by authService.js.
    -- Used during migration to link localStorage data. Drop afterwards.

    name            VARCHAR(200) NOT NULL,
    -- From Profile.jsx: full name, editable. Initially derived from email
    -- prefix in authService.js (email.split('@')[0]).

    email           VARCHAR(320) NOT NULL UNIQUE,
    -- RFC 5321 maximum email length. Indexed implicitly by UNIQUE.

    password_hash   TEXT,
    -- Bcrypt/Argon2 hash. NULL for OAuth-only users.
    -- Note: current authService.js stores plaintext — hashing required before production.

    phone           VARCHAR(30),
    -- From Profile.jsx. Optional. Also captured per-booking in guest_phone.

    role            VARCHAR(20)  NOT NULL DEFAULT 'member'
                        CHECK (role IN ('member', 'admin')),
    -- 'admin' email is currently hardcoded as 'admin@gmail.com' in authService.js.
    -- This column allows proper RBAC without hardcoded emails.

    avatar_url      TEXT,
    -- Profile picture. Not in current codebase but inferred from
    -- Dashboard.jsx showing profile image placeholders.

    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    -- Soft-delete / account suspension flag.

    last_login_at   TIMESTAMPTZ,

    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  users               IS 'All platform users: members and admins.';
COMMENT ON COLUMN users.legacy_id     IS '"usr_" + random string from authService.js. Drop after migration.';
COMMENT ON COLUMN users.password_hash IS 'NULL for OAuth users. Must be hashed (bcrypt/argon2) — never store plaintext.';
COMMENT ON COLUMN users.role          IS '"admin" unlocks /admin/dashboard and /admin/portfolio routes.';


-- =============================================================================
-- 04. MEMBERSHIP_TIERS
-- =============================================================================
-- Purpose: Defines the available membership products that users can subscribe
--          to. Seeded from the static MEMBERSHIP_TIERS constant.
-- Source : src/pages/Membership.jsx (MEMBERSHIP_TIERS array),
--          src/pages/MembershipPayment.jsx (tier.price parsing),
--          src/pages/MembershipConfirm.jsx (tier.benefits display),
--          src/services/membershipService.js (tier object shape).
-- =============================================================================
CREATE TABLE IF NOT EXISTS membership_tiers (
    id                  VARCHAR(50)    PRIMARY KEY,
    -- Slug: 'signature' | 'gold' | 'onyx'

    name                VARCHAR(100)   NOT NULL,
    -- e.g. "Signature Club", "Gold Reserve", "Onyx Elite"

    price_per_year      NUMERIC(12, 2),
    -- NULL for 'onyx' (invitation-only, no public price).
    -- 5000.00 for signature, 15000.00 for gold.

    price_display       VARCHAR(100)   NOT NULL,
    -- Formatted string shown in UI: "$5,000 / year" | "By Invitation"

    description         TEXT,

    is_popular          BOOLEAN        NOT NULL DEFAULT FALSE,
    -- Drives "MOST POPULAR" badge on Membership.jsx card.

    is_invitation_only  BOOLEAN        NOT NULL DEFAULT FALSE,
    -- TRUE for 'onyx'. Hides standard "Select Tier" CTA.

    benefits            JSONB          NOT NULL DEFAULT '[]',
    -- Array of benefit strings. JSONB for queryability.
    -- e.g. ["Priority Booking Access", "Complimentary Valet Parking", ...]

    display_order       INTEGER        NOT NULL DEFAULT 0,
    -- Controls rendering order on Membership page (1=Signature, 2=Gold, 3=Onyx).

    created_at          TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  membership_tiers                     IS 'Membership product definitions (Signature, Gold, Onyx).';
COMMENT ON COLUMN membership_tiers.price_per_year      IS 'NULL for invitation-only tiers with no public price.';
COMMENT ON COLUMN membership_tiers.benefits            IS 'JSONB array of benefit strings rendered as a checklist on Membership.jsx.';
COMMENT ON COLUMN membership_tiers.is_invitation_only  IS 'When TRUE, CTA changes to "Request Invitation" and no payment flow is triggered.';


-- =============================================================================
-- 05. BOOKINGS
-- =============================================================================
-- Purpose: Every service reservation created through the 4-step
--          CalendarBooking wizard.
-- Source : src/pages/CalendarBooking.jsx (newBooking object in handleConfirm),
--          src/pages/CustomerDashboard.jsx (booking shape + status derivation),
--          src/pages/BookingConfirmed.jsx (display + receipt),
--          src/utils/receiptGenerator.js (PDF receipt field mapping).
-- localStorage key: luxebook_reservations_${user.id}
-- =============================================================================
CREATE TABLE IF NOT EXISTS bookings (
    id               UUID           PRIMARY KEY DEFAULT gen_random_uuid(),

    booking_ref      VARCHAR(20)    NOT NULL UNIQUE,
    -- Human-readable reference: "LB-XXXXX" (LB- prefix + 5-digit random).
    -- Shown on confirmation page and QR code.

    user_id          UUID           REFERENCES users(id) ON DELETE SET NULL,
    -- NULL for guest bookings (no account). Preserved to support
    -- the current fallback: localStorage key without user.id suffix.

    service_id       UUID           NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    -- FK to master service. ON DELETE RESTRICT prevents orphaned bookings.

    -- -------------------------------------------------------------------------
    -- Snapshot fields — denormalized for historical accuracy.
    -- Service details are copied AT BOOKING TIME so that future price/name
    -- changes do not alter historical records. This is correct, not redundant.
    -- -------------------------------------------------------------------------
    service_name     VARCHAR(200)   NOT NULL,
    service_duration VARCHAR(50)    NOT NULL,
    base_price       NUMERIC(10, 2) NOT NULL,
    tax_amount       NUMERIC(10, 2) NOT NULL DEFAULT 0,
    -- 8% tax computed in CalendarBooking.jsx step 4 summary panel.

    total_amount     NUMERIC(10, 2) GENERATED ALWAYS AS (base_price + tax_amount) STORED,
    -- Computed column. No application-layer risk of mismatched totals.

    -- -------------------------------------------------------------------------
    -- Schedule
    -- -------------------------------------------------------------------------
    booking_date     DATE           NOT NULL,
    -- Stored as DATE; was a formatted string in localStorage
    -- (e.g. "Friday, October 04, 2024"). Requires parsing during migration.

    booking_time     TIME           NOT NULL,
    -- One of: "09:00 AM", "10:30 AM", "11:45 AM", "01:00 PM",
    --         "02:30 PM", "04:00 PM", "06:00 PM", "07:30 PM"
    -- Stored as 24h TIME internally.

    -- -------------------------------------------------------------------------
    -- Guest Details (Wizard Step 3)
    -- -------------------------------------------------------------------------
    guest_name       VARCHAR(200)   NOT NULL,
    -- From CalendarBooking.jsx guestDetails.name — required field.

    guest_email      VARCHAR(320)   NOT NULL,
    -- From CalendarBooking.jsx guestDetails.email — required field.

    guest_phone      VARCHAR(30),
    -- From CalendarBooking.jsx guestDetails.phone — optional field.

    -- -------------------------------------------------------------------------
    -- Lifecycle Status
    -- -------------------------------------------------------------------------
    status           VARCHAR(30)    NOT NULL DEFAULT 'confirmed'
                         CHECK (status IN (
                             'confirmed',   -- newly created (CalendarBooking.jsx)
                             'upcoming',    -- future date, not yet attended
                             'completed',   -- past date (CustomerDashboard derives this)
                             'cancelled',   -- cancelled by user (handleCancelBooking)
                             'no_show'      -- admin-set status for missed appointments
                         )),

    terms_agreed     BOOLEAN        NOT NULL DEFAULT FALSE,
    -- Checkbox in CalendarBooking wizard Step 3.

    cancelled_at     TIMESTAMPTZ,
    -- Populated when status transitions to 'cancelled'.

    cancellation_reason TEXT,
    -- Optional admin or user reason for cancellation.

    created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  bookings               IS 'Service reservations created through the CalendarBooking 4-step wizard.';
COMMENT ON COLUMN bookings.booking_ref   IS 'Human-readable "LB-XXXXX" reference shown on confirmation page and receipt QR.';
COMMENT ON COLUMN bookings.user_id       IS 'NULL for unauthenticated guest bookings (supported by current implementation).';
COMMENT ON COLUMN bookings.service_name  IS 'Snapshot at booking time — preserved for historical accuracy even if service is renamed.';
COMMENT ON COLUMN bookings.base_price    IS 'Snapshot of service.price at the moment of booking.';
COMMENT ON COLUMN bookings.total_amount  IS 'Generated column: base_price + tax_amount. Never set directly.';
COMMENT ON COLUMN bookings.booking_date  IS 'Parsed from the formatted date string stored in localStorage.';


-- =============================================================================
-- 06. TRANSACTIONS
-- =============================================================================
-- Purpose: Records every payment event on the platform — both booking
--          payments (via Checkout.jsx) and membership payments
--          (via MembershipPayment.jsx).
-- Source : src/services/paymentService.js (transaction object shape),
--          src/pages/MembershipDashboard.jsx (history display),
--          src/pages/MembershipSuccess.jsx (receipt download + fields used),
--          src/pages/CustomerDashboard.jsx (handleDownloadReceipt).
-- localStorage keys:
--   luxebook_latest_transaction_${user.id}  → derived via ORDER BY in DB
--   luxebook_transaction_history_${user.id} → transactions table
-- =============================================================================
CREATE TABLE IF NOT EXISTS transactions (
    id               VARCHAR(50)    PRIMARY KEY,
    -- Format: "TXN-{epoch_ms}-{6_char_hex_uppercase}"
    -- Preserved as-is from paymentService.js to maintain receipt continuity.

    user_id          UUID           NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    -- Every transaction must belong to an authenticated user.

    booking_id       UUID           REFERENCES bookings(id) ON DELETE SET NULL,
    -- Populated when transaction is for a service booking payment.
    -- NULL when transaction is for a membership payment.

    -- membership_id FK added after memberships table creation (see below)

    amount           NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    -- From paymentService.js: itemDetails.price

    currency         CHAR(3)        NOT NULL DEFAULT 'USD',
    -- Hardcoded to 'USD' in current implementation.

    item_name        VARCHAR(200)   NOT NULL,
    -- From paymentService.js: itemDetails.name
    -- Either a membership tier name or a service title.

    payment_method   VARCHAR(30)    NOT NULL DEFAULT 'card'
                         CHECK (payment_method IN (
                             'card',               -- credit/debit card
                             'applepay',           -- Apple Pay (Checkout.jsx option)
                             'googlepay',          -- Google Pay (Checkout.jsx option)
                             'membership_credits'  -- Credits payment method (Checkout.jsx)
                         )),

    card_last4       CHAR(4),
    -- Last 4 digits from paymentService.js: paymentDetails.cardNumber.slice(-4)
    -- NULL for non-card payment methods.

    status           VARCHAR(30)    NOT NULL DEFAULT 'COMPLETED'
                         CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
    -- paymentService.js always sets 'COMPLETED'. FAILED is for when CVV='000'.

    transacted_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    -- From paymentService.js: new Date().toISOString()

    created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  transactions               IS 'Payment records for both booking payments and membership subscriptions.';
COMMENT ON COLUMN transactions.id            IS '"TXN-{epoch_ms}-{hex}" — preserved from paymentService.js for receipt continuity.';
COMMENT ON COLUMN transactions.booking_id    IS 'NULL when transaction is for membership payment, not a service booking.';
COMMENT ON COLUMN transactions.card_last4    IS 'Masked card identifier. Only last 4 digits — never store full card number.';
COMMENT ON COLUMN transactions.item_name     IS 'Denormalized name; either the membership tier name or the service title.';


-- =============================================================================
-- 07. MEMBERSHIPS
-- =============================================================================
-- Purpose: Tracks the lifecycle of a user's membership subscription:
--          pending (selected, awaiting payment) → active → expired/cancelled.
-- Source : src/services/membershipService.js (setPendingMembership,
--          activateMembership, getActiveMembership shapes),
--          src/pages/MembershipDashboard.jsx (activatedAt, expiresAt display),
--          src/pages/MembershipConfirm.jsx (renewal date = now + 1 year),
--          src/pages/MembershipSuccess.jsx (transaction details shown).
-- localStorage keys:
--   luxebook_pending_membership_${user.id} → status='pending'
--   luxebook_active_membership_${user.id}  → status='active'
-- =============================================================================
CREATE TABLE IF NOT EXISTS memberships (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id          UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    tier_id          VARCHAR(50)  NOT NULL REFERENCES membership_tiers(id) ON UPDATE CASCADE,

    status           VARCHAR(30)  NOT NULL DEFAULT 'pending'
                         CHECK (status IN (
                             'pending',    -- Selected in Membership.jsx, stored by setPendingMembership()
                             'active',     -- Activated after successful payment in MembershipPayment.jsx
                             'expired',    -- Past expires_at date
                             'cancelled'   -- Manually cancelled
                         )),

    selected_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    -- From membershipService.setPendingMembership: { selectedAt: new Date().toISOString() }

    activated_at     TIMESTAMPTZ,
    -- From membershipService.activateMembership: { activatedAt: new Date().toISOString() }

    expires_at       TIMESTAMPTZ,
    -- Activation date + 1 year. Computed in membershipService.activateMembership:
    -- new Date(new Date().setFullYear(new Date().getFullYear() + 1))

    cancelled_at     TIMESTAMPTZ,

    transaction_id   VARCHAR(50)  REFERENCES transactions(id) ON DELETE SET NULL,
    -- Populated when membership transitions to 'active' after payment.

    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Note: We deliberately do NOT use a simple UNIQUE(user_id) constraint because
-- the membership history must be preserved (expired and cancelled records kept).
-- Application logic must enforce: only one membership per user can have
-- status='active' or status='pending' at any given time.
-- The partial index below enforces this at the database level efficiently.
CREATE UNIQUE INDEX IF NOT EXISTS uix_memberships_one_active_per_user
    ON memberships(user_id)
    WHERE status IN ('active', 'pending');

-- Add FK from transactions to memberships (circular reference, added post-creation)
ALTER TABLE transactions
    ADD COLUMN IF NOT EXISTS membership_id UUID REFERENCES memberships(id) ON DELETE SET NULL;

COMMENT ON TABLE  memberships                IS 'User membership subscription lifecycle (pending → active → expired/cancelled).';
COMMENT ON COLUMN memberships.selected_at    IS 'When the user clicked "Select Tier" in Membership.jsx (setPendingMembership).';
COMMENT ON COLUMN memberships.activated_at   IS 'When payment succeeded and activateMembership() was called.';
COMMENT ON COLUMN memberships.expires_at     IS 'activation date + 1 year; computed by membershipService.activateMembership().';
COMMENT ON COLUMN memberships.transaction_id IS 'NULL until membership transitions from pending → active on successful payment.';


-- =============================================================================
-- 08. REVIEWS
-- =============================================================================
-- Purpose: Star-rating + text feedback submitted by customers after a
--          booking is in 'completed' status.
-- Source : src/pages/CustomerDashboard.jsx (handleSubmitReview, ratingValue,
--          feedbackText, openReviewModal logic).
-- localStorage key: luxebook_reviews_${user.id}
--   Shape: [{ bookingId, rating: 1–5, comment: string }]
-- =============================================================================
CREATE TABLE IF NOT EXISTS reviews (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),

    booking_id   UUID         NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    -- Reviews are deleted if the booking is hard-deleted.

    user_id      UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    rating       SMALLINT     NOT NULL CHECK (rating BETWEEN 1 AND 5),
    -- 1–5 star rating. CustomerDashboard validates: ratingValue === 0 blocks submit.

    comment      TEXT         NOT NULL,
    -- Required in CustomerDashboard.jsx (textarea has 'required' attribute).

    submitted_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    -- CustomerDashboard supports editing existing reviews (findIndex logic).

    CONSTRAINT uq_review_per_booking UNIQUE (booking_id, user_id)
    -- Enforces exactly one review per booking per user.
    -- CustomerDashboard.jsx explicitly handles the update path (existingIndex >= 0).
);

COMMENT ON TABLE  reviews              IS 'Customer star-rating and text feedback for completed bookings.';
COMMENT ON COLUMN reviews.rating       IS '1–5 stars. Validated on frontend; enforced by CHECK here.';
COMMENT ON COLUMN reviews.updated_at   IS 'CustomerDashboard allows editing existing reviews; this tracks the last update.';


-- =============================================================================
-- 09. PORTFOLIO_ITEMS
-- =============================================================================
-- Purpose: Gallery items managed by admins in the Portfolio Management page.
--          Publicly visible in the Gallery page.
-- Source : src/contexts/PortfolioContext.jsx (initialItems array, CRUD ops),
--          src/pages/PortfolioManagement.jsx (add/delete/featured toggle,
--          category dropdown, file upload modal with base64 preview).
-- localStorage key: luxebook_portfolio
--   Shape: { id, title, category, categoryLabel, type, isLarge, isPortrait,
--             isFeatured, image }
-- =============================================================================
CREATE TABLE IF NOT EXISTS portfolio_items (
    id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),

    legacy_id      BIGINT       UNIQUE,
    -- Maps to Date.now() based integer IDs in PortfolioContext.
    -- Includes initial seed items (1–5) and user-uploaded items.

    title          VARCHAR(300) NOT NULL,
    -- From PortfolioManagement upload form: "Project Title" input.

    category_id    VARCHAR(50)  NOT NULL REFERENCES service_categories(id) ON UPDATE CASCADE,
    -- One of: 'hair' | 'facials' | 'spa' | 'wellness'
    -- From PortfolioManagement.jsx select dropdown.

    category_label VARCHAR(100) NOT NULL,
    -- Denormalized display label: "Hair Styling" | "Facial & Skin" | etc.
    -- Derivable from service_categories.label — can be removed post-migration.

    type_label     VARCHAR(200),
    -- Free-text composite descriptor: "Hair Styling • Weddings",
    -- "Interior Design • Wellness Experience". Not derivable — keep as-is.

    image_url      TEXT         NOT NULL,
    -- In development: external Google CDN URLs or base64 data-URLs (from file upload).
    -- In production: must be migrated to object storage (S3/R2) URL.
    -- Base64 strings MUST NOT be stored in the database long-term.

    is_featured    BOOLEAN      NOT NULL DEFAULT FALSE,
    -- Drives homepage gallery display. Toggled by admin via "star" button.
    -- PortfolioManagement shows "X/12 Active" featured slots.

    is_large       BOOLEAN      NOT NULL DEFAULT FALSE,
    -- Grid layout hint: span 2 columns (lg:col-span-2 in PortfolioManagement).
    -- Present on initial seed item id=1 only.

    is_portrait    BOOLEAN      NOT NULL DEFAULT FALSE,
    -- Grid layout hint for portrait-oriented images.
    -- Present on initial seed item id=2 only.

    created_by     UUID         REFERENCES users(id) ON DELETE SET NULL,
    -- Admin user who uploaded the item. NULL for initial seed data.

    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  portfolio_items               IS 'Admin-managed gallery items displayed on the public Gallery page and homepage.';
COMMENT ON COLUMN portfolio_items.legacy_id     IS 'Date.now() based ID from PortfolioContext.jsx. Drop after migration.';
COMMENT ON COLUMN portfolio_items.image_url     IS 'MUST be a CDN/object-storage URL in production. Base64 data-URLs are forbidden at scale.';
COMMENT ON COLUMN portfolio_items.is_featured   IS 'Featured items appear on the homepage. Admin toggles via star button.';
COMMENT ON COLUMN portfolio_items.type_label    IS 'Free-text descriptor e.g. "Interior Design • Wellness Experience". Not derivable.';
COMMENT ON COLUMN portfolio_items.category_label IS 'Denormalized display label. Can be dropped and joined from service_categories.';


-- =============================================================================
-- 10. SUPPORT_TICKETS
-- =============================================================================
-- Purpose: Stores contact form submissions from the Support page.
--          NOTE: Currently, Support.jsx does NOT persist submissions anywhere
--          (only sets isSubmitted=true in local state). This table is a NEW
--          persistent entity that resolves this gap.
-- Source : src/pages/Support.jsx (formData: { subject, message }),
--          src/pages/MembershipDashboard.jsx (links to /support page).
-- =============================================================================
CREATE TABLE IF NOT EXISTS support_tickets (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id      UUID         REFERENCES users(id) ON DELETE SET NULL,
    -- NULL for unauthenticated contact form submissions (Support.jsx is
    -- behind ProtectedRoute, so this should always be populated, but
    -- nullable for flexibility / future public contact form).

    subject      VARCHAR(500) NOT NULL,
    -- From Support.jsx: "subject" input (type="text", required).

    message      TEXT         NOT NULL,
    -- From Support.jsx: "message" textarea (rows=5, required).

    status       VARCHAR(30)  NOT NULL DEFAULT 'open'
                     CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    -- Admin workflow status. Not in current frontend but required for
    -- concierge team operations.

    resolved_at  TIMESTAMPTZ,
    -- Populated when status transitions to 'resolved'.

    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  support_tickets         IS 'Contact form submissions from Support.jsx. Currently not persisted in frontend — this is a new entity.';
COMMENT ON COLUMN support_tickets.user_id IS 'Should always be populated (Support.jsx is behind ProtectedRoute) but nullable for future public forms.';
COMMENT ON COLUMN support_tickets.status  IS 'Admin workflow field. Not yet surfaced in frontend admin dashboard.';


-- =============================================================================
-- 11. TIME_SLOTS (Optional — Scalability)
-- =============================================================================
-- Purpose: Manages available booking time slots per service per date.
--          Included for production scalability. The current implementation
--          uses HARDCODED arrays in CalendarBooking.jsx (Morning: 09:00 AM,
--          10:30 AM, 11:45 AM; Afternoon: 01:00 PM, 02:30 PM, 04:00 PM;
--          Evening: 06:00 PM, 07:30 PM) and simulates unavailability via
--          `day % 4 !== 0`.
-- Source : src/pages/CalendarBooking.jsx (static time arrays, availability logic).
-- =============================================================================
CREATE TABLE IF NOT EXISTS time_slots (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),

    service_id   UUID         NOT NULL REFERENCES services(id) ON DELETE CASCADE,

    slot_date    DATE         NOT NULL,

    slot_time    TIME         NOT NULL,
    -- 24h format internally, e.g. 09:00, 10:30, 13:00, 14:30, 16:00, 18:00, 19:30

    period       VARCHAR(20)  NOT NULL
                     CHECK (period IN ('morning', 'afternoon', 'evening')),
    -- Grouping label for UI display in CalendarBooking.jsx.

    is_available BOOLEAN      NOT NULL DEFAULT TRUE,
    -- FALSE when booked or blocked by admin.

    booked_by    UUID         REFERENCES bookings(id) ON DELETE SET NULL,
    -- Populated when a booking claims this slot. NULL = available.

    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_slot UNIQUE (service_id, slot_date, slot_time)
    -- Prevents double-booking of the same service at the same time on the same day.
);

COMMENT ON TABLE  time_slots              IS 'Available/booked time slots per service per date. Replaces hardcoded arrays in CalendarBooking.jsx.';
COMMENT ON COLUMN time_slots.period       IS 'UI grouping: morning | afternoon | evening. Matches labels in CalendarBooking.jsx.';
COMMENT ON COLUMN time_slots.booked_by   IS 'FK to bookings. NULL = slot is available.';


-- =============================================================================
-- INDEXES
-- =============================================================================
-- Covers all expected query patterns across:
--  - User lookups (auth, profile)
--  - Booking queries (dashboard, admin feed, customer history)
--  - Transaction queries (history, latest transaction)
--  - Membership checks (active membership lookup)
--  - Portfolio filtering (gallery, admin management)
-- =============================================================================

-- USERS
CREATE INDEX IF NOT EXISTS idx_users_email       ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role        ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active   ON users(is_active) WHERE is_active = TRUE;

-- SERVICES
CREATE INDEX IF NOT EXISTS idx_services_category  ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_services_legacy_id ON services(legacy_id);

-- BOOKINGS
CREATE INDEX IF NOT EXISTS idx_bookings_user_id      ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_service_id   ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status       ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_ref  ON bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_bookings_user_status  ON bookings(user_id, status);
-- Composite: CustomerDashboard queries bookings by user + status
CREATE INDEX IF NOT EXISTS idx_bookings_user_date    ON bookings(user_id, booking_date DESC);
-- Composite: Admin live feed ordered by date

-- TRANSACTIONS
CREATE INDEX IF NOT EXISTS idx_transactions_user_id        ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_booking_id     ON transactions(booking_id);
CREATE INDEX IF NOT EXISTS idx_transactions_membership_id  ON transactions(membership_id);
CREATE INDEX IF NOT EXISTS idx_transactions_transacted_at  ON transactions(transacted_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_status         ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date      ON transactions(user_id, transacted_at DESC);
-- Composite: replaces luxebook_latest_transaction_* localStorage key

-- MEMBERSHIPS
CREATE INDEX IF NOT EXISTS idx_memberships_user_id    ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_status     ON memberships(status);
CREATE INDEX IF NOT EXISTS idx_memberships_tier_id    ON memberships(tier_id);
CREATE INDEX IF NOT EXISTS idx_memberships_expires_at ON memberships(expires_at)
    WHERE status = 'active';
-- Partial: for expiry cron job

-- REVIEWS
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id  ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id     ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating      ON reviews(rating);

-- PORTFOLIO_ITEMS
CREATE INDEX IF NOT EXISTS idx_portfolio_category_id ON portfolio_items(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured    ON portfolio_items(is_featured)
    WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at  ON portfolio_items(created_at DESC);

-- SUPPORT_TICKETS
CREATE INDEX IF NOT EXISTS idx_support_user_id    ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_status     ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_created_at ON support_tickets(created_at DESC);

-- TIME_SLOTS
CREATE INDEX IF NOT EXISTS idx_time_slots_service_date  ON time_slots(service_id, slot_date);
CREATE INDEX IF NOT EXISTS idx_time_slots_available     ON time_slots(slot_date, is_available)
    WHERE is_available = TRUE;


-- =============================================================================
-- USEFUL VIEWS
-- =============================================================================

-- Latest transaction per user (replaces luxebook_latest_transaction_* localStorage)
CREATE OR REPLACE VIEW v_latest_transaction_per_user AS
    SELECT DISTINCT ON (user_id)
        *
    FROM transactions
    ORDER BY user_id, transacted_at DESC;

-- Active membership per user (replaces getActiveMembership() localStorage call)
CREATE OR REPLACE VIEW v_active_membership_per_user AS
    SELECT
        m.*,
        mt.name         AS tier_name,
        mt.price_display,
        mt.benefits,
        mt.is_invitation_only
    FROM memberships m
    JOIN membership_tiers mt ON mt.id = m.tier_id
    WHERE m.status = 'active';

-- Booking summary for admin live feed (Dashboard.jsx live feed panel)
CREATE OR REPLACE VIEW v_booking_feed AS
    SELECT
        b.id,
        b.booking_ref,
        b.status,
        b.booking_date,
        b.booking_time,
        b.guest_name      AS customer_name,
        b.guest_email     AS customer_email,
        b.service_name,
        b.total_amount,
        u.name            AS user_name,
        u.email           AS user_email,
        b.created_at
    FROM bookings b
    LEFT JOIN users u ON u.id = b.user_id
    ORDER BY b.created_at DESC;

-- Service revenue summary (Admin Dashboard KPI cards)
CREATE OR REPLACE VIEW v_service_revenue AS
    SELECT
        s.id,
        s.title,
        s.category_id,
        COUNT(b.id)         AS total_bookings,
        SUM(b.base_price)   AS total_revenue,
        AVG(b.base_price)   AS avg_booking_value,
        AVG(r.rating)       AS avg_rating
    FROM services s
    LEFT JOIN bookings    b ON b.service_id = s.id AND b.status != 'cancelled'
    LEFT JOIN reviews     r ON r.booking_id = b.id
    GROUP BY s.id, s.title, s.category_id;


-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
