INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4 (),
            'authenticated',
            'admin',
            'info@geoprofs.com',
            crypt ('password', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
    );


-- test user email identities with non-null provider_id
INSERT INTO
    auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        provider_id,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            id,  -- assuming provider_id can be the same as user_id
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );