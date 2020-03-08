const https = require('https');

// get a product by the ID
const get_product_by_id = (id) => {

    // this endpoint get the information extended of a product
    // https://api.mercadolibre.com/items/:ID
    return go_to_ml('api.mercadolibre.com', 'GET', `/items/${id}`)

}

// get the full description by ID
const get_product_description_by_id = (id) => {

    // https://api.mercadolibre.com/items/:ID/description
    return go_to_ml('api.mercadolibre.com', 'GET', `/items/${id}/description`)

}

// search function send the request to ML endpoint
const search = (query, limit) => {

    // Endpoint to get search result limit to 4
    // https://api.mercadolibre.com/sites/MLA/search?q=remera&limit=4

    const query_search = encodeURI(query);

    return go_to_ml('api.mercadolibre.com', 'GET', `/sites/MLA/search?q=${query_search}&limit=${limit}`);

}

// this function make the breadcrum sending request to ML endpoint
const make_breadcrumb = (items) => {

    // this is the endpoint to get category information
    // https://api.mercadolibre.com/categories/:ID

    // check what category has more items
    var categories_ids = items.map((v) => {
        
        if(typeof(v) === 'string'){
            v = JSON.parse(v);
        }

        return v.category_id
    })
    
    // now get the category most frequent
    const category = category_most_frequent(categories_ids);

    // get the information of the category
    return go_to_ml('api.mercadolibre.com', 'GET', `https://api.mercadolibre.com/categories/${category}`)

}

// this function send request to ML with dynamic params
const go_to_ml = (host, method, path) => {

    return new Promise((resolve, reject) => {

        const options = {
            host,
            method,
            path
        }

        https.get(options, (res) => {

            // convert data to UTF8
            res.setEncoding('utf8');

            const status_code = res.statusCode;

            var chunk = '';

            if(status_code == 200){
                
                // all OK, so get data
                res.on('data', (data) => {

                    chunk += data;

                });

                res.on('end', () => {

                    const message = {
                        status_code,
                        status_message : chunk
                    };

                    resolve({
                        error : false,
                        message : message
                    })

                })

            }else{
                
                // an error exists
                const message = {
                    status_code,
                    status_message : res.statusMessage
                };

                reject({
                    error : true,
                    message
                })

            }
            
        })

    })

}

// this function compare an array of categories and return the most frequent
const category_most_frequent = (categories) => {

    var counts = {};
    var compare = 0;
    var most_frecuent;

    for(var i = 0, len = categories.length; i < len; i++){
        var name = categories[i];
        
        if(counts[name] === undefined){
            counts[name] = 1;
        }else{
            counts[name] = counts[name] + 1;
        }
        if(counts[name] > compare){
              compare = counts[name];
              most_frecuent = categories[i];
        }
     }
     return most_frecuent;
}

module.exports = {
    search,
    make_breadcrumb,
    get_product_by_id,
    get_product_description_by_id
}