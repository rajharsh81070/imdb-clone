import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

export default function MovieList(props) {
  return (
    <div>
      <Table striped bordered hover size="sm" responsive="sm">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Movie Name</th>
            <th>Producer</th>
            <th>Actors</th>
            <th>Y.O.R</th>
            <th>Plot</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {
            props.movies.length > 0 ?
              props.movies.map(movie => {
                return (
                  <tr key={movie.movie_id}>
                    <td>
                      <img width="50" height="50" src={movie.movie_poster || 'https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279'} alt="../default.svg" />
                    </td>
                    <td>{movie.movie_name}</td>
                    <td>{movie.producer}</td>
                    <td>
                      {movie.actors.name.join(", ")}
                    </td>
                    <td>
                      {movie.movie_yor.split('T')[0]}
                    </td>
                    <td>
                      {movie.movie_plot}
                    </td>
                    <td>
                      <Link to={"/movie/" + movie.movie_id}>
                        <button
                          className="btn btn-outline-danger"
                          type="button"
                        >
                          Edit
                      </button>
                      </Link>
                    </td>
                  </tr>
                )
              })
              :
              <h4>No Movies</h4>
          }
        </tbody>
      </Table>
    </div>
  )
}
