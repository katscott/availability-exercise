import reducer from './error';
import types from '../actionTypes';

describe('error reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({});
    });

    it('should return the payload from success action', () => {
        const action = {
            type: types.BOOKTIME_FAILURE,
            payload: { foo: 'bar' },
        }
        expect(reducer(undefined, action)).toEqual({ foo: 'bar' });
    });
});
