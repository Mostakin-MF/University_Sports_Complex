-- SQL Script to Populate Dummy Data for Universal University Sports Complex Management System

-- 1. Insert Dummy Users
-- Password for all dummy users is 'password123' (hashed)
-- Bcrypt hash for 'password123': $2b$10$yGwAlSrsKv6V56FfUD1qGuT0tffkOPnMsqO5BNz50ojU2F7UqZXRm
INSERT INTO users (id, email, password_hash, full_name, student_id, phone_number, role, status, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111111', 'admin@university.edu', '$2b$10$yGwAlSrsKv6V56FfUD1qGuT0tffkOPnMsqO5BNz50ojU2F7UqZXRm', 'System Admin', NULL, '01711111111', 'ADMIN', 'ACTIVE', NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'staff@university.edu', '$2b$10$yGwAlSrsKv6V56FfUD1qGuT0tffkOPnMsqO5BNz50ojU2F7UqZXRm', 'Facility Manager John', NULL, '01722222222', 'STAFF', 'ACTIVE', NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', 'student@university.edu', '$2b$10$yGwAlSrsKv6V56FfUD1qGuT0tffkOPnMsqO5BNz50ojU2F7UqZXRm', 'John Doe', '20-42000-1', '01733333333', 'STUDENT', 'ACTIVE', NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'jane@university.edu', '$2b$10$yGwAlSrsKv6V56FfUD1qGuT0tffkOPnMsqO5BNz50ojU2F7UqZXRm', 'Jane Smith', '21-44000-2', '01744444444', 'STUDENT', 'ACTIVE', NOW(), NOW());

-- 2. Insert Dummy Facilities
INSERT INTO facilities (id, name, description, location_address, capacity, facility_type, amenities, image_url, status, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111112', 'Main Basketball Court', 'Full-size indoor basketball court with professional flooring.', 'Sports Building, 1st Floor', 20, 'INDOOR', '{"water": true, "AC": true, "lockers": true}', 'https://images.unsplash.com/photo-1544919982-b61976f0ba43', 'AVAILABLE', NOW(), NOW()),
('22222222-2222-2222-2222-222222222223', 'Tennis Court A', 'Outdoor synthetic tennis court with night lighting.', 'Complex Outdoor Area', 4, 'OUTDOOR', '{"lighting": true, "seating": true}', 'https://images.unsplash.com/photo-1595435066319-7057fe20b082', 'AVAILABLE', NOW(), NOW()),
('33333333-3333-3333-3333-333333333334', 'Swimming Pool', 'Olympic size indoor swimming pool.', 'Annex Building, Basement', 30, 'INDOOR', '{"showers": true, "heating": true}', 'https://images.unsplash.com/photo-1519315901367-f34ff9154487', 'MAINTENANCE', NOW(), NOW());

-- 3. Insert Dummy Slots
INSERT INTO slots (id, "facilityId", sport_type, start_time, end_time, day_of_week, max_capacity, current_bookings, status, price, created_at, updated_at) VALUES
-- Basketball Slots
('11111111-1111-1111-1111-111111111115', '11111111-1111-1111-1111-111111111112', 'Basketball', '09:00:00', '10:00:00', 1, 10, 0, 'AVAILABLE', 0.00, NOW(), NOW()),
('22222222-2222-2222-2222-222222222225', '11111111-1111-1111-1111-111111111112', 'Basketball', '10:00:00', '11:00:00', 1, 10, 5, 'AVAILABLE', 0.00, NOW(), NOW()),
-- Tennis Slots
('33333333-3333-3333-3333-333333333335', '22222222-2222-2222-2222-222222222223', 'Tennis', '16:00:00', '17:00:00', 3, 4, 2, 'AVAILABLE', 50.00, NOW(), NOW()),
('44444444-4444-4444-4444-444444444445', '22222222-2222-2222-2222-222222222223', 'Tennis', '17:00:00', '18:00:00', 3, 4, 4, 'FULL', 50.00, NOW(), NOW());

-- 4. Insert Dummy Bookings
INSERT INTO bookings (id, "userId", "slotId", "facilityId", booking_date, team_name, player_count, status, total_amount, payment_status, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111116', '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222225', '11111111-1111-1111-1111-111111111112', '2025-01-10', 'Titans', 5, 'CONFIRMED', 0.00, 'COMPLETED', NOW(), NOW()),
('22222222-2222-2222-2222-222222222226', '44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333335', '22222222-2222-2222-2222-222222222223', '2025-01-12', 'Aces', 2, 'CONFIRMED', 50.00, 'PENDING', NOW(), NOW());

-- 5. Insert Dummy Tournaments
INSERT INTO tournaments (id, name, sport_type, description, start_date, end_date, registration_deadline, max_teams, current_teams, registration_fee, status, tournament_format, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111117', 'Inter-Department Basketball 2025', 'Basketball', 'The biggest sports event of the semester.', '2025-02-01', '2025-02-15', '2025-01-25', 16, 8, 200.00, 'REGISTRATION_OPEN', 'Knockout', NOW(), NOW());

-- 6. Insert Dummy Teams
INSERT INTO teams (id, "tournamentId", team_name, "captainId", member_count, registration_date, status) VALUES
('11111111-1111-1111-1111-111111111118', '11111111-1111-1111-1111-111111111117', 'CSE Warriors', '33333333-3333-3333-3333-333333333333', 10, NOW(), 'REGISTERED');
