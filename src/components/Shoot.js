import React from 'react';

export default class Shoot extends React.Component {

    constructor() {
        super();
        this.state = {
            disabled: false
        };
    }

    handleClick(event) {
        event.preventDefault();
        this.props.fire();
        if(this.props.btnShotPar == 'disabled'){
            this.setState({
                disabled:true,
            });
        }else{
            this.setState({
                disabled:false
            });
        }
    }
    render() {
        return (
            <button disabled={this.state.disabled} className="warning"
            onClick={this.handleClick.bind(this)}>Shoot</button>
        );
    }
}