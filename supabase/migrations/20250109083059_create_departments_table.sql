create table
  public.departments (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text not null,
    manager uuid not null,
    constraint departments_pkey primary key (id)
  ) tablespace pg_default;