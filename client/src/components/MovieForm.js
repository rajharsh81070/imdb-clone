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
import Spinner from 'react-bootstrap/Spinner';

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor_name: '',
      actor_gender: '',
      actor_bio: '',
      actor_dob: '',
      producer_name: '',
      producer_gender: '',
      producer_bio: '',
      producer_dob: '',
      actorShow: false,
      producerShow: false,
      showErrorInModal: 'false',
      uniqueKey: "actor_id",
      movie_name: '',
      movie_plot: '',
      movie_yor: '',
      movie_poster: '',
      poster: '',
      producer_id: '',
      actors_id: [],
      selected: [],
      error: {},
      isSaving: false,
      isUploaded: false
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
      this.setState({ movie_plot: nextProps.movie.movie_plot });
      // this.setState({ movie_poster: nextProps.movie.movie_poster });
      this.setState({ movie_yor: nextProps.movie.movie_yor });
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

    const { movie_name, producer_id, selected, movie_plot, movie_poster, movie_yor } = this.state;
    this.setState({ isSaving: true });
    if (movie_name.trim().length > 0 && movie_plot.trim().length > 0 && movie_poster !== '' && movie_yor.trim().length > 0 && producer_id !== '' && selected.length > 0) {
      const movie = {
        movie_name,
        producer_id,
        actors_id: selected,
        movie_plot,
        movie_poster,
        movie_yor
      };
      const updateError = {};
      this.setState({ error: updateError });
      if (this.props.match.params.id !== undefined) {
        this.props.updateMovie(this.props.match.params.id, movie);
      } else {
        this.props.manageMovie(movie);
      }
      console.log(this.state);
    } else {
      const updateError = {
        movie_name: 'error',
        producer_id: 'error',
        actors_id: 'error',
        movie_plot: 'error',
        movie_poster: 'error',
        movie_yor: 'error'
      };
      this.setState({ isSaving: false });
      this.setState({ error: updateError });
    }
    // // console.log(movie);

    // this.props.manageMovie(movie);
    // this.props.history.push('/movies');
  }

  async uploadFile(upload) {
    // console.log(upload);
    this.setState({ isSaving: true });
    if (upload !== '') {
      const data = new FormData();
      data.append("file", upload);
      data.append("upload_preset", "news-time");
      data.append("cloud_name", 'dt54gdtmn');
      await fetch("https://api.cloudinary.com/v1_1/dt54gdtmn/image/upload", {
        method: 'post',
        body: data
      })
        .then(res => res.json())
        .then(data => {
          const url = data.url;
          this.setState({ movie_poster: url });
          this.setState({ isSaving: false, isUploaded: true });
        })
        .catch(err => {
          console.log(err);
        })
    }
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
    // console.log(this.state);
  }

  onActorSubmit = (e) => {
    e.preventDefault();
    const { actor_name, actor_gender, actor_dob, actor_bio } = this.state;
    // console.log(actor_name.trim(), actor_gender.length, actor_bio.length, actor_dob.length);
    if (actor_name.trim() !== '' && actor_gender.trim() !== '' && actor_bio.trim() !== '' && actor_dob.trim() !== '') {
      // console.log(actor_name.length, actor_gender.length, actor_bio.length, actor_dob.length);
      const actor = {
        actor_name,
        actor_gender,
        actor_bio,
        actor_dob
      };

      // console.log(e);
      this.props.addActor(actor);
      this.setState({
        actorShow: false,
        actor_bio: '',
        actor_dob: '',
        actor_gender: '',
        actor_name: ''
      });
      // toast.success(this.props.message.message);
    } else {
      this.setState({ showErrorInModal: 'true' });
      // console.log(this.state);
    }
  }

  onProducerSubmit = (e) => {
    e.preventDefault();
    const { producer_name, producer_gender, producer_dob, producer_bio } = this.state;
    // console.log(producer_name.trim(), producer_gender.length, producer_bio.length, producer_dob.length);
    if (producer_name.trim() !== '' && producer_gender.trim() !== '' && producer_bio.trim() !== '' && producer_dob.trim() !== '') {
      // console.log(producer_name.length, producer_gender.length, producer_bio.length, producer_dob.length);
      const producer = {
        producer_name,
        producer_gender,
        producer_bio,
        producer_dob
      };

      // console.log(e);
      this.props.addProducer(producer);
      this.setState({
        producerShow: false,
        producer_bio: '',
        producer_dob: '',
        producer_gender: '',
        producer_name: ''
      });
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
        {/* {console.log(this.state)} */}
        <h2>Manage Movie</h2>
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
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
                (this.state.error.movie_name !== undefined && this.state.movie_name === '') ?
                  <p style={{ color: 'red' }}>Item is required!</p>
                  : null
              }
            </div>
          </div>
          < div >
            <br />
            <label htmlFor="movie_plot">Plot</label>
            <div className="field">
              <input
                type="text"
                name="movie_plot"
                className="form-control"
                onChange={this.onChange}
                value={this.state.movie_plot}
                placeholder="Movie Plot..."
              // required
              />
              {
                (this.state.error.movie_plot !== undefined && this.state.movie_plot === '') ?
                  <p style={{ color: 'red' }}>Item is required!</p>
                  : null
              }
            </div>
          </div>
          < div >
            <br />
            <label htmlFor="movie_yor">Year of Release</label>
            <div className="field">
              <input
                type="date"
                name="movie_yor"
                className="form-control"
                onChange={this.onChange}
                value={this.state.movie_yor.split('T')[0]}
              // required
              />
              {
                (this.state.error.movie_yor !== undefined && this.state.movie_yor === '') ?
                  <p style={{ color: 'red' }}>Item is required!</p>
                  : null
              }
            </div>
          </div>
          <br />
          {/* <div className='page-header'>
            <div className='btn-toolbar float-right'>
              <div className='btn-group'>
                <button className="btn btn-outline-primary" type="button" onClick={this.uploadFile}>
                  Upload file
                </button>
              </div>
            </div>
            <label htmlFor="movie_poster">Poster</label>
            <div className="field">
              <input type="file"
                name="poster"
                placeholder="Insert a picture"
                accept="image/*"
                // value={this.state.poster}
                onChange={(event) => {
                  event.preventDefault();
                  const { target } = event;
                  // console.log(event.target.files[0]);
                  // const updatedData = { ...formData, [target.name]: target.files[0] };
                  this.setState({ [target.name]: target.files[0] });
                }}
              />
              {
                (this.state.error.movie_poster !== undefined && this.state.movie_poster === '') ?
                  <p style={{ color: 'red' }}>Item is required!</p>
                  : null
              }
            </div>
          </div> */}
          <label htmlFor="movie_poster">Poster</label>
          <div className="field">
            <input
              type="file"
              name="poster"
              placeholder="Insert a picture"
              accept="image/*"
              // value={this.state.poster}
              onChange={(event) => {
                event.preventDefault();
                // const { target } = event;
                this.setState({ [event.target.name]: event.target.files[0] }, function () {
                  this.uploadFile(this.state.poster);
                }.bind(this));
                // console.log(this.state.poster);
              }}
            />
            {/* <button type="button" className="btn btn-outline-primary" onClick={this.uploadFile} style={{ "float": "right" }} >Upload File</button> */}
            {
              (this.state.error.movie_poster !== undefined && this.state.movie_poster === '') ?
                <p style={{ color: 'red' }}>Item is required!</p>
                : null
            }
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
                    name1="actor_name"
                    name2="actor_gender"
                    name3="actor_bio"
                    name4="actor_dob"
                    onChange={this.handleOnChange}
                    onSubmit={this.onActorSubmit}
                    value1={this.state.actor_name}
                    value2={this.state.actor_gender}
                    value3={this.state.actor_bio}
                    value4={this.state.actor_dob}
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
                (this.state.error.actors_id !== undefined && this.state.selected.length === 0) ?
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
                    name1="producer_name"
                    name2="producer_gender"
                    name3="producer_bio"
                    name4="producer_dob"
                    onChange={this.handleOnChange}
                    onSubmit={this.onProducerSubmit}
                    value1={this.state.producer_name}
                    value2={this.state.producer_gender}
                    value3={this.state.producer_bio}
                    value4={this.state.producer_dob}
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
                (this.state.error.producer_id !== undefined && this.state.producer_id === '') ?
                  <p style={{ color: 'red' }}>Item is required!</p>
                  : null
              }
            </div>
          </div>
          {
            this.state.isSaving === true &&
            <button variant="primary" type="button" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Saving...</span>
            </button>
          }
          {
            (this.state.isSaving === false && this.state.isUploaded === false) &&
            <div>
              <input disabled type="submit" value="Save" className="btn btn-primary" />
              <p style={{ 'color': 'red' }}>Upload First!</p>
            </div>
          }
          {
            (this.state.isSaving === false && this.state.isUploaded === true) &&
            <div>
              <input type="submit" value="Save" className="btn btn-primary" />
            </div>
          }
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