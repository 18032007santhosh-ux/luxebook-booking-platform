-- =============================================================================
-- LuxeBook — Seed Data
-- =============================================================================
-- Derived directly from static JS constants in the codebase:
--   - src/data/services.js        → SERVICES_DATA
--   - src/pages/Membership.jsx    → MEMBERSHIP_TIERS
--   - src/contexts/PortfolioContext.jsx → initialItems
--
-- Run AFTER schema.sql
-- =============================================================================


-- =============================================================================
-- SERVICE CATEGORIES
-- =============================================================================
INSERT INTO service_categories (id, label) VALUES
    ('hair',     'Hair Styling'),
    ('facials',  'Facial & Skin'),
    ('spa',      'Spa'),
    ('wellness', 'Wellness')
ON CONFLICT (id) DO NOTHING;


-- =============================================================================
-- SERVICES  (from src/data/services.js — SERVICES_DATA array)
-- =============================================================================
INSERT INTO services (legacy_id, title, price, category_id, duration, description, image_url, tag) VALUES

    -- id: 1
    (1,
     'Signature Grooming',
     185.00,
     'hair',
     '75 Minutes',
     'A bespoke haircutting experience including a private consultation, essential oil scalp treatment, and artisanal styling.',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuBIUvrXGi_lKXZXyL4QlCVRdUwGcaulVdsk54fnqx-FnWdpY02HbTccJ3_i0-xIqOs-rUiCEEmMRlgmaeAHNtdXngoa1G1TKceLG2tgBIOSr0FjjfFvrP-IOlkKbB_mjJpJuAwUVjLuCqL9NfhsXkUydL4W6BCdwGdflbB7RU2uQ0Y11Y6wRqpb5ynC9B7bc5deWvqw2OebDhyY2Mi0SU5_GJx31mReA64Sv8tbsP4fbQYFCrZMXmEfZr905858Jws8S2sczvwzPuM',
     'Popular'),

    -- id: 2
    (2,
     'Luminous Radiance',
     320.00,
     'facials',
     '90 Minutes',
     'Advanced oxygen-infusion facial using rare botanical extracts and 24k gold leaf to restore immediate vitality and glow.',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuDwJJny5ffqCmT3d4SqQG0c1inCbfM3DmDRPnvSubnhJOXV21nCGNZfurraz4zZJPpTRbavhvV96tmO7V6XJS_Jw46sBuiioebUQvuVs8SZXMVw6zR4r6q2nE9NXNYObgjI9hsA3Vhwrv44-rY-TxAFgvCqtZjI8nkep8Bnzk8JL06qHAyku-n2fJIR7ZJLyEzCK4ZUXTrlZy-NQ1kkqP-KPvvulU7beg3Xywrw8jn-QvqSDyGecfn5aUTGbxaP0JRyBUj-4bZ0M6s',
     NULL),

    -- id: 3
    (3,
     'Deep Sanctuary',
     450.00,
     'spa',
     '120 Minutes',
     'Our signature full-body hot stone massage combined with a private thermal suite experience and herbal rejuvenation.',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuDhw74xQy_evKeImHvzRGo7iwD4oMpg-D4aeHFjI1ouJidnsLYfYlgIGw9e4irDjDmqSPzl_ShlAvEKMkHbpdHpkkninW_jGza_tWj-AcapRCSj7MWKs80TwwFwKyPD1Hj5Dy-iZkM7lBYVQstn9w5W0yZ0dbIbyREFhoqHO8Eh8tvRc4-qKM9uOGiEdhCKUSq1A0rSm42rD0XenVB0',
     NULL),

    -- id: 4
    (4,
     'Vitality IV Infusion',
     275.00,
     'wellness',
     '60 Minutes',
     'Personalized nutrient cocktail designed to enhance cognitive function, immune support, and physical performance.',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuB9OYbrWMo0oyl52RpAppNMbVcM5tKcdLwbD0QgjZ-mWcx7bggm4FDT1KOoIyDgGTbUnyOhQFhNrmSmZ6qNTai-Lo6FI4AnXkx1qHzdPhBKnjTZ4OrRy3olmA_TSwtBYMN-snx6NcoPgXS_V83R6ddiMU6QKaxrqACPGzj1PMy8FPKdlkCRCTCUpjiaBYC-P06ERx7P34ThUWHBGdwiFN-T5lPwVEgoBMgwY0HGSvKaOglVR-n1C8pZ97sERf3pYpWBa1Msa-Pym1w',
     NULL),

    -- id: 5
    (5,
     'Artisan Hand Ritual',
     120.00,
     'spa',
     '60 Minutes',
     'Comprehensive restoration for hands including organic clay mask, silk-infused soak, and precision nail design.',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuC0NSeqHjUGs3GuE0afQTBOJYKv_yeNky3tA5x3IqzeNuoSTpX9_W1C1arrtc4B2QIC6E-RbRlnuRwKrjDdOqk1vXTe-DZyGpY493mTbuF-pdZd0CVS4EnfJurHIqp67gMA0B7Q6tYRlmaWlaUwHit2cjJrn-_3S7VcxROxuJ7D6d8Og2OCnB0wrYwG7BOKsU9QMSMNk5IKcBKnHeD9SFgztsOHk9xtKmtT2gzSfILinA_lJEXV2SfJ3n4cwjv_aY65sf_jRfr-C44',
     NULL),

    -- id: 6
    (6,
     'Holistic Aromatherapy',
     195.00,
     'wellness',
     '90 Minutes',
     'A sensory journey utilizing rare essential oils sourced from the French Riviera, tailored to your specific emotional needs.',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuB978o4MN_tTFxU83mm7NOx9gp1vPafAumDHXF01ld7nmnZK1tGr8x1KZp6taZKCoiS-g8_LuvhkxBdnA-iwgvgalHGQoidbtYWnJFWQ_yHBJbuzERQNIx_UXy86aiRyxGJqKQAZVT3xwk6LNFHvOLCmvTtoMJTdOfzQRSjxeRGMyPhBZ3TZWrtjTWnedjBR34KT2nvvf-qRgcHfnXXGOwbhWpPUzvCWoY4TnvHn-fGk4sy0Cqsm5m5lTute4PARgBZZXgrXZ98ZT4',
     NULL)

