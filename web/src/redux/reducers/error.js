import types from '../actionTypes';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.BOOKTIME_FAILURE:
            return action.payload;
        default:
            return state;
    }
}
