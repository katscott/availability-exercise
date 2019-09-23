import axios from 'axios';

import config from '../../config';

import types from '../actionTypes';


export const getToday = () => async (dispatch) => {
    dispatch(todayFetchStarted());

    try {
        const res = await axios
            .get(config.apiUrl + "/today");
        dispatch(todayFetchSuccess(res.data));
    }
    catch (err) {
        dispatch(todayFetchFailure(err.message));
    }
};

const todayFetchStarted = () => ({
    type: types.TODAY_FETCH_STARTED
});

const todayFetchSuccess = today => ({
    type: types.TODAY_FETCH_SUCCESS,
    payload: {
        ...today
    }
});

const todayFetchFailure = error => ({
    type: types.TODAY_FETCH_FAILURE,
    payload: {
        error
    }
});

export default getToday;