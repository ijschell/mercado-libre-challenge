import React, { Component } from 'react';
import { connect } from 'react-redux';
import arrow_right from './images/baseline_arrow_right_black_18dp.png';
import './styles.scss';

export class Breadcrumb extends Component {

    // render breadcrumb
    render_breadcrumb(){

        const breadcrumb = this.props.breadcrumb;

        if(breadcrumb.length > 0){

            return breadcrumb.map((v, k) => {

                var result;
                
                // check is last to print arrow or not
                if(k === (breadcrumb.length - 1)){
                    result = (
                        <div key={k} className="item_breadcrumb flex">
                            <span><b>{v.name}</b></span>
                        </div>
                    );
                }else{
                    result = (
                        <div key={k} className="item_breadcrumb flex">
                            <span>{v.name}</span>
                            <img src={arrow_right} alt="arrow_right" />
                        </div>
                    );
                }

                return result;

            })

        }

    }

    render() {

        if(this.props.breadcrumb){
            return (
                <div className="container_breadcrumb flex">
                    {this.render_breadcrumb()}
                </div>
            )
        }else{
            return false;
        }

    }
}

// get state
const mapStateToProps = (state) => ({
    breadcrumb : state.breadcrumb
})

// dispatch search
const mapDispatchToProps = dispatch => (
    {
        seach : () => dispatch({
            component : 'search',
            type : 'searching',
            payload : ''
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb)