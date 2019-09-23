import axios from 'axios';

import config from '../../config';
import actions from '../actions';
import types from '../actionTypes';


export const bookTime = (source, advisorId, time) => async (dispatch, getState) => {
    dispatch(bookTimeStarted());

    const { studentName } = getState();

    if (studentName === undefined || studentName === '') {
        dispatch(bookTimeFailure(source, Date.now(), 'Please provide your name to book time with an advisor.'));
        return;
    }

    let formData = new FormData();
    formData.append('advisor_id', advisorId);
    formData.append('time', time);
    formData.append('student_name', studentName);

    try {
        const res = await axios
            .post(config.apiUrl + "/bookings", formData);
        dispatch(bookTimeSuccess(res.data));
        dispatch(actions.getAvailability());
        dispatch(actions.getBookings());
    }
    catch (err) {
        dispatch(bookTimeFailure(source, Date.now(), err.message));
    }
};

const bookTimeStarted = () => ({
    type: types.BOOKTIME_STARTED
});

const bookTimeSuccess = bookings => ({
    type: types.BOOKTIME_SUCCESS
});

const bookTimeFailure = (source, time, message) => ({
    type: types.BOOKTIME_FAILURE,
    payload: {
        source,
        time,
        message,
    }
});

export default bookTime;
