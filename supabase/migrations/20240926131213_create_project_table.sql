create table
  public.projects (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text not null,
    start_date timestamp with time zone not null,
    end_date timestamp with time zone not null,
    constraint project_pkey primary key (id)
  ) tablespace pg_default;