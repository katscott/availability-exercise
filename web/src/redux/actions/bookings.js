import axios from 'axios';

import config from '../../config';

import types from '../actionTypes';

export const getBookings = () => async (dispatch) => {
    dispatch(bookingsFetchStarted());

    try {
        const res = await axios
            .get(config.apiUrl + "/bookings");
        dispatch(bookingsFetchSuccess(res.data));
    }
    catch (err) {
        dispatch(bookingsFetchFailure(err.message));
    }
};

const bookingsFetchStarted = () => ({
    type: types.BOOKINGS_FETCH_STARTED
});

const bookingsFetchSuccess = bookings => ({
    type: types.BOOKINGS_FETCH_SUCCESS,
    payload: {
        ...bookings
    }
});

const bookingsFetchFailure = error => ({
    type: types.BOOKINGS_FETCH_FAILURE,
    payload: {
        error
    }
});

export default getBookings;
