import reducer from './bookings';
import types from '../actionTypes';

describe('bookings reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({});
    });

    it('should return the payload from success action', () => {
        const action = {
            type: types.BOOKINGS_FETCH_SUCCESS,
            payload: { foo: 'bar' },
        }
        expect(reducer(undefined, action)).toEqual({ foo: 'bar' });
    });
});
