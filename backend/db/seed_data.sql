INSERT INTO roles (name, permissions)
SELECT 'Admin', '["hiring:view", "settings:manage", "attendance:view", "payroll:view", "performance:view", "leave:view", "onboarding:view"]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'Admin');

INSERT INTO roles (name, permissions)
SELECT 'Senior Recruiter', '["hiring:view", "candidates:manage", "jobs:manage", "offers:view"]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'Senior Recruiter');

INSERT INTO roles (name, permissions)
SELECT 'Interviewer', '["hiring:view", "interviews:manage", "candidates:view"]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'Interviewer');

INSERT INTO roles (name, permissions)
SELECT 'External Consultant', '["hiring:view", "candidates:view"]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'External Consultant');

INSERT INTO users (name, email, role_id)
SELECT 'Admin User', 'admin@aihr.local', (SELECT id FROM roles WHERE name = 'Admin' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@aihr.local');

INSERT INTO statuses (entity_type, name)
SELECT 'job', 'Published'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'job' AND name = 'Published');

INSERT INTO statuses (entity_type, name)
SELECT 'job', 'Draft'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'job' AND name = 'Draft');

INSERT INTO statuses (entity_type, name)
SELECT 'job', 'Closed'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'job' AND name = 'Closed');

INSERT INTO statuses (entity_type, name)
SELECT 'offer', 'Pending Approval'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'offer' AND name = 'Pending Approval');

INSERT INTO statuses (entity_type, name)
SELECT 'offer', 'Approved'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'offer' AND name = 'Approved');

INSERT INTO statuses (entity_type, name)
SELECT 'interview', 'Scheduled'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'interview' AND name = 'Scheduled');

INSERT INTO statuses (entity_type, name)
SELECT 'interview', 'Completed'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'interview' AND name = 'Completed');

INSERT INTO statuses (entity_type, name)
SELECT 'assignment', 'Pending'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'assignment' AND name = 'Pending');

INSERT INTO statuses (entity_type, name)
SELECT 'assignment', 'Completed'
WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE entity_type = 'assignment' AND name = 'Completed');

INSERT INTO stages (name, order_index)
SELECT 'Applied', 1
WHERE NOT EXISTS (SELECT 1 FROM stages WHERE name = 'Applied');

INSERT INTO stages (name, order_index)
SELECT 'Technical Round', 2
WHERE NOT EXISTS (SELECT 1 FROM stages WHERE name = 'Technical Round');

INSERT INTO stages (name, order_index)
SELECT 'Interview', 3
WHERE NOT EXISTS (SELECT 1 FROM stages WHERE name = 'Interview');

INSERT INTO stages (name, order_index)
SELECT 'Offer', 4
WHERE NOT EXISTS (SELECT 1 FROM stages WHERE name = 'Offer');

INSERT INTO stages (name, order_index)
SELECT 'Rejected', 5
WHERE NOT EXISTS (SELECT 1 FROM stages WHERE name = 'Rejected');

INSERT INTO jobs (title, description, status_id, created_by, created_at)
SELECT 'Senior React Developer', 'Lead the React platform and mentor frontend engineers.', (SELECT id FROM statuses WHERE entity_type = 'job' AND name = 'Published' LIMIT 1), (SELECT id FROM users WHERE email = 'admin@aihr.local' LIMIT 1), NOW() - INTERVAL '20 days'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'Senior React Developer');

INSERT INTO jobs (title, description, status_id, created_by, created_at)
SELECT 'Backend Architect', 'Own system architecture and define scalable backend services.', (SELECT id FROM statuses WHERE entity_type = 'job' AND name = 'Published' LIMIT 1), (SELECT id FROM users WHERE email = 'admin@aihr.local' LIMIT 1), NOW() - INTERVAL '15 days'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'Backend Architect');

INSERT INTO jobs (title, description, status_id, created_by, created_at)
SELECT 'Product Designer', 'Craft user journeys and partner closely with product managers.', (SELECT id FROM statuses WHERE entity_type = 'job' AND name = 'Draft' LIMIT 1), (SELECT id FROM users WHERE email = 'admin@aihr.local' LIMIT 1), NOW() - INTERVAL '10 days'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'Product Designer');

