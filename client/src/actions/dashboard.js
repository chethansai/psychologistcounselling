import api from '../utils/api';
import {
  GET_ROOMIDSTATUS,
  GET_ROOMIDSTATUS_ERROR,
  GET_PSYCHOLOGISTAVAILABLITY,
  GET_PSYCHOLOGISTAVAILABLITY_ERROR
} from './types';

export const getRoomidstatus = () => async (dispatch) => {
  try {
    const res = await api.get('/dashboard');
    console.log('sd', res);
    if (res.data == 'null') {
      var t = true;
    } else {
      var t = false;
    }

    dispatch({
      type: GET_ROOMIDSTATUS,
      payload: t
    });
  } catch (err) {
    dispatch({
      type: GET_ROOMIDSTATUS_ERROR,
      payload: 'h'
    });
  }
};

export const getPsychologistavailablity = () => async (dispatch) => {
  try {
    const res = await api.get('dashboard/availablity');
    console.log('sde', res.data);

    dispatch({
      type: GET_PSYCHOLOGISTAVAILABLITY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PSYCHOLOGISTAVAILABLITY,
      payload: 'h'
    });
  }
};
