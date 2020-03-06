import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { get_products } from './service/get';
import './styles.scss';

export class SearchResultPage extends Component {

    constructor(){
        super();
        this.state = {
            to_search : ''
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

        get_products(text).then(res => {            
            return res.json();
        }).then(res => {
            console.log('------------------------------DEBUG------------------------------------')
            console.log(res)
            console.log('------------------------------DEBUG------------------------------------')
        }).catch(err => {
            console.log('------------------------------ERROR------------------------------------')
            console.log(err)
            console.log('------------------------------ERROR------------------------------------')
        })

    }  

    render() {

        if(this.props.searching){
            this.props.reset_seach();
            this.change_to_search_again();
        }



        return (
            <div>
                resultado {this.state.to_search}
            </div>
        )
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
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchResultPage))