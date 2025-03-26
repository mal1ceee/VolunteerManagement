-- Insert sample organizations
INSERT INTO organizations (user_id, name, description, website, logo, location, category, status, created_at, updated_at)
VALUES
  (2, 'Animal Rescue Org', 'Organization dedicated to rescuing and rehoming animals', 'https://animalrescueorg.org', '/logos/animal_rescue.png', 'New York, NY', 'Animal Welfare', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (3, 'Food Bank', 'Organization providing food to those in need', 'https://foodbank.org', '/logos/food_bank.png', 'Los Angeles, CA', 'Food Security', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 