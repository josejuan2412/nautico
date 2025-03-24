/*Table that enables to group files in a group*/
CREATE TABLE IF NOT EXISTS file_group (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    directory TEXT NOT NULL,
    created_at DATETIME DEFAULT current_timestamp,
    UNIQUE (directory)
);

CREATE INDEX IF NOT EXISTS idx_file_group_created_at ON file_group (created_at);

/*Create a particular event*/
CREATE TABLE IF NOT EXISTS event (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    date DATETIME DEFAULT current_timestamp,
    position INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_event_date ON event (date);

CREATE INDEX IF NOT EXISTS idx_event_position ON event (position);

CREATE TABLE IF NOT EXISTS event_file_group (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    event_id INTEGER NOT NULL,
    file_group_id INTEGER NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    date DATETIME DEFAULT current_timestamp,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (event_id) REFERENCES event (id),
    FOREIGN KEY (file_group_id) REFERENCES file_group (id)
);

CREATE INDEX IF NOT EXISTS idx_event_file_group_event_id ON event_file_group (event_id);

CREATE INDEX IF NOT EXISTS idx_event_file_group_file_group_id ON event_file_group (file_group_id);

CREATE INDEX IF NOT EXISTS idx_event_file_group_position ON event_file_group (position);

CREATE INDEX IF NOT EXISTS idx_event_file_group_date ON event_file_group (date);

CREATE INDEX IF NOT EXISTS idx_event_file_group_created_at ON event_file_group (created_at);

CREATE TABLE IF NOT EXISTS tournament (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    slug TEXT NOT NULL UNIQUE,
    position INTEGER DEFAULT 0,
    date DATETIME DEFAULT current_timestamp,
    created_at DATETIME DEFAULT current_timestamp
);

/*Create index for sorting*/
CREATE INDEX IF NOT EXISTS idx_tournament_slug ON tournament (slug);

/*Create index for sorting*/
CREATE INDEX IF NOT EXISTS idx_tournament_position ON tournament (position);

/*Create index for sorting*/
CREATE INDEX IF NOT EXISTS idx_tournament_date ON tournament (date);

/*Create index for sorting*/
CREATE INDEX IF NOT EXISTS idx_tournament_created_at ON tournament (created_at);

/*Stores the fisherman in the tournament*/
CREATE TABLE IF NOT EXISTS tournament_fisherman (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    email TEXT,
    tournament_id INTEGER NOT NULL,
    is_enabled INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (tournament_id) REFERENCES tournament (id),
    UNIQUE (name, tournament_id)
);

/*Create index for FK*/
CREATE INDEX IF NOT EXISTS idx_tournament_fisherman_tournament_id ON tournament_fisherman (tournament_id);

/*Create index for sorting*/
CREATE INDEX IF NOT EXISTS idx_tournament_fisherman_created_at ON tournament_fisherman (created_at);

/*Create index that checks if the fisherman is enabled*/
CREATE INDEX IF NOT EXISTS idx_tournament_fisherman_is_enabled ON tournament_fisherman (is_enabled);

/*Stores the boat for the tournament*/
CREATE TABLE IF NOT EXISTS tournament_boat (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    tournament_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (tournament_id) REFERENCES tournament (id),
    UNIQUE (name, tournament_id)
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
    category_type TEXT CHECK (category_type IN ('points', 'weight')) NOT NULL DEFAULT 'weight',
    category_limit INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (tournament_id) REFERENCES tournament (id)
);

CREATE INDEX IF NOT EXISTS idx_tournament_category_created_at ON tournament_category (created_at);

/*Stores the category for the tournament*/
CREATE TABLE IF NOT EXISTS tournament_entry (
    id INTEGER PRIMARY KEY,
    tournament_id INTEGER NOT NULL,
    tournament_fisherman_id INTEGER NOT NULL,
    tournament_boat_id INTEGER DEFAULT NULL,
    tournament_category_id INTEGER NOT NULL,
    value REAL NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT current_timestamp,
    FOREIGN KEY (tournament_id) REFERENCES tournament (id),
    FOREIGN KEY (tournament_fisherman_id) REFERENCES tournament_fisherman (id),
    FOREIGN KEY (tournament_boat_id) REFERENCES tournament_boat (id),
    FOREIGN KEY (tournament_category_id) REFERENCES tournament_category (id)
);

CREATE INDEX IF NOT EXISTS idx_tournament_entry_created_at ON tournament_entry (created_at);
