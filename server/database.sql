CREATE TABLE producer (
	producer_id  serial PRIMARY KEY,
	producer_name	text NOT NULL
);

CREATE TABLE movie (
  movie_id serial PRIMARY KEY,
  movie_name text NOT NULL,
  producer_id	int REFERENCES producer(producer_id) NOT NULL
);

CREATE TABLE actor (
  actor_id  serial PRIMARY KEY,
  actor_name text NOT NULL,
);

CREATE TABLE actor_movie (
  actor_id    int REFERENCES actor (actor_id) ON UPDATE CASCADE ON DELETE CASCADE,
  movie_id	  int REFERENCES movie (movie_id) ON UPDATE CASCADE,
  CONSTRAINT  actor_movie_pkey PRIMARY KEY (actor_id, movie_id)
);