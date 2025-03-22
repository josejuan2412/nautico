CREATE TABLE IF NOT EXISTS event (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    date DATETIME DEFAULT current_timestamp,
    position INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_event_date ON event (date);

CREATE INDEX IF NOT EXISTS idx_event_position ON event (position);

CREATE TABLE IF NOT EXISTS event_group (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    event_id INTEGER NOT NULL,
    directory TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    date DATETIME DEFAULT current_timestamp,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (event_id) REFERENCES event (id)
);

CREATE INDEX IF NOT EXISTS idx_event_group_event_id ON event_group (event_id);

CREATE INDEX IF NOT EXISTS idx_event_group_created_at ON event_group (created_at);

CREATE INDEX IF NOT EXISTS idx_event_group_date ON event_group (date);

CREATE INDEX IF NOT EXISTS idx_event_group_position ON event_group (position);
