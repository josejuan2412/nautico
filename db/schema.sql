CREATE TABLE IF NOT EXISTS event (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    date DATETIME DEFAULT current_timestamp,
    position INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_event_date ON event (date);

CREATE INDEX IF NOT EXISTS idx_event_position ON event (position);

CREATE TABLE IF NOT EXISTS event_picture (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    event_id INTEGER NOT NULL,
    directory TEXT NOT NULL,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (event_id) REFERENCES event (id)
);

CREATE INDEX IF NOT EXISTS idx_event_picture_event_id ON event_picture (event_id);

CREATE INDEX IF NOT EXISTS idx_event_picture_created_at ON event_picture (created_at);
