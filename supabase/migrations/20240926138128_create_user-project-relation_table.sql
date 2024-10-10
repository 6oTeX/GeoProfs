create table
  public.user_project_relations (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    project_id uuid not null,
    user_id uuid not null,
    constraint user_project_relations_pkey primary key (id),
    constraint user_project_relations_project_id_fkey foreign key (project_id) references projects (id),
    constraint user_project_relations_user_id_fkey foreign key (user_id) references profiles (id)
  ) tablespace pg_default; 