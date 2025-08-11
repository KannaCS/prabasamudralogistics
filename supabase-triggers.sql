-- SQL Triggers for @updatedAt functionality in Supabase
-- This script creates triggers to automatically update the updatedAt column
-- when records are modified in the Booking and Contact tables

-- Create or replace the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for Booking table
DROP TRIGGER IF EXISTS update_booking_updated_at ON "Booking";
CREATE TRIGGER update_booking_updated_at
    BEFORE UPDATE ON "Booking"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for Contact table
DROP TRIGGER IF EXISTS update_contact_updated_at ON "Contact";
CREATE TRIGGER update_contact_updated_at
    BEFORE UPDATE ON "Contact"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify that triggers were created successfully
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND event_object_table IN ('Booking', 'Contact')
ORDER BY event_object_table, trigger_name;