ON CONFLICT (legacy_id) DO UPDATE SET
    title       = EXCLUDED.title,
    price       = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    duration    = EXCLUDED.duration,
    description = EXCLUDED.description,
    image_url   = EXCLUDED.image_url,
    tag         = EXCLUDED.tag,
    updated_at  = NOW();


-- =============================================================================
-- MEMBERSHIP TIERS  (from src/pages/Membership.jsx — MEMBERSHIP_TIERS array)
-- =============================================================================
INSERT INTO membership_tiers
    (id, name, price_per_year, price_display, description, is_popular, is_invitation_only, benefits, display_order)
VALUES

    -- Signature Club
    ('signature',
     'Signature Club',
     5000.00,
     '$5,000 / year',
     'The foundation of luxury wellness. Priority access to all LuxeBook facilities.',
     FALSE,
     FALSE,
     '["Priority Booking Access","Complimentary Valet Parking","Access to Signature Lounges","2 Guest Passes Annually"]'::jsonb,
     1),

    -- Gold Reserve
    ('gold',
     'Gold Reserve',
     15000.00,
     '$15,000 / year',
     'Elevated access with tailored treatments and wellness consultations.',
     TRUE,
     FALSE,
     '["All Signature Benefits","1 Complimentary Treatment Monthly","Quarterly Wellness Consultations","Access to Private Gold Suites","5 Guest Passes Annually"]'::jsonb,
     2),

    -- Onyx Elite
    ('onyx',
     'Onyx Elite',
     NULL,
     'By Invitation',
     'The pinnacle of private service. Unlimited access and a dedicated concierge.',
     FALSE,
     TRUE,
     '["All Gold Benefits","Dedicated Private Concierge 24/7","Unlimited Access to Premium Amenities","Exclusive Event Invitations","Private Chauffeur Service (Local)"]'::jsonb,
     3)

