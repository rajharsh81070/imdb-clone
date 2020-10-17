import React, { Component } from 'react'
import { manageMovie, fetchActors, fetchProducers } from "../actions/movieActions";
import MovieForm from './MovieForm';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

class ManageMoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_name: '',
      producer_id: '',
      actors_id: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.fetchActors();
    this.props.fetchProducers();
  }

  componentDidUpdate() {
    // console.log(this.props.message.message);
    if (this.props.message !== undefined && this.props.message.message === "Movie Successfully Created") {
      this.props.history.push('/movies');
      toast.success(this.props.message.message);
    }
  }

  onChange(e) {
    // console.log(e);
    if (e.target.name === 'actors_id') {
      let options = e.target.options;
      let values = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      this.setState({ [e.target.name]: values });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    // console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();

    const movie = {
      movie_name: this.state.movie_name,
      producer_id: this.state.producer_id,
      actors_id: this.state.actors_id
    };

    // console.log(movie);

    this.props.manageMovie(movie);
    // this.props.history.push('/movies');
  }

  render() {
    const { actors, producers } = this.props;

    return (
      <div>
        <h2>Manage Movie</h2>
        <MovieForm
          actors={actors}
          producers={producers}
          data={this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  actors: state.data.actors,
  producers: state.data.producers,
  message: state.data.message
});

export default connect(mapStateToProps, { manageMovie, fetchActors, fetchProducers })(ManageMoviePage);
