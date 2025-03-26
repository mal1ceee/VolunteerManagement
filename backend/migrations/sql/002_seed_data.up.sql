-- Insert sample users
INSERT INTO users (email, password, name, role, created_at, updated_at)
VALUES
  ('admin@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'System Admin', 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('org1@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'Animal Rescue Org', 'organization', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('org2@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'Food Bank', 'organization', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('volunteer1@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'John Volunteer', 'volunteer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('volunteer2@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'Jane Volunteer', 'volunteer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample organizations (using user IDs from above)
INSERT INTO organizations (user_id, name, short_desc, logo, website, email, phone, category, status, created_at, updated_at)
VALUES
  (2, 'Animal Rescue Organization', 'We help animals find homes', 'https://placehold.co/100x100?text=ARO', 'https://animalrescue.example.com', 'org1@example.com', '555-123-4567', 'animal welfare', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (3, 'Community Food Bank', 'Fighting hunger in our community', 'https://placehold.co/100x100?text=CFB', 'https://foodbank.example.com', 'org2@example.com', '555-987-6543', 'food', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample volunteers (using user IDs from above)
INSERT INTO volunteers (user_id, bio, location, skills, availability, experience_level, created_at, updated_at)
VALUES
  (4, 'Passionate about helping animals and people', 'New York, NY', ARRAY['animal care', 'teaching', 'driving'], ARRAY['weekends', 'evenings'], 'intermediate', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (5, 'College student looking to make a difference', 'Boston, MA', ARRAY['event planning', 'social media', 'cooking'], ARRAY['summer', 'weekends'], 'beginner', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample events
INSERT INTO events (organization_id, title, description, short_description, date, location, volunteers_needed, status, category, created_at, updated_at)
VALUES
  (1, 'Pet Adoption Day', 'Help animals find their forever homes at our adoption event', 'Pet adoption event', CURRENT_TIMESTAMP + INTERVAL '30 DAY', 'Central Park, NY', 10, 'active', 'animal welfare', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (1, 'Shelter Cleaning Day', 'Help us clean and maintain our animal shelter', 'Shelter maintenance', CURRENT_TIMESTAMP + INTERVAL '14 DAY', 'Animal Shelter, NY', 5, 'active', 'animal welfare', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'Food Drive', 'Collect and sort food donations for the food bank', 'Collect food donations', CURRENT_TIMESTAMP + INTERVAL '7 DAY', 'Community Center, Boston', 8, 'active', 'food', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'Meal Preparation', 'Help prepare meals for those in need', 'Prepare meals', CURRENT_TIMESTAMP + INTERVAL '2 DAY', 'Food Bank Kitchen, Boston', 6, 'active', 'food', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample event registrations
INSERT INTO event_registrations (event_id, volunteer_id, status, created_at, updated_at)
VALUES
  (1, 1, 'registered', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (3, 1, 'registered', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 2, 'registered', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (4, 2, 'registered', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample conversations
INSERT INTO conversations (user_id_1, user_id_2, created_at, updated_at)
VALUES
  (4, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample messages
INSERT INTO messages (conversation_id, sender_id, recipient_id, text, read_status, timestamp, created_at, updated_at)
VALUES
  (1, 4, 2, 'Hello, I''m interested in volunteering for the Pet Adoption Day event.', true, CURRENT_TIMESTAMP - INTERVAL '2 DAY', CURRENT_TIMESTAMP - INTERVAL '2 DAY', CURRENT_TIMESTAMP - INTERVAL '2 DAY'),
  (1, 2, 4, 'Great! We''d love to have you. Have you worked with animals before?', true, CURRENT_TIMESTAMP - INTERVAL '1 DAY', CURRENT_TIMESTAMP - INTERVAL '1 DAY', CURRENT_TIMESTAMP - INTERVAL '1 DAY'),
  (1, 4, 2, 'Yes, I have experience with dogs and cats. I volunteered at a shelter last year.', false, CURRENT_TIMESTAMP - INTERVAL '12 HOUR', CURRENT_TIMESTAMP - INTERVAL '12 HOUR', CURRENT_TIMESTAMP - INTERVAL '12 HOUR'),
  (2, 5, 3, 'Hi, I saw your Food Drive event. Can I bring some friends to help too?', true, CURRENT_TIMESTAMP - INTERVAL '3 DAY', CURRENT_TIMESTAMP - INTERVAL '3 DAY', CURRENT_TIMESTAMP - INTERVAL '3 DAY'),
  (2, 3, 5, 'Absolutely! The more the merrier. We appreciate all the help we can get.', false, CURRENT_TIMESTAMP - INTERVAL '2 DAY', CURRENT_TIMESTAMP - INTERVAL '2 DAY', CURRENT_TIMESTAMP - INTERVAL '2 DAY'); 