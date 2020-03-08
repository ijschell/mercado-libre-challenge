const author = {
    name : 'Michael Jonathan',
    lastname : 'Schell Montes'
}

const search = (result_search, categories_breadcrumb) => {

    const items = result_search.map((v) => {

        return {
            id: v.id,
            title: v.title,
            price: {
                currency: v.currency_id,
                amount: v.price,
                decimals: 0
            },
            picture: v.thumbnail,
            condition: v.condition,
            free_shipping: v.shipping.free_shipping,
            // extra data
            address : v.address.state_name
        }

    })

    const result = {
        author,
        categories : categories_breadcrumb,
        items
    };

    return result;

}

const product = (product_data, description_data, breadcrump_data) => {

    const item = {
        id : product_data.id,
        title : product_data.title,
        price : {
            currency : product_data.currency_id,
            amount : product_data.price,
            decimals : 0,
        },
        picture : product_data.pictures[0].url,
        condition : product_data.condition,
        free_shipping : product_data.shipping.free_shipping,
        sold_quantity : product_data.sold_quantity,
        description : description_data.plain_text,
        breadcrump_data
    };

    const result = {
        author,
        item
    };

    return result;

}

module.exports = {
    search,
    product
}