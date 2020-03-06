import { createStore } from 'redux';
import { reducers } from './reducers';

// init state
const initialState = {
    // text to search
    search : {
        searching : false,
        text_to_search : ''
    }
};

export const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store