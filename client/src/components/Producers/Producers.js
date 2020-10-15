import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducers } from '../../actions/movieActions';
import ProducerList from './ProducerList';

class Producers extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchProducers();
  }

  render() {

    const producers = this.props.producers;
    return (
      <div className="page-header">
        <h2>Producers</h2>
        {
          producers !== undefined ?
            <ProducerList producers={producers} />
            : null
        }
      </div>
    )
  }
};

const mapStateToProps = state => ({
  producers: state.data.producers,
  // newActor: state.actors.item
});

export default connect
  (mapStateToProps, { fetchProducers })(Producers);

