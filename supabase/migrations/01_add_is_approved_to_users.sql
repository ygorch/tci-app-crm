-- This migration script is intended to be run once to update existing users.
-- For new users, the 'is_approved' status will be set programmatically
-- during the sign-up process.

-- Add an 'is_approved' field, defaulting to false, to the metadata of all existing users
-- who do not already have this field.
UPDATE auth.users
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"is_approved": false}'::jsonb
WHERE (raw_user_meta_data ->> 'is_approved') IS NULL;

-- Note: This script only affects existing users at the time of execution.
-- The application logic must handle setting this metadata for all new sign-ups.
