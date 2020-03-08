import React, { Component } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { get_product } from './service/get';
import './styles.scss';

export class ProductExtendedPage extends Component {

    constructor(){
        super();
        this.state = {
            id : null,
            product : null,
        }
    }

    componentDidMount() {
        
        this.get_queryparam_and_set_state();

    }
    
    get_queryparam_and_set_state(){

        let ID = this.props.match.params.id;

        if(ID !== ''){

            this.setState({
                id : ID
            })

            // go to search products!
            this.get_product_from_api(ID);

        }

    }

    // go to api to get products
    get_product_from_api(ID){

        // show loader
        this.props.switch_loader(true);

        get_product(ID).then(res => {
            if(!res.ok){
                throw Error(res.statusText);
            }
            return res.json();
        }).then(res => {

            // set breadcrumb in global store
            this.props.set_breadcrumb(res.item.breadcrump_data);

            // save data in state
            this.setState({
                product : res.item
            })

        }).catch(err => {
            console.error(err)
        }).finally(() => {

            // hide loader
            this.props.switch_loader(false);

        })

    }

    // render product
    render_product(){

        if(this.state.product){

            const product = this.state.product;

            const title = product.title;
            const price = {
                currency : product.price.currency,
                symbol : '$',
                amount : product.price.amount,
                decimals : product.price.decimals
            };
            const sold = product.sold_quantity;
            const image = product.picture;
            const condition = product.condition;
            const description = product.description;

            return (
                <div className="product flex internal_padding">
                    
                    <div className="image">
                        <img src={image} alt={title} />
                    </div>

                    <div className="price">

                        <div className="condition_sold">
                            <span>{condition} - {sold} vendidos</span>
                        </div>

                        <div className="title">
                            <h2>{title}</h2>
                        </div>

                        <div className="amount">
                            {price.symbol} {price.amount} <sup>{price.decimals}</sup>
                        </div>

                        <div className="button">

                        </div>

                    </div>

                    <div className="description">
                        <h3>Descripción del producto</h3>
                        <div>{description}</div>
                    </div>

                </div>
            )

        }
        
    }

    render() {

        if(this.state.product){

            return (
                <div className="container">
                    <div className="wrapper">

                        {/* print breadcrumb */}
                        <Breadcrumb />

                        <div className="container_product">
                            {this.render_product()}
                        </div>

                    </div>
                </div>
            )

        }else{

            return (
                <div className="container">
                    <div className="wrapper">
                        <div>
                            No se ha seleccionado ningún producto.
                        </div>
                    </div>
                </div>
            )    

        }

    }
}

// dispatch search
const mapDispatchToProps = dispatch => (
    {
        switch_loader : bool => dispatch ({
            component : 'loader',
            type : 'switch',
            payload : bool
        }),
        set_breadcrumb : categories => dispatch({
            component : 'breadcrumb',
            type : 'update',
            payload : categories
        })
    }
)

export default connect(null, mapDispatchToProps)(withRouter(ProductExtendedPage))