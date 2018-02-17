DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS brew CASCADE;
DROP TABLE IF EXISTS brew_comment CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR,
    points INTEGER
);
INSERT INTO users (username, password, email, points)
    VALUES ('petereps', 'supersecret', 'peter@me.com', 10);

CREATE TABLE brew (
    brew_id SERIAL PRIMARY KEY,
    user_id INTEGER references users(id),
    brew_name VARCHAR NOT NULL,
    brew_date timestamp without time zone NOT NULL,
    points INTEGER,
    brew_method VARCHAR NOT NULL,
    water_units MONEY NOT NULL,
    coffee_units MONEY  NOT NULL,
    water_metric boolean NOT NULL,
    coffee_metric boolean NOT NULL,
    notes VARCHAR NOT NULL,
    grind VARCHAR NOT NULL,
    bloom_time INTEGER,
    brew_time INTEGER,
    tempature INTEGER
);

CREATE TABLE brew_comment (
    brew_id INTEGER references brew(brew_id),
    user_id INTEGER references users(id),
    comment_id SERIAL PRIMARY KEY,
    comment_text VARCHAR NOT NULL,
    comment_date timestamp without time zone NOT NULL,
    points INTEGER
);