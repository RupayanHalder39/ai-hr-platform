INSERT INTO roles (name, permissions)
VALUES
  ('Admin', '["hiring:view","hiring:manage","settings:manage"]'::jsonb),
  ('Recruiter', '["hiring:view","hiring:manage"]'::jsonb),
  ('Interviewer', '["hiring:view"]'::jsonb)
ON CONFLICT (name) DO NOTHING;

INSERT INTO stages (name, order_index)
VALUES
  ('Applied', 1),
  ('Assignment', 2),
  ('Interview', 3),
  ('Offer', 4)
ON CONFLICT (name) DO NOTHING;

INSERT INTO statuses (entity_type, name)
VALUES
  ('assignment', 'Pending'),
  ('assignment', 'Completed'),
  ('assignment', 'Rejected'),
  ('interview', 'Pending'),
  ('interview', 'Completed'),
  ('interview', 'Rejected'),
  ('offer', 'Pending'),
  ('offer', 'Approved'),
  ('offer', 'Rejected'),
  ('job', 'Pending'),
  ('job', 'Approved'),
  ('job', 'Rejected')
ON CONFLICT DO NOTHING;
