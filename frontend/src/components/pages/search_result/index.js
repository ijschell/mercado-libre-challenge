import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import { get_products } from './service/get';
import Breadcrumb from '../../common/breadcrumb';
import './styles.scss';
import pin_map from './images/baseline_place_black_18dp.png';

export class SearchResultPage extends Component {

    constructor(){
        super();
        this.state = {
            to_search : '',
            author : {},
            products : [],
            breadcrumb : []
        }
    }

    // set state on charge component
    componentDidMount() {
        
        this.get_queryparam_and_set_state();

    }

    // change state when a user try another product
    change_to_search_again(){
        
        this.get_queryparam_and_set_state();    

    }

    // this method get the query param, set the state component and reset the searching
    get_queryparam_and_set_state(){

        let param = new URLSearchParams(this.props.location.search).get('search');

        if(param !== ''){

            this.setState({
                to_search : param
            })

            // go to search products!
            this.get_products_from_api(param);

        }

    }

    // go to api to get products
    get_products_from_api(text){

        // show loader
        this.props.switch_loader(true);

        get_products(text).then(res => {
            if(!res.ok){
                throw Error(res.statusText);
            }
            return res.json();
        }).then(res => {

            // set breadcrumb in global store
            this.props.set_breadcrumb(res.categories);
            
            this.setState({
                author : res.author,
                products : res.items
            })

        }).catch(err => {
            console.error(err)
        }).finally(() => {

            // hide loader
            this.props.switch_loader(false);

        })

    }

    // render products
    render_products(){

        return this.state.products.map((v, k) => {

            const id = v.id;
            const picture = v.picture;
            const title = v.title;
            const price = {
                currency : v.price.currency,
                // no debería "hardcodearlo" pero no lo he visto en el api de ML como para traerlo
                symbol : '$',
                amount : v.price.amount
            };
            const address = v.address;

            return (
                <div key={k} className="product flex">

                    {/* image */}
                    <div className="content_image">
                        <Link to={`/items/${id}`}>
                            <img src={picture} alt={title} />
                        </Link>
                    </div>

                    {/* price, title */}
                    <div className="content_price">

                        <div className="price" title={price.currency}>
                            {price.symbol} {price.amount}
                        </div>

                        <div className="title">
                            <Link to={`/items/${id}`}>
                                {title}
                            </Link>
                        </div>

                    </div>

                    {/* address */}
                    <div className="content_address flex">
                        <img src={pin_map} alt="pin" title={address} />
                        <span>{address}</span>
                    </div>

                </div>
            )

        })

    }

    render() {

        // if searching, execute call to Api
        if(this.props.searching){
            this.props.reset_seach();
            this.change_to_search_again();
        }

        // render products
        if(this.state.products.length > 0){
            return (
                <div className="container">
                    <div className="wrapper">
                        
                        {/* print breadcrumb */}                        
                        <Breadcrumb />

                        {/* print products */}
                        <div className="container_products internal_padding">
                            {this.render_products()}
                        </div>

                    </div>
                </div>
            )
        }else{
            return (
                <div className="container">
                    <div className="wrapper">
                        Realiza una búsqueda.
                    </div>
                </div>
            )
        }

    }

}

// get state
const mapStateToProps = (state) => ({
    searching : state.searching
})

// dispatch search
const mapDispatchToProps = dispatch => (
    {
        reset_seach : () => dispatch({
            component : 'search',
            type : 'reset',
            payload : ''
        }),
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchResultPage))