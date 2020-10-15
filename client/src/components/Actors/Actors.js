import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActors } from '../../actions/movieActions';
import ActorList from './ActorList';

class Actors extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchActors();
  }

  render() {

    const actors = this.props.actors;
    return (
      <div className="page-header">
        <h2>Actors</h2>
        {
          actors !== undefined ?
            <ActorList actors={actors} />
            : null
        }
      </div>
    )
  }
};

const mapStateToProps = state => ({
  actors: state.data.actors,
  // newActor: state.actors.item
});

export default connect
  (mapStateToProps, { fetchActors })(Actors);

