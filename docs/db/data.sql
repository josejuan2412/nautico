/*Create tournament*/
INSERT INTO
    tournament (id, name, slug, position)
VALUES
    (1, 'Tournament 2025', 'tournament-2025', 0);

/*Add category*/
INSERT INTO
    tournament_category (
        id,
        name,
        tournament_id,
        category_type,
        "position"
    )
VALUES
    (1, 'Wahoo', 1, 'weight', 0);

/*Add category*/
INSERT INTO
    tournament_category (
        id,
        name,
        tournament_id,
        category_type,
        "position"
    )
VALUES
    (2, 'Merlin', 1, 'points', 1);

/*Add fisherman in the tournament*/
INSERT INTO
    tournament_fisherman (id, name, tournament_id, is_enabled)
VALUES
    (1, 'John Doe', 1, 1);

INSERT INTO
    tournament_fisherman (id, name, tournament_id, is_enabled)
VALUES
    (2, 'Jane Doe', 1, 1);

/*Add boat in the tournament*/
INSERT INTO
    tournament_boat (id, name, tournament_id)
VALUES
    (1, 'Last Cast', 1);

/*Add tournament entry*/
INSERT INTO
    tournament_entry (
        id,
        tournament_id,
        tournament_category_id,
        tournament_fisherman_id,
        tournament_boat_id,
        value
    )
VALUES
    (1, 1, 1, 1, 1, 25.64);

INSERT INTO
    tournament_entry (
        id,
        tournament_id,
        tournament_category_id,
        tournament_fisherman_id,
        tournament_boat_id,
        value
    )
VALUES
    (2, 1, 1, 1, 1, 30.95);

INSERT INTO
    tournament_entry (
        id,
        tournament_id,
        tournament_fisherman_id,
        tournament_boat_id,
        tournament_category_id,
        value
    )
VALUES
    (3, 1, 2, 1, 1, 30.95);

INSERT INTO
    tournament_entry (
        id,
        tournament_id,
        tournament_fisherman_id,
        tournament_boat_id,
        tournament_category_id,
        value
    )
VALUES
    (4, 1, 1, 1, 2, 100);

INSERT INTO
    tournament_entry (
        id,
        tournament_id,
        tournament_fisherman_id,
        tournament_boat_id,
        tournament_category_id,
        value
    )
VALUES
    (5, 1, 1, 1, 2, 200);

INSERT INTO
    tournament_entry (
        id,
        tournament_id,
        tournament_fisherman_id,
        tournament_boat_id,
        tournament_category_id,
        value
    )
VALUES
    (6, 1, 2, 1, 2, 200);

INSERT INTO
    tournament_entry (
        id,
        tournament_id,
        tournament_fisherman_id,
        tournament_boat_id,
        tournament_category_id,
        value
    )
VALUES
    (7, 1, 2, 1, 2, 50);