INSERT INTO jobs (title, description, status_id, created_by, created_at)
SELECT 'DevOps Engineer', 'Automate CI/CD pipelines and improve infrastructure reliability.', (SELECT id FROM statuses WHERE entity_type = 'job' AND name = 'Published' LIMIT 1), (SELECT id FROM users WHERE email = 'admin@aihr.local' LIMIT 1), NOW() - INTERVAL '7 days'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'DevOps Engineer');

INSERT INTO jobs (title, description, status_id, created_by, created_at)
SELECT 'HR Manager', 'Lead people operations and HR strategy for growth.', (SELECT id FROM statuses WHERE entity_type = 'job' AND name = 'Closed' LIMIT 1), (SELECT id FROM users WHERE email = 'admin@aihr.local' LIMIT 1), NOW() - INTERVAL '2 days'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'HR Manager');

INSERT INTO candidates (name, github_link, job_id, stage_id, score, created_at)
VALUES
  ('Aisha Khan', 'https://github.com/aishak', (SELECT id FROM jobs WHERE title = 'Senior React Developer' LIMIT 1), (SELECT id FROM stages WHERE name = 'Applied' LIMIT 1), 82, NOW() - INTERVAL '6 days'),
  ('Rohit Mehra', 'https://github.com/rohitm', (SELECT id FROM jobs WHERE title = 'Senior React Developer' LIMIT 1), (SELECT id FROM stages WHERE name = 'Technical Round' LIMIT 1), 88, NOW() - INTERVAL '5 days'),
  ('Liam Chen', 'https://github.com/liamc', (SELECT id FROM jobs WHERE title = 'Backend Architect' LIMIT 1), (SELECT id FROM stages WHERE name = 'Interview' LIMIT 1), 91, NOW() - INTERVAL '12 days'),
  ('Sophia Patel', 'https://github.com/sophiap', (SELECT id FROM jobs WHERE title = 'Backend Architect' LIMIT 1), (SELECT id FROM stages WHERE name = 'Offer' LIMIT 1), 95, NOW() - INTERVAL '3 days'),
  ('Marco Ruiz', 'https://github.com/marcor', (SELECT id FROM jobs WHERE title = 'Backend Architect' LIMIT 1), (SELECT id FROM stages WHERE name = 'Rejected' LIMIT 1), 70, NOW() - INTERVAL '9 days'),
  ('Emma Stone', 'https://github.com/emmas', (SELECT id FROM jobs WHERE title = 'Product Designer' LIMIT 1), (SELECT id FROM stages WHERE name = 'Applied' LIMIT 1), 78, NOW() - INTERVAL '4 days'),
  ('Neha Singh', 'https://github.com/nehas', (SELECT id FROM jobs WHERE title = 'Product Designer' LIMIT 1), (SELECT id FROM stages WHERE name = 'Technical Round' LIMIT 1), 84, NOW() - INTERVAL '2 days'),
  ('George Blake', 'https://github.com/georgeb', (SELECT id FROM jobs WHERE title = 'DevOps Engineer' LIMIT 1), (SELECT id FROM stages WHERE name = 'Interview' LIMIT 1), 89, NOW() - INTERVAL '11 days'),
  ('Priya Das', 'https://github.com/priyad', (SELECT id FROM jobs WHERE title = 'DevOps Engineer' LIMIT 1), (SELECT id FROM stages WHERE name = 'Offer' LIMIT 1), 93, NOW() - INTERVAL '1 day'),
  ('Tara Lewis', 'https://github.com/taral', (SELECT id FROM jobs WHERE title = 'HR Manager' LIMIT 1), (SELECT id FROM stages WHERE name = 'Applied' LIMIT 1), 75, NOW() - INTERVAL '8 days'),
  ('Ivan Petrov', 'https://github.com/ivanp', (SELECT id FROM jobs WHERE title = 'HR Manager' LIMIT 1), (SELECT id FROM stages WHERE name = 'Interview' LIMIT 1), 86, NOW() - INTERVAL '7 days'),
  ('Zara Ali', 'https://github.com/zaraa', (SELECT id FROM jobs WHERE title = 'DevOps Engineer' LIMIT 1), (SELECT id FROM stages WHERE name = 'Rejected' LIMIT 1), 68, NOW() - INTERVAL '13 days');
