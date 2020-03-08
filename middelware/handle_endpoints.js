const connect_ml = require('./core/connect_ml');
const preprocess = require('./core/preprocess');

const process_request = (app) => {

    // search
    app.get('/api/items', (request, response) => {

        // get query
        const query = request.query.q;
    
        connect_ml.search(query, 4).then(res => {
    
            var result_search, categories_breadcrumb;
            
            // request is OK, now will prepare json response
            result_search = JSON.parse(res.message.status_message)["results"];
    
            // make breadcrump
            connect_ml.make_breadcrumb(result_search).then(res => {
    
                // all OK, so, send categories to result
                categories_breadcrumb = JSON.parse(res.message.status_message)["path_from_root"];
    
                // prepare the json data to result
                const message = preprocess.search(result_search, categories_breadcrumb)
    
                response.status(200).send(message)
    
            }).catch(err => {
    
                const message_error = send_error(err, 'Ocurrió un error intentando acceder a las categorías.');
            
                // an error occurred, send the message
                response.status(err.message.status_code).send(message_error)
    
            })
    
        }).catch(err => {
    
            const message_error = send_error(err, 'Ocurrió un error intentando obtener los resultados de búsqueda.');
            
            // an error occurred, send the message
            response.status(err.message.status_code).send(message_error)
    
        })
     
    })
    
    // get product
    app.get('/api/items/:id', (request, response) => {

        // get ID from params
        const ID = request.params.id;
    
        const product_data = connect_ml.get_product_by_id(ID);
    
        const description_data = connect_ml.get_product_description_by_id(ID);
    
        Promise.all([product_data, description_data]).then(values => {
    
            // get data and convert to object
            const product_data = JSON.parse(values[0].message.status_message);
            const description_data = JSON.parse(values[1].message.status_message);
            connect_ml.make_breadcrumb([values[0].message.status_message]).then(res => {
    
                const breadcrumb = JSON.parse(res.message.status_message)['path_from_root'];
    
                // now go to preprocess data to make the json response
                const message = preprocess.product(product_data, description_data, breadcrumb);
    
                response.status(200).send(message)
    
            }).catch(err => {
            
                const message_error = send_error(err, 'Ocurrió un error intentando obtener las categorías.');
                
                // an error occurred, send the message
                response.status(err.message.status_code).send(message_error)
        
            })
    
        }).catch(err => {
            
            const message_error = send_error(err, 'Ocurrió un error intentando obtener un producto.');
            
            // an error occurred, send the message
            response.status(err.message.status_code).send(message_error)
    
        })
    
    })

}

const send_error = (err, custom_message) => {
    
    console.error(err);

    const result = {
        error : true,
        message : err.message.status_message,
        custom_message
    };

    return result;

}

module.exports = {
    process_request
}