import { toastr } from 'react-redux-toastr';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';

export const fetchEvents = events => ({
  type: FETCH_EVENTS,
  payload: events,
});

export const createEvent = event => async dispatch => {
  try {
    dispatch({
      type: CREATE_EVENT,
      payload: {
        event,
      },
    });
    toastr.success('Success!!', 'Event Created');
  } catch (error) {
    toastr.error('Failed!!', 'Event Not Created');
  }
};

export const updateEvent = event => async dispatch => {
  try {
    dispatch({
      type: UPDATE_EVENT,
      payload: {
        event,
      },
    });
    toastr.success('Success!!', 'Event Updated');
  } catch (error) {
    toastr.error('Failed!!', 'Event Not Updated');
  }
};
export const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  payload: {
    eventId,
  },
});

export const loadEvents = () => async dispatch => {
  try {
    dispatch(asyncActionStart());
    const events = await fetchSampleData();
    dispatch(fetchEvents(events));
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log('Event Fetch Error', error);
    dispatch(asyncActionError());
  }
};
