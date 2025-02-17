
CREATE TYPE public.leave_request_state AS ENUM (
    'submitted',
    'accepted',
    'declined',
    'resubmitted'
);

CREATE TYPE public.leave_request_reasons as ENUM (
    'sick',
    'vacation',
    'wedding',
    'death',
    'other'
); 

create table
  public.leave_requests (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null,
    created_at timestamp with time zone not null default now(),
    start_date timestamp with time zone not null,
    end_date timestamp with time zone not null,
    reason text not null,
    explanation text not null,
    state public.leave_request_state not null,
    reviewed_by uuid null,
    response text null,
    constraint leave_request_pkey primary key (id)
  ) tablespace pg_default;

