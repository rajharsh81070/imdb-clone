import React, { Component } from 'react';
import {
  fetchActors,
  fetchProducers,
  addActor,
  addProducer,
  manageMovie,
  fetchMovie,
  updateMovie
} from "../actions/movieActions";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ModalForm from './ModalForm';
import Dropdownlist from './Dropdownlist';

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor_name: '',
      actorShow: false,
      producerShow: false,
      showErrorInModal: 'false',
      producer_name: '',
      uniqueKey: "actor_id",
      movie_name: '',
      producer_id: '',
      actors_id: [],
      selected: [],
      error: {}
    }
    this.handleActorHide = this.handleActorHide.bind(this);
    this.handleActorShow = this.handleActorShow.bind(this);
    this.handleProducerHide = this.handleProducerHide.bind(this);
    this.handleProducerShow = this.handleProducerShow.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onActorSubmit = this.onActorSubmit.bind(this);
    this.onProducerSubmit = this.onProducerSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.fetchActors();
    this.props.fetchProducers();
    if (this.props.match.params.id !== undefined) {
      this.props.fetchMovie(this.props.match.params.id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.movie) {
      this.setState({ movie_name: nextProps.movie.movie_name });
      this.setState({ selected: nextProps.movie.actors.id });
      this.setState({ producer_id: nextProps.movie.producer });
    }
  }

  componentDidUpdate() {
    if (this.props.message !== undefined && (this.props.message.message === "Actor Successfully Created" || this.props.message.message === "Producer Successfully Created")) {
      this.props.fetchActors();
      this.props.fetchProducers();
      toast.success(this.props.message.message);
    } else if (this.props.message !== undefined && (this.props.message.message === "Movie Successfully Created" || this.props.message.message === "Successfully Updated")) {
      this.props.history.push('/movies');
      toast.success(this.props.message.message);
    }
  }

  onChange(e) {
    // // console.log(e);
    // if (e.target.name === 'actors_id') {
    //   console.log(e.target.selected);
    //   // let options = e.target.options;
    //   // let values = [];
    //   // for (let i = 0, l = options.length; i < l; i++) {
    //   //   if (options[i].selected) {
    //   //     values.push(options[i].value);
    //   //   }
    //   // }
    //   // this.setState({ [e.target.name]: values });
    // } else {
    this.setState({ [e.target.name]: e.target.value });
    // }
    // console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();

    const { movie_name, producer_id, selected } = this.state;
    console.log(movie_name.length, producer_id.length, selected.length);
    // console.log(this.state.selected);
    // console.log(this.props.actors);
    if (movie_name.length > 0 && producer_id !== '' && selected.length > 0) {
      const movie = {
        movie_name: this.state.movie_name,
        producer_id: this.state.producer_id,
        actors_id: this.state.selected
      };
      const updateError = {};
      this.setState({ error: updateError });
      if (this.props.match.params.id !== undefined) {
        this.props.updateMovie(this.props.match.params.id, movie);
      } else {
        this.props.manageMovie(movie);
      }
    } else {
      const updateError = {
        movie_name: 'error',
        producer_id: 'error',
        actors_id: 'error'
      };
      this.setState({ error: updateError });
    }
    // // console.log(movie);

    // this.props.manageMovie(movie);
    // this.props.history.push('/movies');
  }
  handleActorHide = () => {
    this.setState({ actorShow: false });
  }

  handleActorShow = () => {
    this.setState({ actorShow: true });
  }

  handleProducerHide = () => {
    this.setState({ producerShow: false });
  }

  handleProducerShow = () => {
    this.setState({ producerShow: true });
  }

  handleOnChange = (e) => {
    this.setState({ showErrorInModal: 'false' });
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onActorSubmit = (e) => {
    e.preventDefault();
    if (this.state.actor_name.length > 0) {
      const actor = {
        actor_name: this.state.actor_name
      };
      // console.log(e);
      this.props.addActor(actor);
      this.setState({ actorShow: false })
      this.setState({ actor_name: '' })
      // toast.success(this.props.message.message);
    } else {
      this.setState({ showErrorInModal: 'true' });
      // console.log(this.state);
    }
  }

  onProducerSubmit = (e) => {
    e.preventDefault();
    if (this.state.producer_name.length > 0) {
      const producer = {
        producer_name: this.state.producer_name
      };
      // console.log(e);
      this.props.addProducer(producer);
      this.setState({ producerShow: false })
      this.setState({ producer_name: '' })
      // toast.success(this.props.message.message);
    } else {
      this.setState({ showErrorInModal: 'true' });
      // console.log(this.state);
    }
  }

  toggleChangeListItem = uniqueKey => {
    if (uniqueKey === "ALL") {
      if (this.state.selected.length === this.props.actors.length) {
        this.setState({
          selected: []
        });
      } else {
        const allUniqueKeys = this.props.actors.map(
          item => item[this.state.uniqueKey]
        );
        this.setState({
          selected: allUniqueKeys
        });
      }
    } else {
      let updatedSelected = [...this.state.selected];
      if (updatedSelected.indexOf(uniqueKey) > -1) {
        updatedSelected.splice(updatedSelected.indexOf(uniqueKey), 1);
      } else {
        updatedSelected.push(uniqueKey);
      }
      this.setState({
        selected: updatedSelected
      });
    }
  };

  render() {
    return (
      <div>
        {/* {console.log(this.props.movie)} */}
        {console.log(this.state)}
        <h2>Manage Movie</h2>
        <form onSubmit={this.onSubmit} >
          {/* {console.log(this.props.actors, this.props.producers)} */}
          < div >
            <br />
            <label htmlFor="movie_name">Movie Name</label>
            <div className="field">
              <input
                type="text"
                name="movie_name"
                className="form-control"
                onChange={this.onChange}
                value={this.state.movie_name}
                placeholder="Movie Name..."
              // required
              />
              {
                this.state.error.movie_name !== undefined ?
                  <p style={{ color: 'red' }}>Item is required!</p>
                  : null
              }
            </div>
          </div>
          <br />
          <div className='page-header'>
            <div className='btn-toolbar float-right'>
              <div className='btn-group'>
                <button className="btn btn-outline-primary" type="button" onClick={this.handleActorShow}>
                  Add Actor
            </button>
                {
                  this.state.actorShow &&
                  <ModalForm
                    show={this.state.actorShow}
                    showerror={this.state.showErrorInModal}
                    onHide={this.handleActorHide}
                    label="Add"
                    place="Name..."
                    name="actor_name"
                    onChange={this.handleOnChange}
                    onSubmit={this.onActorSubmit}
                    value={this.state.actor_name}
                  />
                }
              </div>
            </div>
            <label htmlFor="actors">Actors</label>
          </div>
          <br />
          <div className="form-group">
            <div className="field">
              {/* <select multiple={true} name="actors_id" className="form-control" required onChange={this.props.onChange}>
              {
                this.props.actors !== undefined ?
                  this.props.actors.map((actor, index) =>
                    <option key={index} value={actor.actor_id}>
                      {actor.actor_name}
                    </option>
                  )
                  : null
              }
            </select> */}
              <Dropdownlist
                shouldHaveSelectAll={true}
                uniqueKey={this.state.uniqueKey}
                data={this.props.actors}
                selected={this.state.selected}
                toggleChangeListItem={this.toggleChangeListItem}
              />
              {
                this.state.error.actors_id !== undefined ?
                  <p style={{ color: 'red' }}>Item is required!</p>
                  : null
              }
            </div>
          </div>
          <br />
          <div className='page-header'>
            <div className='btn-toolbar float-right'>
              <div className='btn-group'>
                <button className="btn btn-outline-primary" type="button" onClick={this.handleProducerShow}>
                  Add Producer
            </button>
                {
                  this.state.producerShow &&
                  <ModalForm
                    show={this.state.producerShow}
                    showerror={this.state.showErrorInModal}
                    onHide={this.handleProducerHide}
                    label="Add"
                    place="Name..."
                    name="producer_name"
                    onChange={this.handleOnChange}
                    onSubmit={this.onProducerSubmit}
                    value={this.state.producer_name}
                  />
                }
              </div>
            </div>
            <label htmlFor="producers">Producers</label>
          </div>
          <br />
          <div className="form-group">
            <div className="field">
              <select name="producer_id" className="form-control" onChange={this.onChange}>
                <option value="">Select a producer</option>
                {
                  this.props.producers !== undefined ?
                    this.props.producers.map((producer, index) =>
                      <option key={index} selected={this.state.producer_id === producer.producer_id ? true : false} value={producer.producer_id}>
                        {producer.producer_name}
                      </option>
                    )
                    : null
                }
              </select>
              {
                this.state.error.producer_id !== undefined ?
                  <p style={{ color: 'red' }}>Item is required!</p>
                  : null
              }
            </div>
          </div>
          <input type="submit" value="Save" className="btn btn-primary" />
        </form >
      </div>
    )
  }
}

const mapStateToProps = state => ({
  actors: state.data.actors,
  producers: state.data.producers,
  message: state.data.message,
  movie: state.data.movie
});

export default connect(
  mapStateToProps, {
  addActor,
  addProducer,
  fetchActors,
  fetchProducers,
  manageMovie,
  fetchMovie,
  updateMovie
})
  (MovieForm);