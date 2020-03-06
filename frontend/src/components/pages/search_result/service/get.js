import { BASE_API } from '../../../../globar_vars';

const SEARCH_PRODUCTS = '/api/items';

export const get_products = (text) => {

    // send a fetch to get products by text
    return fetch(BASE_API + SEARCH_PRODUCTS + '?q=' + text, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

}