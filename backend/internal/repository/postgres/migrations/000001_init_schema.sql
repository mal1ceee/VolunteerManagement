CREATE TYPE user_role AS ENUM ('admin', 'volunteer');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'complete');
CREATE TYPE signup_status AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE volunteers (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    skills TEXT[] NOT NULL,
    availability TEXT NOT NULL,
    bio TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    created_by BIGINT REFERENCES users(id),
    capacity INTEGER NOT NULL,
    status event_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE signups (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT REFERENCES events(id),
    volunteer_id BIGINT REFERENCES volunteers(id),
    status signup_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_signups_event ON signups(event_id);
CREATE INDEX idx_signups_volunteer ON signups(volunteer_id); 