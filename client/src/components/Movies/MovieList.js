import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieList(props) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Producer Name</th>
            <th>Actors Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {
            props.movies.length > 0 ?
              props.movies.map(movie => {
                return (
                  <tr key={movie.movie_id}>
                    {/* <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td> */}
                    <td>{movie.movie_name}</td>
                    <td>{movie.producer}</td>
                    <td>
                      {movie.actors.name.join(", ")}
                    </td>
                    {/* <td>
                  <button
                    className="btn btn-outline-danger"
                    disabled
                  // onClick={() => {
                  //   // debugger;
                  //   props.deleteCourse(course.id)
                  // }}
                  >
                    Edit
                  </button>
                </td> */}
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
      </table>
    </div>
  )
}
