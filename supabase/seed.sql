-- Add Admin user with email
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
            'supabase_admin',
            'info@geoprofs.com',
            crypt ('password', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{"full_name": "Admin", "avatar_url": "https://api.dicebear.com/9.x/miniavs/png?seed=admin", "username": "admin", "saldo": 0 }'::jsonb,
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
    );

-- Create test users
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
            'authenticated',
            'user' || gs::text || '@geoprofs.com',
            crypt ('password123', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            format('{"full_name": "User %s", "avatar_url": "https://api.dicebear.com/9.x/miniavs/png?seed=%s", "username": "user%s", "saldo": %s}', gs::text, gs::text, gs::text,gs * 10)::jsonb,
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 10) AS gs
    );




-- Test user email identities with non-null provider_id
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
            id::text,  -- assuming provider_id can be the same as user_id
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

-- Add unique constraint to the name column in the projects table
ALTER TABLE public.projects
ADD CONSTRAINT unique_project_name UNIQUE (name);

-- Create Projects
INSERT INTO public.projects (name, description, start_date, end_date)
VALUES
  ('Project Alpha', 'Description for Project Alpha', '2025-01-01', '2025-01-30'),
  ('Project Beta', 'Description for Project Beta', '2025-02-01', '2025-02-28'),
  ('Project Gamma', 'Description for Project Gamma', '2025-01-15', '2025-02-15')
ON CONFLICT (name) DO NOTHING;

-- Assign Users to Projects
INSERT INTO public.user_project_relations (project_id, user_id)
VALUES
    ((SELECT id FROM public.projects WHERE name = 'Project Alpha'), (SELECT id FROM auth.users WHERE email = 'user1@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Alpha'), (SELECT id FROM auth.users WHERE email = 'user2@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Alpha'), (SELECT id FROM auth.users WHERE email = 'user3@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Alpha'), (SELECT id FROM auth.users WHERE email = 'user4@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Beta'), (SELECT id FROM auth.users WHERE email = 'user5@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Beta'), (SELECT id FROM auth.users WHERE email = 'user6@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Beta'), (SELECT id FROM auth.users WHERE email = 'user7@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Gamma'), (SELECT id FROM auth.users WHERE email = 'user8@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Gamma'), (SELECT id FROM auth.users WHERE email = 'user9@geoprofs.com')),
    ((SELECT id FROM public.projects WHERE name = 'Project Gamma'), (SELECT id FROM auth.users WHERE email = 'user10@geoprofs.com'));

-- Insert Dummy Leave Requests
INSERT INTO public.leave_requests (
    user_id,
    start_date,
    end_date,
    reason,
    explanation,
    state,
    reviewed_by,
    response
) VALUES
    (
        (SELECT id FROM auth.users WHERE email = 'user2@geoprofs.com'),
        '2025-01-10',
        '2025-01-02',
        'sick',
        'Recovering from flu.',
        'accepted',
        (SELECT id FROM auth.users WHERE email = 'user10@geoprofs.com'),
        'Get well soon!'
    ),
    (
        (SELECT id FROM auth.users WHERE email = 'user3@geoprofs.com'),
        '2025-01-15',
        '2025-01-18',
        'wedding',
        'Attending a friends wedding.',
        'declined',
        (SELECT id FROM auth.users WHERE email = 'user7@geoprofs.com'),
        'Not approved due to project deadlines.'
    ),
    (
        (SELECT id FROM auth.users WHERE email = 'user4@geoprofs.com'),
        '2025-02-01',
        '2025-02-05',
        'other',
        'Personal matters to attend to.',
        'resubmitted',
        NULL,
        NULL
    ),
    (
        (SELECT id FROM auth.users WHERE email = 'user5@geoprofs.com'),
        '2025-02-10',
        '2025-02-12',
        'death',
        'Attending a family funeral.',
        'submitted',
        NULL,
        NULL
    ),
    (
        (SELECT id FROM auth.users WHERE email = 'user6@geoprofs.com'),
        '2025-02-15',
        '2025-02-20',
        'vacation',
        'Holiday trip.',
        'accepted',
        (SELECT id FROM auth.users WHERE email = 'user9@geoprofs.com'),
        'Enjoy your holiday!'
    ),
    (
        (SELECT id FROM auth.users WHERE email = 'user7@geoprofs.com'),
        '2025-01-25',
        '2025-01-27',
        'sick',
        'Medical check-up.',
        'accepted',
        (SELECT id FROM auth.users WHERE email = 'user10@geoprofs.com'),
        'Approved. Take care.'
    ),
    (
        (SELECT id FROM auth.users WHERE email = 'user8@geoprofs.com'),
        '2025-02-22',
        '2025-02-24',
        'vacation',
        'Family gathering.',
        'submitted',
        NULL,
        NULL
    ),
    (
        (SELECT id FROM auth.users WHERE email = 'user9@geoprofs.com'),
        '2025-01-20',
        '2025-01-22',
        'sick',
        'Dental surgery recovery.',
        'accepted',
        (SELECT id FROM auth.users WHERE email = 'user1@geoprofs.com'),
        'Approved.'
    );


INSERT INTO public.departments (name,manager) VALUES ('ICT',(SELECT id FROM auth.users WHERE email = 'user1@geoprofs.com'));
UPDATE public.profiles SET department_id = (SELECT id FROM public.departments WHERE name = 'ICT');