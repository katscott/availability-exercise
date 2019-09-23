import types from '../actionTypes';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.BOOKINGS_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
