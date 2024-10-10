

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