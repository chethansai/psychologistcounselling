import {
  GET_ROOMIDSTATUS,
  GET_ROOMIDSTATUS_ERROR,
  GET_PSYCHOLOGISTAVAILABLITY,
  GET_PSYCHOLOGISTAVAILABLITY_ERROR
} from '../actions/types';

const initialState = {
  roomidstatus: '',
  psychologistavailablity: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ROOMIDSTATUS:
      return {
        ...state,
        roomidstatus: payload
      };
    case GET_ROOMIDSTATUS_ERROR:
      return {
        ...state,
        error: payload
      };
    case GET_PSYCHOLOGISTAVAILABLITY:
      console.log('e', 'reacehd reducers');
      console.log('pl', payload);
      return {
        ...state,
        psychologistavailablity: payload
      };
    case GET_PSYCHOLOGISTAVAILABLITY_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return {
        ...state
      };
  }
}