ON CONFLICT (id) DO UPDATE SET
    name               = EXCLUDED.name,
    price_per_year     = EXCLUDED.price_per_year,
    price_display      = EXCLUDED.price_display,
    description        = EXCLUDED.description,
    is_popular         = EXCLUDED.is_popular,
    is_invitation_only = EXCLUDED.is_invitation_only,
    benefits           = EXCLUDED.benefits,
    display_order      = EXCLUDED.display_order,
    updated_at         = NOW();


-- =============================================================================
-- ADMIN USER  (from authService.js — hardcoded admin@gmail.com)
-- =============================================================================
INSERT INTO users (name, email, role, legacy_id)
VALUES ('Admin', 'admin@gmail.com', 'admin', 'usr_admin_seed')
ON CONFLICT (email) DO NOTHING;


-- =============================================================================
-- PORTFOLIO ITEMS  (from src/contexts/PortfolioContext.jsx — initialItems)
-- NOTE: Images are external Google AIDA URLs. In production, upload to CDN.
-- =============================================================================
INSERT INTO portfolio_items
    (legacy_id, title, category_id, category_label, type_label, is_featured, is_large, is_portrait, image_url)
VALUES

    (1,
     'Zen Sanctuary Presidential Suite',
     'spa',
     'Spa Interiors',
     'Interior Design • Wellness Experience',
     TRUE, TRUE, FALSE,
     'https://lh3.googleusercontent.com/aida-public/AB6AXuACGNCzlOLuhr1fZGo74CvqV_ZphalIczw0Yo7UJo7bkBPTQfR4qbpTmmeGv7FUuu_Pb8ZjoYvnNSJtFKeaRS7-UM_LYD1ZWNLkmx4JIjtXm9r7nF1y6_E1xTXVWH74ocnEUhgnQp4fFsJso10yRf5fWDc_jCwZtIWHDlFj4W7PYNR9yEuH7u4ojAKXPE5A0tX69e0S9_Aq6R10NUxESJz1qr--gxNLbJp14C5_vj64789p_0OAg7G3Au-W0itPfUP4lhFeJTCnKz0'),

    (2,
     'Royal Bridal Collection',
     'hair',
     'Hair Styling',
     'Hair Styling • Weddings',
     TRUE, FALSE, TRUE,
     'https://lh3.googleusercontent.com/aida-public/AB6AXuCVG247jbKbfcVZQqpx0Eor5M5lc9Y3Qjr_nQ6VgHgRKmRfhsSQKliA-OhY9ePboE0V344T4u8uxirEslFi4aksulFzYH5LAqhqFsDWilCxbJlEGT5vC26YfG6bQnuOqec3_ixD5r8sCVAmXHSFTPcvlPaDgJys2zE4dg27a3TEIWAIuzkUGHfmS3WIlhDxp_L23e6p-BJkaYdJUEqjCn_Z_pUOuksLTVZRL1xzFoGgH6x27ENZE5VBd9ABI3Unw_0I53KG8gRDFOI'),

    (3,
     '24K Gold Rejuvenation',
     'facials',
     'Facial & Skin',
     'Skincare • Anti-Aging',
     FALSE, FALSE, FALSE,
     'https://lh3.googleusercontent.com/aida-public/AB6AXuASa2AmPcT8odReoqQRL100s6u-0yPyGh86wRq344CLLZ4w6Lw5QcD87OiEj-F9ERSgerwrdC3pan4qLIdH0xjesOtH3USDTMBNqvgOX4-DrtXG2CEB49x4CqjixPtobbZy0RAODyBVL54KXYVtOHz43Nbk4hmZmg4hbT2oHl7079F4ec5rKm3l9tLeNHAQ4jzDlUvz9DkPRMcZXBSm0_hTmF1NdIpWZscGPiC6mJ3LgTIMNkRuRdTqy2hpKbBHKyokcuBFmsjTdco'),

    (4,
     'Obsidian Stone Therapy',
     'wellness',
     'Wellness',
     'Massage • Relaxation',
     FALSE, FALSE, FALSE,
     'https://lh3.googleusercontent.com/aida-public/AB6AXuC9bokfkgrxoQb3sJfjxN4Oem4I5H3pwa-pfTOOnwKGo1UWwPzSyWoWTTALPktyH8vHOqs7hsaEOQtn5eHZPq_-Q_8-OBqr8eHHfLkrAG2D7IyIjQsZxSFcDnfBmi82aT4sDRjGmFnZx0LHC8NKUAK6RFsbaBmNxjxW-O0_qqeTeS9RO1HZcutbIIrxktOv7lKyqRNS6rZOTbYSl2zmRJz_9C5cAB__yeJanPx_hkxB_prwyu4tevFhai2Ieflz2UOkWYlbM1A_FYo'),

    (5,
     'Bespoke Fragrance Bar',
     'wellness',
     'Wellness',
     'Experience • Personalized',
     FALSE, FALSE, FALSE,
     'https://lh3.googleusercontent.com/aida-public/AB6AXuB-3qUzQjuvLdef_aSGBwp-rHiLiuNU5l3fMEJfWo9Wbd4dHQA-TTgRdDGEg7BK4dBpBhxjkEq77jirFGPGqNb9RW_1oSKF8XYHwZ4CF8CPSpwHG6ZzxfRZ_O2-N2X8vRIz9ItewcbuIK0jQJU-nQjvVcF1xcskni5q76jgt-l408lhwUZEjS80H9WkkxlGwzi5cW_m0oNQdN4q_YhAj_2245jdXYl4auQJumxcylq-zySu0w3J3ohbSN3S7xPcAQB-tEEwIT1xCuo')

