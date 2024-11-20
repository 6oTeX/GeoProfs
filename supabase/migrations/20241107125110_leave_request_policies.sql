alter table "public"."leave_requests" enable row level security;


-- SELECT
CREATE POLICY "Enable users to view their own leave requests"
ON "public"."leave_requests"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
    (select auth.uid()) = user_id
);

-- INSERT
CREATE POLICY "Enable insert"
ON "public"."leave_requests"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
    (select auth.uid() = user_id)
);

CREATE OR REPLACE FUNCTION leave_request_insert_fxn()
RETURNS TRIGGER AS $$
BEGIN
    -- set default values
    NEW.state := 'submitted';
    NEW.reviewed_by := null;
    -- send notification
    -- INSERT INTO notifications 
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leave_requests_insert_trigger
BEFORE INSERT ON "public"."leave_requests"
FOR EACH ROW
EXECUTE FUNCTION leave_request_insert_fxn();