-- Insert sample events
INSERT INTO events (title, description, location, date, created_by, capacity, status, created_at, updated_at)
VALUES
  ('Animal Shelter Cleanup', 'Help clean and organize our local animal shelter', 'New York, NY', CURRENT_DATE + INTERVAL '14 days', 2, 10, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Food Distribution Event', 'Distribute food packages to families in need', 'Los Angeles, CA', CURRENT_DATE + INTERVAL '7 days', 3, 15, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Pet Adoption Day', 'Help animals find their forever homes', 'New York, NY', CURRENT_DATE + INTERVAL '21 days', 2, 8, 'draft', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Food Drive', 'Collect food donations for local food bank', 'Los Angeles, CA', CURRENT_DATE + INTERVAL '30 days', 3, 20, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 