import updateStudentName from './studentName';
import types from '../actionTypes';

describe('studentName actions', () => {
    it('should create an action to update student name', () => {
        const name = 'John Doe'
        const expectedAction = {
            type: types.UPDATE_STUDENT_NAME,
            payload: {
                name: name,
            }
        };
        expect(updateStudentName(name)).toEqual(expectedAction);
    });
});