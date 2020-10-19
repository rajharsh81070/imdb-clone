const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//get all Movies

app.get("/allmovies", async (req, res) => {
  try {
    const allMovie = await pool.query(
      `
      select m.movie_id as movie_id, m.movie_name, m.movie_plot as movie_plot, m.movie_poster as movie_poster, m.movie_yor as movie_yor, max(p.producer_name) as producer, json_build_object('name', json_agg(a.actor_name), 'id', json_agg(a.actor_id)) 
      as actors from movie m
      join actor_movie ma on (m.movie_id = ma.movie_id) 
      join actor a on (ma.actor_id = a.actor_id) 
      join producer p on (m.producer_id = p.producer_id) 
      GROUP BY m.movie_id;
      `
    );
    // console.log(allMovie.rows);
    res.json(allMovie.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all actors

app.get("/allactors", async (req, res) => {
  try {
    const allActor = await pool.query("SELECT * FROM actor");
    res.json(allActor.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all producers

app.get("/allproducer", async (req, res) => {
  try {
    const allProducer = await pool.query("SELECT * FROM producer");
    res.json(allProducer.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//create a movie

app.post("/addmovie", async (req, res) => {
  try {
    const { movie_name, producer_id, actors_id, movie_plot, movie_poster, movie_yor } = req.body;
    const newMovie = await pool.query(
      "INSERT INTO movie (movie_name, movie_plot, movie_poster, movie_yor, producer_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [movie_name, movie_plot, movie_poster, movie_yor, producer_id]
    );
    await actors_id.forEach(actor_id => {
      // console.log(actor_id);
      const newRelation = pool.query(
        "INSERT INTO actor_movie (actor_id, movie_id) VALUES($1, $2)",
        [actor_id, newMovie.rows[0].movie_id]
      )
    });
    // const newRelation = await pool.query(
    //   "INSERT INTO actor_movie (actor_id, movie_id) VALUES($1, $2)",
    //   [actor_id, newMovie.rows[0].movie_id]
    // )
    // const allMovies = await pool.query(
    //   `
    //   select m.movie_id as movie_id, m.movie_name, max(p.producer_name) as producer, json_build_object('name', json_agg(a.actor_name), 'id', json_agg(a.actor_id)) 
    //   as actors from movie m
    //   join actor_movie ma on (m.movie_id = ma.movie_id) 
    //   join actor a on (ma.actor_id = a.actor_id) 
    //   join producer p on (m.producer_id = p.producer_id) 
    //   GROUP BY m.movie_id;
    //   `
    // );
    res.json({
      "message": "Movie Successfully Created"
    });
  } catch (err) {
    console.error(err.message);
  }
});

//create a actor

app.post("/addactor", async (req, res) => {
  try {
    const { actor_name, actor_gender, actor_bio, actor_dob } = req.body;
    const newActor = await pool.query(
      "INSERT INTO actor (actor_name, actor_gender, actor_bio, actor_dob) VALUES($1, $2, $3, $4)",
      [actor_name, actor_gender, actor_bio, actor_dob]
    );

    res.json({
      "message": "Actor Successfully Created"
    });
  } catch (err) {
    console.error(err.message);
  }
});

//create a actor

app.post("/addproducer", async (req, res) => {
  try {
    const { producer_name, producer_gender, producer_bio, producer_dob } = req.body;
    const newProducer = await pool.query(
      "INSERT INTO producer (producer_name, producer_gender, producer_bio, producer_dob) VALUES($1, $2, $3, $4)",
      [producer_name, producer_gender, producer_bio, producer_dob]
    );

    res.json({
      "message": "Producer Successfully Created"
    });
  } catch (err) {
    console.error(err.message);
  }
});

//get a movie

// select m.movie_id as movie_id, m.movie_name, max(p.producer_name) as producer, json_build_object('name', json_agg(a.actor_name), 'id', json_agg(a.actor_id)) as actors from movie m join actor_movie ma on (m.movie_id = ma.movie_id) join actor a on (ma.actor_id = a.actor_id) join producer p on (m.producer_id =p.producer_id) WHERE m.movie_id = 7 GROUP BY m.movie_id;

app.get("/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await pool.query(`
    select m.movie_id as movie_id, m.movie_name as movie_name, m.movie_plot as movie_plot, m.movie_poster as movie_poster, m.movie_yor as movie_yor, max(p.producer_id) as producer, json_build_object('name', json_agg(a.actor_name), 'id', json_agg(a.actor_id)) 
    as actors from movie m 
    join actor_movie ma on (m.movie_id = ma.movie_id) 
    join actor a on (ma.actor_id = a.actor_id) 
    join producer p on (m.producer_id =p.producer_id) 
    WHERE m.movie_id = $1 GROUP BY m.movie_id`, [id]
    );

    res.json(movie.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a movie

app.put("/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { movie_name, producer_id, actors_id, movie_plot, movie_poster, movie_yor } = req.body;
    const tmp_actors_id = await pool.query(
      "SELECT actor_id FROM actor_movie WHERE movie_id = $1",
      [id]
    );
    const old_actors_id = [];
    tmp_actors_id.rows.forEach((id) => old_actors_id.push(id.actor_id));
    const new_actors_id = actors_id;
    const delete_ids_from_actor_movie = old_actors_id.filter((id) => !new_actors_id.includes(id));
    const add_ids_to_actor_movie = new_actors_id.filter((id) => !old_actors_id.includes(id));
    // console.log(delete_ids_from_actor_movie);
    // console.log(add_ids_to_actor_movie);
    await delete_ids_from_actor_movie.forEach(actor_id => {
      const newRelation = pool.query(
        "DELETE FROM actor_movie WHERE actor_id = $1 AND movie_id = $2",
        [actor_id, id]
      )
    });
    await add_ids_to_actor_movie.forEach(actor_id => {
      // console.log(actor_id);
      const newRelation = pool.query(
        "INSERT INTO actor_movie (actor_id, movie_id) VALUES($1, $2)",
        [actor_id, id]
      )
    });
    const updateMovie = await pool.query(
      // UPDATE movie SET movie_name = 'Taken 3', producer_id = 1 WHERE movie_id = 7;
      "UPDATE movie SET movie_name = $1, producer_id = $2, movie_plot = $4, movie_poster = $5, movie_yor = $6 WHERE movie_id = $3",
      [movie_name, producer_id, id, movie_plot, movie_poster, movie_yor]
    );

    res.json({
      "message": "Successfully Updated"
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});