import { GET_SESSIONS, GETSESSIONS_ERROR } from '../actions/types';

const initialState = {
  session: null,
  sessions: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SESSIONS:
      console.log('e', 'reacehd reducers');
      console.log('pl', payload);

      return {
        ...state,
        sessions: payload,
        loading: false
      };
    case GETSESSIONS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return {
        ...state
      };
  }
}
