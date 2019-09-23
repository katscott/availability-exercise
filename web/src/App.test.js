import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { App } from './App';

configure({ adapter: new Adapter() });

describe('App Component', () => {
    it('renders without crashing', () => {
        let props = {
            error: {},
            today: '',
            getToday: () => { }
        }
        const wrapper = shallow(<App {...props} />);
        expect(wrapper.find('#today').length).toEqual(0);
    });

    it('renders today when provided', () => {
        let mockGetToday = jest.fn();
        let props = {
            error: {},
            today: 'today',
            getToday: mockGetToday,
        }
        const wrapper = shallow(<App {...props} />);

        expect(mockGetToday.mock.calls.length).toEqual(1);
        expect(wrapper.find('#today').length).toEqual(1);
    });

    it('error alert not displayed when error not provided', () => {
        let props = {
            error: {},
            today: 'today',
            getToday: () => {}
        }
        const wrapper = shallow(<App {...props} />);
        expect(wrapper.find('#fixed-message').prop('style').display).toEqual("none");
    });

    it('error alert displayed when error provided', () => {
        let props = {
            error: {},
            today: 'today',
            getToday: () => {},
        }
        let mockShowMessage = jest.fn();

        const wrapper = shallow(<App {...props} />);

        wrapper.instance().showMessage = mockShowMessage;
        wrapper.update();
        wrapper.setProps({
            error: {
                message: 'error',
            },
        });

        expect(mockShowMessage.mock.calls.length).toEqual(1);
    });
});
