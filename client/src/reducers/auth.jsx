import { AUTHORIZED, UNAUTHORIZED } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHORIZED:
      return { ...state, authenticated: action.payload };
    case UNAUTHORIZED:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
