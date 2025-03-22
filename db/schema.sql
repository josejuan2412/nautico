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

CREATE TABLE IF NOT EXISTS tournament (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (event_id) REFERENCES event (id)
);

/*Create index for sorting*/
CREATE INDEX IF NOT EXISTS idx_tournament_created_at ON tournament (created_at);

/*Stores the fisherman in the tournament*/
CREATE TABLE IF NOT EXISTS tournament_fisherman (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    tournament_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (tournament_id) REFERENCES tournament (id)
);

/*Create index for FK*/
CREATE INDEX IF NOT EXISTS idx_tournament_fisherman_tournament_id ON tournament_fisherman (tournament_id);

/*Create index for sorting*/
CREATE INDEX IF NOT EXISTS idx_tournament_fisherman_created_at ON tournament_fisherman (created_at);

/*Stores the boat for the tournament*/
CREATE TABLE IF NOT EXISTS tournament_boat (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    tournament_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (tournament_id) REFERENCES tournament (id)
);

/*Create index for FK*/
CREATE INDEX IF NOT EXISTS idx_tournament_boat_tournament_id ON tournament_boat (tournament_id);

/*Create index for sorting*/
CREATE INDEX IF NOT EXISTS idx_tournament_boat_created_at ON tournament_boat (created_at);

/*Stores the category for the tournament*/
CREATE TABLE IF NOT EXISTS tournament_category (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    tournament_id INTEGER NOT NULL,
    category_type TEXT CHECK (category_type IN ('points', 'weight')) NOT NULL DEFAULT 'points',
    created_at DATETIME DEFAULT current_timestamp,
    is_largest INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (tournament_id) REFERENCES tournament (id)
);

/*Stores the category for the tournament*/
CREATE TABLE IF NOT EXISTS tournament_entry (
    id INTEGER PRIMARY KEY,
    tournament_fisherman_id INTEGER NOT NULL,
    tournament_boat_id INTEGER NOT NULL,
    tournament_category_id INTEGER NOT NULL,
    value REAL NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (tournament_id) REFERENCES tournament (id),
    FOREIGN KEY (tournament_id) REFERENCES tournament (id),
    FOREIGN KEY (tournament_id) REFERENCES tournament (id)
);