ON CONFLICT (legacy_id) DO UPDATE SET
    title          = EXCLUDED.title,
    category_id    = EXCLUDED.category_id,
    category_label = EXCLUDED.category_label,
    type_label     = EXCLUDED.type_label,
    is_featured    = EXCLUDED.is_featured,
    is_large       = EXCLUDED.is_large,
    is_portrait    = EXCLUDED.is_portrait,
    image_url      = EXCLUDED.image_url,
    updated_at     = NOW();


-- =============================================================================
-- SEED DEFAULT TIME SLOTS  (from CalendarBooking.jsx hardcoded arrays)
-- Generates slots for services 1–6 across the next 60 days.
-- In production, replace with a cron-based slot generation job.
-- =============================================================================

-- Generate time slots for all active services for the next 60 days
-- (only on days where day_of_month % 4 != 0, matching the current availability sim)
INSERT INTO time_slots (service_id, slot_date, slot_time, period, is_available)
SELECT
    s.id                                           AS service_id,
    d.slot_date::DATE                              AS slot_date,
    t.slot_time::TIME                              AS slot_time,
    t.period,
    TRUE                                           AS is_available
FROM
    services s
    CROSS JOIN (
        SELECT generate_series(
            CURRENT_DATE,
            CURRENT_DATE + INTERVAL '60 days',
            INTERVAL '1 day'
        )::DATE AS slot_date
    ) d
    CROSS JOIN (
        VALUES
            ('09:00', 'morning'),
            ('10:30', 'morning'),
            ('11:45', 'morning'),
            ('13:00', 'afternoon'),
            ('14:30', 'afternoon'),
            ('16:00', 'afternoon'),
            ('18:00', 'evening'),
            ('19:30', 'evening')
    ) t(slot_time, period)
WHERE
    s.is_active = TRUE
    -- Match the availability simulation from CalendarBooking.jsx:
    -- `day % 4 !== 0` (i.e., skip every 4th day-of-month)
    AND EXTRACT(DAY FROM d.slot_date)::INTEGER % 4 != 0

ON CONFLICT (service_id, slot_date, slot_time) DO NOTHING;

-- =============================================================================
-- END OF SEED DATA
-- =============================================================================
