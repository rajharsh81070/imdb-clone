import {
  FETCH_MOVIES,
  FETCH_ACTORS,
  FETCH_PRODUCERS,
  NEW_MOVIE,
  NEW_ACTOR,
  NEW_PRODUCER
} from './types';

export const fetchMovies = () => dispatch => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  fetch('http://localhost:5000/allmovies', requestOptions)
    .then(res => res.json())
    .then(movies => {
      // console.log(movies);
      dispatch({
        type: FETCH_MOVIES,
        payload: movies
      })
    });
};

export const fetchActors = () => dispatch => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  fetch('http://localhost:5000/allactors', requestOptions)
    .then(res => res.json())
    .then(actors => {
      // console.log(actors)
      dispatch({
        type: FETCH_ACTORS,
        payload: actors
      })
    });
};

export const fetchProducers = () => dispatch => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  fetch('http://localhost:5000/allproducer', requestOptions)
    .then(res => res.json())
    .then(producers => {
      // console.log(movies);
      dispatch({
        type: FETCH_PRODUCERS,
        payload: producers
      })
    });
};

export const manageMovie = postData => dispatch => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  fetch('http://localhost:5000/addmovie', requestOptions)
    .then(res => res.json())
    .then(message => {
      // console.log(message)
      dispatch({
        type: NEW_MOVIE,
        payload: message
      })
    }
    );
};

export const addActor = postData => dispatch => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  fetch('http://localhost:5000/addactor', requestOptions)
    .then(res => res.json())
    .then(message => {
      // console.log(message)
      dispatch({
        type: NEW_ACTOR,
        payload: message
      })
    }
    );
};

export const addProducer = postData => dispatch => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  fetch('http://localhost:5000/addproducer', requestOptions)
    .then(res => res.json())
    .then(message => {
      // console.log(message)
      dispatch({
        type: NEW_PRODUCER,
        payload: message
      })
    }
    );
};
