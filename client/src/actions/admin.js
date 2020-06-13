import api from '../utils/api';
import { GET_SESSIONS, GETSESSIONS_ERROR } from './types';

export const getSessions = () => async (dispatch) => {
  try {
    const res = await api.get('/admin');
    console.log('insideeactions', res);
    dispatch({
      type: GET_SESSIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GETSESSIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const deleteSession = (_id, user) => async (dispatch) => {
  try {
    await api.delete(`/admin/deletesession/${_id}/${user}`);
  } catch (err) {}
};
