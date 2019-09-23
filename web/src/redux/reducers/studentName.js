import types from '../actionTypes';

const initialState = '';

export default function (state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_STUDENT_NAME:
            return action.payload.name;
        default:
            return state;
    }
}