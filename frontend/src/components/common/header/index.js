import React, { Component } from 'react';
import './styles.scss';
import logo from './images/logo__large_plus.png';
import search_icon from './images/baseline_search_black_18dp.png';

export default class Header extends Component {

    constructor(){
        super();
        this.state = {
            search_box : ''
        }
    }

    searching(event){

        this.setState({
            search_box : event.target.value
        })

    }

    render() {
        return (
            <header>
                <div className="container flex">

                    <div className="content_logo">
                        <img src={logo} alt="Logotipo" />
                    </div>

                    <div className="content_search">
                        <input type="text" onChange={(event) => this.searching(event)} value={this.state.search_box} placeholder="Buscar productos y mucho más..." />
                        <div>
                            <img src={search_icon} alt="search_icon" title="Realizar búsqueda" />
                        </div>
                    </div>

                </div>
            </header>
        )
    }
}
