import { FETCH_MOVIES, NEW_MOVIE, FETCH_ACTORS, FETCH_PRODUCERS } from '../actions/types';

const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case FETCH_ACTORS:
      return {
        ...state,
        actors: action.payload
      };
    case FETCH_PRODUCERS:
      return {
        ...state,
        producers: action.payload
      }
    default:
      return state;
  }
}