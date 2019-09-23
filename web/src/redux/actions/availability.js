import axios from 'axios';

import config from '../../config';

import types from '../actionTypes';

export const getAvailability = () => async (dispatch) => {
    dispatch(availabilityFetchStarted());

    try {
        const res = await axios
            .get(config.apiUrl + "/availability");
        return dispatch(availabilityFetchSuccess(res.data));
    }
    catch (err) {
        return dispatch(availabilityFetchFailure(err.message));
    }
};


const availabilityFetchStarted = () => ({
    type: types.AVAILABILITY_FETCH_STARTED
});

const availabilityFetchSuccess = availability => ({
    type: types.AVAILABILITY_FETCH_SUCCESS,
    payload: {
        ...availability
    }
});

const availabilityFetchFailure = error => ({
    type: types.AVAILABILITY_FETCH_FAILURE,
    payload: {
        error
    }
});

export default getAvailability;
