-- Insert sample volunteer profiles
INSERT INTO volunteers (user_id, skills, availability, bio, created_at, updated_at)
VALUES
  (4, ARRAY['Teaching', 'Mentoring', 'Event Planning'], ARRAY['Weekends', 'Evenings'], 'Experienced volunteer looking to help with educational and community events', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (5, ARRAY['First Aid', 'Driving', 'Animal Care'], ARRAY['Weekdays', 'Mornings'], 'Passionate about helping animals and providing transportation services', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 