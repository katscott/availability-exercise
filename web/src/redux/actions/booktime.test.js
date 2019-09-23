import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import MockAdapter from 'axios-mock-adapter'

import bookTime from './booktime';
import types from '../actionTypes';

describe('booktime actions', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('should return success', async () => {
        const initialState = {
            studentName: 'John Doe',
        };
        const store = mockStore(initialState);

        const mockData = {};
        const mock = new MockAdapter(axios);
        mock
            .onPost('http://localhost:4433/bookings')
            .reply(200, mockData);

        var bookingTime = new Date();

        store
            .dispatch(bookTime({}, "12345", bookingTime))
            .then(() => {
                const actions = store.getActions();
                
                expect(actions.length).toEqual(4);
                expect(actions[0]).toEqual({
                    type: types.BOOKTIME_STARTED,
                });
                expect(actions[1]).toEqual({
                    type: types.BOOKTIME_SUCCESS,
                });
                expect(actions[2].type).toEqual(types.AVAILABILITY_FETCH_STARTED);
                expect(actions[3].type).toEqual(types.BOOKINGS_FETCH_STARTED);
            });
    });

    it('should return failure when api fails', () => {
        const initialState = {
            studentName: 'John Doe',
        }
        const store = mockStore(initialState)

        const mockData = {};
        const mock = new MockAdapter(axios);
        mock
            .onPost('http://localhost:4433/bookings')
            .reply(500, mockData);

        var bookingTime = new Date();
        
        jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);
        store
            .dispatch(bookTime({}, "12345", bookingTime))
            .then(() => {
                const actions = store.getActions();

                expect(actions.length).toEqual(2);
                expect(actions[0]).toEqual({
                    type: types.BOOKTIME_STARTED,
                });
                expect(actions[1]).toEqual({
                    type: types.BOOKTIME_FAILURE,
                    payload: {
                        message: "Request failed with status code 500",
                        source: {},
                        time: Date.now(),
                    },
                });
            });
    });

    it('should return failure when no student name in state', () => {
        const initialState = {
        }
        const store = mockStore(initialState)

        const mockData = {};
        const mock = new MockAdapter(axios);
        mock
            .onPost('http://localhost:4433/bookings')
            .reply(500, mockData);

        var bookingTime = new Date();
        
        jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);
        store
            .dispatch(bookTime({}, "12345", bookingTime))
            .then(() => {
                const actions = store.getActions();

                expect(actions.length).toEqual(2);
                expect(actions[0]).toEqual({
                    type: types.BOOKTIME_STARTED,
                });
                expect(actions[1]).toEqual({
                    type: types.BOOKTIME_FAILURE,
                    payload: {
                        message: "Please provide your name to book time with an advisor.",
                        source: {},
                        time: Date.now(),
                    },
                });
            });
    });
})