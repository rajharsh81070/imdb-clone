CREATE TABLE producer (
	producer_id  serial PRIMARY KEY,
	producer_name	text NOT NULL,
  producer_gender	text NOT NULL,
  producer_bio text NOT NULL,
  producer_dob DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE movie (
  movie_id serial PRIMARY KEY,
  movie_name text NOT NULL,
  movie_plot	text NOT NULL,
  movie_poster text NOT NULL,
  movie_yor DATE NOT NULL DEFAULT CURRENT_DATE,
  producer_id	int REFERENCES producer(producer_id) NOT NULL
);

CREATE TABLE actor (
  actor_id  serial PRIMARY KEY,
	actor_name	text NOT NULL,
  actor_gender	text NOT NULL,
  actor_bio text NOT NULL,
  actor_dob DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE actor_movie (
  actor_id    int REFERENCES actor (actor_id) ON UPDATE CASCADE ON DELETE CASCADE,
  movie_id	  int REFERENCES movie (movie_id) ON UPDATE CASCADE,
  CONSTRAINT  actor_movie_pkey PRIMARY KEY (actor_id, movie_id)
);