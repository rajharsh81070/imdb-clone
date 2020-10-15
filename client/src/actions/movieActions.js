import {
  FETCH_MOVIES,
  NEW_MOVIE,
  FETCH_ACTORS,
  FETCH_PRODUCERS
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

export const createPost = postData => dispatch => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_MOVIE,
        payload: post
      })
    );
};
