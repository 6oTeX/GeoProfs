

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

-- Step 2: Create Policies

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

-- Create a table for public profiles
create table profiles (
    id uuid references auth.users on delete cascade not null primary key,
    updated_at timestamp with time zone,
    username text unique,
    full_name text,
    avatar_url text,
    website text,
constraint username_length check (char_length(username) >= 3)
);


-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
    enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
    returns trigger
    set search_path = ''
as $$
begin
insert into public.profiles (id, full_name, avatar_url)
values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');