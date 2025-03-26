-- Insert sample conversations
-- INSERT INTO conversations (user_id_1, user_id_2, created_at, updated_at)
-- VALUES
--   (2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- Rescue Org Admin and John Volunteer
--   (3, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);  -- Food Bank Admin and Jane Volunteer

-- Insert sample messages
INSERT INTO messages (conversation_id, sender_id, recipient_id, content, created_at, updated_at)
VALUES
  (5, 2, 4, 'Hi John, are you still available for the upcoming Animal Shelter Cleanup event?', CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_TIMESTAMP - INTERVAL '3 days'),
  (5, 4, 2, 'Yes, I am looking forward to it!', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '2 days'),
  (5, 2, 4, 'Great! We will see you there.', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP - INTERVAL '1 day'),
  
  (6, 3, 5, 'Hello Jane, would you be interested in an additional food drive event next month?', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '2 days'),
  (6, 5, 3, 'Absolutely, I would love to help out.', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP - INTERVAL '1 day'),
  (6, 3, 5, 'Perfect! I will add you to the volunteer list.', CURRENT_TIMESTAMP - INTERVAL '12 hours', CURRENT_TIMESTAMP - INTERVAL '12 hours'); 