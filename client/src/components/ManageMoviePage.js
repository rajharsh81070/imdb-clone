import React, { Component } from 'react'
import { manageMovie } from "../actions/movieActions";
import MovieForm from './MovieForm';
import { connect } from 'react-redux';

class ManageMoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_name: '',
      producer_id: '',
      actor_id: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();

    const movie = {
      movie_name: this.state.movie_name,
      producer_id: this.state.producer_id,
      actor_id: this.state.actor_id
    };

    console.log(movie);

    this.props.manageMovie(movie);
    this.props.history.push('/movies');
  }
  render() {
    return (
      <div>
        <h2>Manage Movie</h2>
        <MovieForm
          data={this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

export default connect(null, { manageMovie })(ManageMoviePage);
