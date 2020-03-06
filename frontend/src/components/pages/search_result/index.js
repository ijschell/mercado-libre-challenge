import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import './styles.scss';

export class SearchResultPage extends Component {

    constructor(){
        super();
        this.state = {
            
        }
    }

    componentDidMount() {
        
        // get query param from url
        console.log('------------------------------DEBUG------------------------------------')
        console.log(this.props)
        console.log('------------------------------DEBUG------------------------------------')

    }
    

    reset_search(){

        this.props.reset_seach();

    }

    render() {
        return (
            <div>
                SearchResultPage
            </div>
        )
    }

}

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

export default connect(null, mapDispatchToProps)(withRouter(SearchResultPage))