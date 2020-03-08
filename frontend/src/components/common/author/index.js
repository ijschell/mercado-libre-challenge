import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.scss';

export class Author extends Component {

    constructor(){
        super();
    }

    render() {

        if(this.props.author.first_name !== ''){
            return (
                <div className="container_author">
                    Author: {this.props.author.first_name} {this.props.author.last_name}
                </div>
            )
        }else{
            return false;
        }

    }
}

// get state
const mapStateToProps = (state) => ({
    author : state.author
})

export default connect(mapStateToProps, null)(Author)