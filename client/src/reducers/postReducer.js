import {
  FETCH_MOVIES,
  FETCH_ACTORS,
  FETCH_PRODUCERS,
  NEW_MOVIE,
  NEW_ACTOR,
  NEW_PRODUCER,
  FETCH_MOVIE,
  UPDATE_MOVIE
} from '../actions/types';

const initialState = {
  movies: [],
  actors: [],
  producers: [],
  message: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        // ...state,
        movies: action.payload
      };
    case FETCH_ACTORS:
      const updateStateActors = {
        ...state
      };
      updateStateActors.message = '';
      return {
        ...updateStateActors,
        actors: action.payload
      };
    case FETCH_PRODUCERS:
      const updateStateProducers = {
        ...state
      };
      updateStateProducers.message = '';
      return {
        ...updateStateProducers,
        producers: action.payload
      }
    case NEW_MOVIE:
      return {
        // ...state,
        message: action.payload
      }
    case NEW_ACTOR:
      return {
        // ...state,
        message: action.payload
      }
    case NEW_PRODUCER:
      return {
        // ...state,
        message: action.payload
      }
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload
      }
    case UPDATE_MOVIE:
      return {
        // ...state,
        message: action.payload
      }
    default:
      return state;
  }
}