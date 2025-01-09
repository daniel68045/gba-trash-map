-- Example data for testing

-- This file could be used populate the database with initial data for testing or demonstration purposes

-- Clear existing data
DELETE FROM trash_logs;

-- Insert dummy trash logs
INSERT INTO trash_logs (latitude, longitude, description, created_at)
VALUES
  (42.3611, -71.0570, 'Trash found near Boston Common', '2025-01-08T12:00:00'),
  (42.3581, -71.0636, 'Overflowing trash can on Tremont St', '2025-01-08T13:00:00'),
  (42.3546, -71.0657, 'Litter near Back Bay Station', '2025-01-08T14:00:00'),
  (42.3662, -71.0621, 'Illegal dumping near Charlestown', '2025-01-08T15:00:00'),

  -- Add more test logs around Greater Boston
  (42.3602, -71.0571, 'Trash near the State House', '2025-01-08T16:00:00'),
  (42.3593, -71.0590, 'Litter on Beacon Street', '2025-01-08T16:30:00'),
  (42.3550, -71.0623, 'Overflowing trash bin in Chinatown', '2025-01-08T17:00:00'),
  (42.3671, -71.0618, 'Trash scattered near Bunker Hill', '2025-01-08T17:30:00'),

  -- Random data for testing clustering
  (42.3500, -71.0700, 'Random trash near Copley', '2025-01-08T18:00:00'),
  (42.3551, -71.0553, 'Trash near Boston Tea Party Museum', '2025-01-08T18:30:00'),
  (42.3533, -71.0653, 'Trash near South Station', '2025-01-08T19:00:00'),
  (42.3513, -71.0587, 'Litter near Financial District', '2025-01-08T19:30:00');
