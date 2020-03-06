import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import './styles.scss';
import logo from './images/logo__large_plus.png';
import search_icon from './images/baseline_search_black_18dp.png';

export class Header extends Component {

    constructor(){
        super();
        this.state = {
            search_box : ''
        }
    }

    searching(event){

        // change state with the text typed
        this.setState({
            search_box : event.target.value
        })

    }

    go_to_search(){

        // change redirect to true to go to result page
        if(this.state.search_box !== ''){
            this.props.history.push(`/items?search=${this.state.search_box}`)
        }

    }

    handleKeyDown(event){

        // if press enter go to search
        if(event.key === 'Enter'){            
            this.go_to_search();
        }

    }

    render() {

        return (
            <header>
                <div className="container flex">

                    <div className="content_logo">
                        <Link to='/'>
                            <img src={logo} alt="Logotipo" />
                        </Link>                        
                    </div>

                    <div className="content_search">
                        <input 
                            type="text" 
                            onChange={(event) => this.searching(event)} 
                            onKeyDown={(event) => this.handleKeyDown(event)}
                            value={this.state.search_box} placeholder="Buscar productos y mucho más..."
                        />
                        <div onClick={() => this.go_to_search()}>
                            <img src={search_icon} alt="search_icon" title="Realizar búsqueda" />
                        </div>
                    </div>

                </div>
            </header>
            
        )
    }
}

// dispatch search
const mapDispatchToProps = dispatch => (
    {
        seach : (text) => dispatch({
            component : 'search',
            type : 'searching',
            payload : text
        })
    }
)

export default connect(null, mapDispatchToProps)(withRouter(Header))