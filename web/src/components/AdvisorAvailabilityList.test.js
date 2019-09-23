import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AdvisorAvailabilityList } from './AdvisorAvailabilityList';

configure({ adapter: new Adapter() });

describe('AdvisorAvailabilityList Component', () => {
    it('renders advisors available times', () => {
        let props = {
            error: {},
            bookTime: (advisor_id, time) => { },
            advisor_id: '12345',
            availability: [
                "2019-08-25T10:30:00-04:00", 
            ],
        }
        const wrapper = shallow(<AdvisorAvailabilityList {...props} />);
        expect(wrapper.find('li').length).toEqual(1);
    });

    it('renders no list when no availability', () => {
        let props = {
            error: {},
            bookTime: (advisor_id, time) => { },
            advisor_id: '12345',
            availability: [],
        }
        const wrapper = shallow(<AdvisorAvailabilityList {...props} />);
        expect(wrapper.find('li').length).toEqual(0);
    });

    it('triggers a booking request with button', () => {
        let mockAdvisorId = '12345';
        let mockTime = '2019-08-25T10:30:00-04:00';

        let mockBookTime = jest.fn();
        let props = {
            error: {},
            bookTime: mockBookTime,
            advisor_id: mockAdvisorId,
            availability: [
                mockTime, 
            ],
        };

        const wrapper = shallow(<AdvisorAvailabilityList {...props} />);

        const eventMock = { 
            preventDefault: () => {},
            target: {
                setAttribute: () => {},
                dataset: {
                    advisor_id: mockAdvisorId,
                    time: mockTime,
                }
            }
        };
        wrapper.find('button').simulate('click', eventMock);
        
        expect(mockBookTime.mock.calls.length).toEqual(1);
        expect(mockBookTime.mock.calls[0]).toEqual([
            eventMock.target,
            mockAdvisorId,
            mockTime,
        ]);
    });
});
