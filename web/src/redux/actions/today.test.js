import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import MockAdapter from 'axios-mock-adapter'

import getToday from './today';
import types from '../actionTypes';

describe('today actions', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    it('should return success', async () => {
        const initialState = {};
        const store = mockStore(initialState);

        const mockData = {};
        const mock = new MockAdapter(axios);
        mock
            .onGet('http://localhost:4433/today')
            .reply(200, mockData);

        store
            .dispatch(getToday())
            .then(() => {
                const actions = store.getActions();
                
                expect(actions.length).toEqual(2);
                expect(actions[0]).toEqual({
                    type: types.TODAY_FETCH_STARTED,
                });
                expect(actions[1]).toEqual({
                    type: types.TODAY_FETCH_SUCCESS,
                    payload: {},
                });
            });
    })

    it('should return failure', () => {
        const initialState = {}
        const store = mockStore(initialState)

        const mockData = {};
        const mock = new MockAdapter(axios);
        mock
            .onGet('http://localhost:4433/today')
            .reply(500, mockData);
        
        store
            .dispatch(getToday())
            .then(() => {
                const actions = store.getActions();

                expect(actions.length).toEqual(2);
                expect(actions[0]).toEqual({
                    type: types.TODAY_FETCH_STARTED,
                });
                expect(actions[1]).toEqual({
                    type: types.TODAY_FETCH_FAILURE,
                    payload: {
                        error: "Request failed with status code 500"
                    },
                });
            });
    })
})