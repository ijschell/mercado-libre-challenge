import { BASE_API } from '../../../../globar_vars';

const GET_PRODUCTS = '/api/items/';

export const get_product = (ID) => {

    // send a fetch to get products by text
    return fetch(BASE_API + GET_PRODUCTS + ID, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

}