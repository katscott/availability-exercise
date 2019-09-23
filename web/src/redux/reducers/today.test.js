import reducer from './today';
import types from '../actionTypes';

describe('today reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual('');
    });

    it('should return the payload from success action', () => {
        const today = '01-01-2000';
        const action = {
            type: types.TODAY_FETCH_SUCCESS,
            payload: { today: today },
        }
        expect(reducer(undefined, action)).toEqual(today);
    });
});
