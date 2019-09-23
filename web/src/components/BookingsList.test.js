import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BookingsList } from './BookingsList';

configure({ adapter: new Adapter() });

describe('BookingsList Component', () => {
    it('renders no booked times', () => {
        let props = {
            getBookings: () => {},
            bookings: {}
        }
        const wrapper = shallow(<BookingsList {...props} />);
        expect(wrapper.find('.bookings-item').length).toEqual(0);
    });

    it('renders items from data', () => {
        let props = {
            getBookings: () => {},
            bookings: {
                "12345": {
                    "2019-08-24T10:30:00-04:00": "John Doe"
                },
            },
        }
        const wrapper = shallow(<BookingsList {...props} />);
        expect(wrapper.find('.bookings-item').length).toEqual(1);
    });
});
