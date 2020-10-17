import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { fetchActors, fetchProducers, addActor, addProducer } from "../actions/movieActions";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

function ModalForm(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          name={props.name}
          className="form-control"
          onChange={props.onChange}
          value={props.value}
          placeholder={props.place}
        />
        {/* {console.log(props.showerror)} */}
        {
          props.showerror === 'true' ?
            <p style={{ color: 'red' }}>Item is required!</p>
            : null
        }
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-danger" onClick={props.onHide}>Close</button>
        <button type="submit" onClick={props.onSubmit} className="btn btn-outline-primary" >Save</button>
      </Modal.Footer>
    </Modal>
  );
}

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor_name: '',
      show: false,
      showerror: 'false',
      producer_name: ''
    }
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onActorSubmit = this.onActorSubmit.bind(this);
    this.onProducerSubmit = this.onProducerSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.fetchActors();
    this.props.fetchProducers();
  }

  componentDidUpdate() {
    if (this.props.message !== undefined && (this.props.message.message === "Actor Successfully Created" || this.props.message.message === "Producer Successfully Created")) {
      this.props.fetchActors();
      this.props.fetchProducers();
      toast.success(this.props.message.message);
    }
  }

  handleHide = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleOnChange = (e) => {
    this.setState({ showerror: 'false' });
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }

  onActorSubmit = (e) => {
    e.preventDefault();
    if (this.state.actor_name.length > 0) {
      const actor = {
        actor_name: this.state.actor_name
      };
      // console.log(e);
      this.props.addActor(actor);
      this.setState({ show: false })
      this.setState({ actor_name: '' })
      // toast.success(this.props.message.message);
    } else {
      this.setState({ showerror: 'true' });
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
      this.setState({ show: false })
      this.setState({ producer_name: '' })
      // toast.success(this.props.message.message);
    } else {
      this.setState({ showerror: 'true' });
      // console.log(this.state);
    }
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit} >
        {/* {console.log(this.props.actors, this.props.producers)} */}
        < div >
          <br />
          <label htmlFor="movie_name">Movie Name</label>
          <div className="field">
            <input
              type="text"
              name="movie_name"
              className="form-control"
              onChange={this.props.onChange}
              value={this.props.data.movie_name}
              placeholder="Movie Name..."
              required
            />
          </div>
        </div>
        <br />
        <div className='page-header'>
          <div className='btn-toolbar float-right'>
            <div className='btn-group'>
              <button className="btn btn-outline-primary" type="button" onClick={this.handleShow}>
                Add Actor
            </button>
              <ModalForm
                show={this.state.show}
                showerror={this.state.showerror}
                onHide={this.handleHide}
                label="Add"
                place="Name..."
                name="actor_name"
                onChange={this.handleOnChange}
                onSubmit={this.onActorSubmit}
                value={this.state.actor_name}
              />
            </div>
          </div>
          <label htmlFor="actors">Actors</label>
        </div>
        <br />
        <div className="form-group">
          <div className="field">
            <select multiple={true} name="actors_id" className="form-control" required onChange={this.props.onChange}>
              {
                this.props.actors !== undefined ?
                  this.props.actors.map((actor, index) =>
                    <option key={index} value={actor.actor_id}>
                      {actor.actor_name}
                    </option>
                  )
                  : null
              }
            </select>
          </div>
        </div>
        <br />
        <div className='page-header'>
          <div className='btn-toolbar float-right'>
            <div className='btn-group'>
              <button className="btn btn-outline-primary" type="button" onClick={this.handleShow}>
                Add Producer
            </button>
              <ModalForm
                show={this.state.show}
                showerror={this.state.showerror}
                onHide={this.handleHide}
                label="Add"
                place="Name..."
                name="producer_name"
                onChange={this.handleOnChange}
                onSubmit={this.onProducerSubmit}
                value={this.state.producer_name}
              />
            </div>
          </div>
          <label htmlFor="producers">Producers</label>
        </div>
        <br />
        <div className="form-group">
          <div className="field">
            <select name="producer_id" className="form-control" required onChange={this.props.onChange}>
              <option value="">Select a producer</option>
              {
                this.props.producers !== undefined ?
                  this.props.producers.map((producer, index) =>
                    <option key={index} value={producer.producer_id}>
                      {producer.producer_name}
                    </option>
                  )
                  : null
              }
            </select>
          </div>
        </div>

        <input type="submit" value="Save" className="btn btn-primary" />
      </form >
    )
  }
}

const mapStateToProps = state => ({
  actors: state.data.actors,
  producers: state.data.producers,
  message: state.data.message
});

export default connect(
  mapStateToProps, {
  addActor,
  addProducer,
  fetchActors,
  fetchProducers,
})
  (MovieForm);