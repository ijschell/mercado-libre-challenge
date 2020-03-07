export const reducers = (state, action) => {

    switch (action.component) {
        case 'search':
            state = handleSearch(state, action)    
        break;
        case 'loader':
            state = handleLoader(state, action)    
        break;
        // case 'userInfo':
        //     state = handleUserInfo(state, action)    
        // break;
        // case 'sidebar':
        //     state = handleSidebar(state, action)    
        // break;
        // case 'navigation':
        //     state = handleNavigation(state, action)    
        // break;
    }

    return state;

}

const handleSearch = (state, action) => {

    switch (action.type) {
        case 'searching':
            return {
                ...state,
                searching : true                     
            }
        break;
        case 'reset':
            return {
                ...state,
                searching : false
            }
        break;
    }

}

const handleLoader = (state, action) => {

    switch (action.type) {
        case 'switch':
            return {
                ...state,
                loader : action.payload                     
            }
        break;
    }

}