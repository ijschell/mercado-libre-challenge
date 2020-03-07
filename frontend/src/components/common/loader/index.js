import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.scss';

export class LoaderLine extends Component {
    render() {

        // return only if loader is sohw
        if(this.props.loader){
            return (
                <div className="linear-activity">
                    <div className="indeterminate"></div>
                </div>
            )
        }
        else{
            return false;
        }

    }
}

// get state
const mapStateToProps = (state) => ({
    loader : state.loader
})

export default connect(mapStateToProps, null)(LoaderLine)