-- Insert sample users
INSERT INTO users (name, email, password_hash, role, created_at, updated_at)
VALUES
  ('System Admin', 'admin@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Rescue Org Admin', 'org1@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Food Bank Admin', 'org2@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('John Volunteer', 'volunteer1@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'volunteer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Jane Volunteer', 'volunteer2@example.com', '$2a$10$GmfYRQdVj.UHzTRDXvEsU.zqn4eGn5Q0xB3TeMrNkiCr3DT.wUJ8e', 'volunteer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 