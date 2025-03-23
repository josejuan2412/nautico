INSERT INTO
    event (id, name, position)
VALUES
    (1, 'January 2025', 0);

INSERT INTO
    event (id, name, position)
VALUES
    (2, 'February 2025', 1);

INSERT INTO
    event (id, name, position)
VALUES
    (3, 'March 2025', 2);

/*Create tournament*/
INSERT INTO
    tournament (id, name, slug, position)
VALUES
    (1, 'Tournament 2025', 'tournament-2025', 0);

/*Add category*/
INSERT INTO
    tournament_category (id, name, tournament_id, category_type)
VALUES
    (1, 'Wahoo', 1, 'weight');

/*Add fisherman in the tournament*/
INSERT INTO
    tournament_fisherman (id, name, tournament_id, is_enabled)
VALUES
    (1, 'John Doe', 1, 1);

INSERT INTO
    tournament_fisherman (id, name, tournament_id, is_enabled)
VALUES
    (2, 'Jane Doe', 1, 1);

/*Add tournament entry*/
INSERT INTO
    tournament_entry (
        id,
        tournament_id,
        tournament_fisherman_id,
        tournament_category_id,
        value
    )
VALUES
    (1, 1, 1, 1, 25.64);

SELECT
    *
FROM
    tournament_fisherman
WHERE
    tournament_id = 1
ORDER BY
    position asc;
