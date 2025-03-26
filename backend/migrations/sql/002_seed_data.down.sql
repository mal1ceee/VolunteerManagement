-- Delete all seed data in reverse order to avoid foreign key constraint violations
DELETE FROM messages;
DELETE FROM conversations;
DELETE FROM event_registrations;
DELETE FROM events;
DELETE FROM volunteers;
DELETE FROM organizations;
DELETE FROM users; 