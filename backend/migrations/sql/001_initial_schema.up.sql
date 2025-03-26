-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'volunteer', 'organization', 'admin'
    avatar VARCHAR(255),
    last_active TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    logo VARCHAR(255),
    location VARCHAR(255),
    category VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'verified', 'rejected'
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_organization_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    location VARCHAR(255),
    skills TEXT[],
    availability TEXT[],
    date_of_birth DATE,
    experience_level VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_volunteer_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    location VARCHAR(255) NOT NULL,
    location_details TEXT,
    skills_required TEXT[],
    volunteers_needed INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'complete'
    image VARCHAR(255),
    category VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_organization FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    volunteer_id INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'registered', -- 'registered', 'attended', 'cancelled', 'no_show'
    hours_logged DECIMAL(5,2),
    feedback TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_registration_event FOREIGN KEY (event_id) REFERENCES events(id),
    CONSTRAINT fk_registration_volunteer FOREIGN KEY (volunteer_id) REFERENCES volunteers(id),
    CONSTRAINT uq_event_volunteer UNIQUE (event_id, volunteer_id)
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    user_id_1 INTEGER NOT NULL,
    user_id_2 INTEGER NOT NULL,
    last_message_text TEXT,
    last_message_time TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_conversation_user1 FOREIGN KEY (user_id_1) REFERENCES users(id),
    CONSTRAINT fk_conversation_user2 FOREIGN KEY (user_id_2) REFERENCES users(id),
    CONSTRAINT uq_conversation_users UNIQUE (user_id_1, user_id_2)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_message_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    CONSTRAINT fk_message_sender FOREIGN KEY (sender_id) REFERENCES users(id),
    CONSTRAINT fk_message_recipient FOREIGN KEY (recipient_id) REFERENCES users(id)
);

-- Create indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_organizations_status ON organizations(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_registrations_volunteer ON event_registrations(volunteer_id);
CREATE INDEX idx_conversation_users ON conversations(user_id_1, user_id_2);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_messages_read_status ON messages(is_read); 