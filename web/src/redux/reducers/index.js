import { combineReducers } from 'redux';

import availability from './availability';
import bookings from './bookings';
import today from './today';
import studentName from './studentName';
import error from './error';

export default combineReducers({ 
    studentName,
    availability, 
    bookings, 
    today,
    error,
});
