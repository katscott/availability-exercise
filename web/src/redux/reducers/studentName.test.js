import reducer from './studentName';
import types from '../actionTypes';

describe('studentName reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual('');
    });

    it('should return the payload from update action', () => {
        const name = 'John Doe'
        const action = {
            type: types.UPDATE_STUDENT_NAME,
            payload: { name: name },
        }
        expect(reducer(undefined, action)).toEqual(name);
    });
});
