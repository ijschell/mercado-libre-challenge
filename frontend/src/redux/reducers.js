export const reducers = (state, action) => {

    switch (action.component) {
        case 'search':
            state = handleSearch(state, action)    
        break;
        case 'loader':
            state = handleLoader(state, action)    
        break;
        case 'breadcrumb':
            state = handleBreadcrumb(state, action)    
        break;
        case 'author':
            state = handleAuthor(state, action)    
        break;
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

const handleBreadcrumb = (state, action) => {

    switch (action.type) {
        case 'update':
            return {
                ...state,
                breadcrumb : action.payload                     
            }
        break;
    }

}

const handleAuthor = (state, action) => {

    switch (action.type) {
        case 'update':
            return {
                ...state,
                author : action.payload
            }
        break;
    }

}