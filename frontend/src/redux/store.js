import { createStore } from 'redux';
import { reducers } from './reducers';

// init state
const initialState = {
    // text to search
    searching : false,
    loader : false,
    breadcrumb : false
};

export const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store