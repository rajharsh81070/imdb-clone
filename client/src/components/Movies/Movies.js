import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../actions/movieActions';
import MovieList from './MovieList';
import { Link } from 'react-router-dom';

class Movies extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchMovies();
  }

  render() {

    const { movies } = this.props;
    return (
      <div className='page-header'>
        <div className='btn-toolbar float-right'>
          <div className='btn-group'>
            <Link to="/movie" className="btn btn-primary">
              Add Movie
            </Link>
          </div>
        </div>
        <h2>Movies</h2>
        {
          movies !== undefined ?
            <MovieList movies={movies} />
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.data.movies,
});

export default connect(mapStateToProps, { fetchMovies })(Movies);
