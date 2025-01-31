

CREATE TYPE public.notification_type AS ENUM (
    'info',
    'warning',
    'error'
);

CREATE TABLE public.notifications (
    id serial,
    user_id uuid null,
    message text not null,
    notification_type public.notification_type null default 'info'::notification_type,
    created_at timestamp with time zone null default now(),
    is_read boolean null default false,
    payload jsonb null,
    receiver_id uuid[] not null,
    constraint notifications_pkey primary key (id),
    constraint notifications_user_id_fkey foreign key (user_id) references auth.users (id)
) tablespace pg_default;


-- Step 1: Enable RLS on the notifications table
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Step 2: Enable Realtime option in the notifications table
ALTER publication supabase_realtime add table public.notifications;


-- Step 3: Create Policies

-- Allow users to view their own notifications
CREATE POLICY "Allow users to select their own notifications"
ON notifications
FOR SELECT
                     USING (auth.uid() = user_id);

-- Allow users to update their own notifications
CREATE POLICY "Allow users to update their own notifications"
ON notifications
FOR UPDATE
               USING (auth.uid() = user_id);

-- Allow only admins to insert notifications
CREATE POLICY "Allow admins to insert notifications"
ON notifications
FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND is_super_admin = true));

-- Deny all access by default
CREATE POLICY "Deny all access by default"
ON notifications
FOR ALL
USING (false);
