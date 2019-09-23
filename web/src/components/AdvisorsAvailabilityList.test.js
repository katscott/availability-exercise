import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AdvisorsAvailabilityList } from './AdvisorsAvailabilityList';

configure({ adapter: new Adapter() });

describe('AdvisorsAvailabilityList Component', () => {
    it('renders no available advisors', () => {
        let props = {
            error: {},
            getAvailability: () => { },
            availability: {},
        }
        const wrapper = shallow(<AdvisorsAvailabilityList {...props} />);
        expect(wrapper.find('.advisor-row').length).toEqual(0);
    });

    it('renders availability list', () => {
        let props = {
            error: {},
            getAvailability: () => { },
            availability: {
                "12345": [
                    "2019-08-25T10:30:00-04:00", 
                ],
            },
        }
        const wrapper = shallow(<AdvisorsAvailabilityList {...props} />);
        expect(wrapper.find('.advisor-row').length).toEqual(1);
    });
});
