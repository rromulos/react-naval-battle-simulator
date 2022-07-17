import React from 'react';

import Shoot from './Shoot';

export default class Battleship extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <h1>{this.props.battleshipName}</h1>
                <h1><img src={'assets/images/' + this.props.imageName} width="100%" height="100%"></img></h1>
                <h4><b>{this.props.energy} %</b></h4>
                <div className="progress">
                    <div className={'progress-bar ' + this.props.pbarStatus} role="progressBar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width:this.props.energy+"%"}}>
                    <span className="sr-only">70% Complete</span>
                    </div>
                </div>
                <div className="card">
                    {/* <Shoot fire={this.props.fire} */}
                    {/* btnShotPar={this.props.btnShotStatus} /> */}
                </div>
            </div>
        );
    }
}