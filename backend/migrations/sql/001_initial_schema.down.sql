-- Drop indexes
DROP INDEX IF EXISTS idx_messages_read_status;
DROP INDEX IF EXISTS idx_messages_recipient;
DROP INDEX IF EXISTS idx_messages_sender;
DROP INDEX IF EXISTS idx_messages_conversation;
DROP INDEX IF EXISTS idx_conversation_users;
DROP INDEX IF EXISTS idx_registrations_volunteer;
DROP INDEX IF EXISTS idx_registrations_event;
DROP INDEX IF EXISTS idx_events_status;
DROP INDEX IF EXISTS idx_events_date;
DROP INDEX IF EXISTS idx_organizations_status;
DROP INDEX IF EXISTS idx_users_role;

-- Drop tables in reverse order to avoid foreign key constraint violations
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS volunteers;
DROP TABLE IF EXISTS organizations;
DROP TABLE IF EXISTS users; 