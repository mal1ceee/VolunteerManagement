-- Insert sample event signups
INSERT INTO signups (volunteer_id, event_id, status, created_at, updated_at)
VALUES
  (1, 1, 'confirmed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- John Volunteer for Animal Shelter Cleanup
  (2, 1, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),    -- Jane Volunteer for Animal Shelter Cleanup
  (1, 2, 'confirmed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- John Volunteer for Food Distribution Event
  (2, 4, 'confirmed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);  -- Jane Volunteer for Food Drive 