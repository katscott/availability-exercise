import reducer from './availability';
import types from '../actionTypes';

describe('availability reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({});
    });

    it('should return the payload from success action', () => {
        const action = {
            type: types.AVAILABILITY_FETCH_SUCCESS,
            payload: { foo: 'bar' },
        }
        expect(reducer(undefined, action)).toEqual({ foo: 'bar' });
    });
});
