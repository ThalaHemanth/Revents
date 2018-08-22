import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';

export const loginUser = creds => dispatch => {
  dispatch({ type: LOGIN_USER, payload: { creds } });
  dispatch(closeModal());
};

export const signoutUser = () => ({
  type: SIGN_OUT_USER,
});
