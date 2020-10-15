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
      select m.movie_id as movie_id, m.movie_name, max(p.producer_name) as producer, json_build_object('name', json_agg(a.actor_name), 'id', json_agg(a.actor_id)) 
      as actors from movie m
      join actor_movie ma on (m.movie_id = ma.movie_id) 
      join actor a on (ma.actor_id = a.actor_id) 
      join producer p on (m.producer_id = p.producer_id) 
      GROUP BY m.movie_id;
      `
    );
    // console.log(allMovie.rows[0].producer_id);
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

// get all actors

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
    const { movie_name, producer_id, actor_id } = req.body;
    const newMovie = await pool.query(
      "INSERT INTO movie (movie_name, producer_id) VALUES($1, $2) RETURNING *",
      [movie_name, producer_id]
    );
    const newRelation = await pool.query(
      "INSERT INTO actor_movie (actor_id, movie_id) VALUES($1, $2)",
      [actor_id, newMovie.rows[0].movie_id]
    )
    res.json(newMovie.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a actor

app.post("/addactor", async (req, res) => {
  try {
    const { actor_name } = req.body;
    const newActor = await pool.query(
      "INSERT INTO actor (actor_name) VALUES($1) RETURNING *",
      [actor_name]
    );

    res.json(newActor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a actor

app.post("/addproducer", async (req, res) => {
  try {
    const { producer_name } = req.body;
    const newProducer = await pool.query(
      "INSERT INTO producer (producer_name) VALUES($1) RETURNING *",
      [producer_name]
    );

    res.json(newProducer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id
//     ]);

//     res.json(todo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//update a movie

// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateMovie = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2",
//       [description, id]
//     );

//     res.json("Todo was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//delete a todo

// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//       id
//     ]);
//     res.json("Todo was deleted!");
//   } catch (err) {
//     console.log(err.message);
//   }
// });

app.listen(5000, () => {
  console.log("server has started on port 5000");
});