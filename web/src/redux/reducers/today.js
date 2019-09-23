import types from '../actionTypes';

const initialState = '';

export default function (state = initialState, action) {
    switch (action.type) {
        case types.TODAY_FETCH_SUCCESS:
            return action.payload.today;
        default:
            return state;
    }
}
