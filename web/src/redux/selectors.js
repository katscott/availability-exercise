const getToday = store => store.today;

const getAvailability = store => store.availability;

const getBookings = store => store.bookings;

const getStudentName = store => store.studentName;

const getError = store => store.error;

export default {
    getToday: getToday,
    getAvailability: getAvailability,
    getBookings: getBookings,
    getStudentName: getStudentName,
    getError: getError,
}