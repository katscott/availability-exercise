import types from '../actionTypes';

export const updateStudentName = name => ({
    type: types.UPDATE_STUDENT_NAME,
    payload: {
        name: name,
    }
});

export default updateStudentName;
