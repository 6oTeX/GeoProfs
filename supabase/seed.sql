
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at,
    is_anonymous
) VALUES (
             '11111111-1111-1111-1111-111111111111', -- instance_id (dummy UUID)
             '00000000-0000-0000-0000-000000000001', -- id (dummy UUID for user)
             'dummy_aud',                           -- aud (optional field)
             'admin',                               -- role (admin role)
             'admin@gmail.com',                     -- email (admin email)
             '$2a$10$TvhFlyXgiRboLHsVpariSexpJejV1bCurQyCwJGu2OGPLnQ2sWeNq', -- encrypted_password (bcrypt hash of "password")
             NOW(),                                 -- email_confirmed_at (timestamp for email confirmation)
             NOW(),                                 -- invited_at (timestamp for invitation)
             'dummy_confirmation_token',            -- confirmation_token
             NOW(),                                 -- confirmation_sent_at
             'dummy_recovery_token',                -- recovery_token
             NOW(),                                 -- recovery_sent_at
             NULL,                                  -- email_change_token_new
             NULL,                                  -- email_change
             NULL,                                  -- email_change_sent_at
             NOW(),                                 -- last_sign_in_at
             '{}'::jsonb,                           -- raw_app_meta_data (empty JSON)
             '{}'::jsonb,                           -- raw_user_meta_data (empty JSON)
             TRUE,                                  -- is_super_admin (set true for admin)
             NOW(),                                 -- created_at (timestamp of creation)
             NOW(),                                 -- updated_at (timestamp of last update)
             '+123456789',                          -- phone (dummy phone number)
             NOW(),                                 -- phone_confirmed_at
             '',                                    -- phone_change (default empty)
             '',                                    -- phone_change_token (default empty)
             NULL,                                  -- phone_change_sent_at
             '',                                    -- email_change_token_current (default empty)
             0,                                     -- email_change_confirm_status (default 0)
             NULL,                                  -- banned_until (no ban set)
             '',                                    -- reauthentication_token (default empty)
             NOW(),                                 -- reauthentication_sent_at
             FALSE,                                 -- is_sso_user (not an SSO user)
             NULL,                                  -- deleted_at (not deleted)
             FALSE                                  -- is_anonymous (not anonymous)
         );
        
INSERT INTO public.projects (name, start_date, end_date) values ('test_project',NOW(), NOW())