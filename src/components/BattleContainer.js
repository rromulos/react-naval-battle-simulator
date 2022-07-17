import React from "react";
import Battleship from "./Battleship";

export default class BattleContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      opponent1_energy: 100,
      opponent2_energy: 100,
      btn_opponent1_state: "",
      btn_opponent2_state: "",
      timeout: 500,
      history_opponent1: [],
      history_opponent2: [],
      lastTurn: null,
      victoryMessage: null,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.simulate_battle(),
      this.state.timeout
    );
  }

  refreshPage() {
    window.location.reload(false);
  }

  simulate_battle() {
    if (this.state.opponent1_energy > 0 && this.state.opponent2_energy > 0) {
      if (this.state.lastTurn === null || this.state.lastTurn === "opponent2") {
        this.opponent1_shot();
        this.setState({
          lastTurn: "opponent1",
        });
      } else {
        this.opponent2_shot();
        this.setState({
          lastTurn: "opponent2",
        });
      }
      this.checkVictory();
    } else {
      this.setState({
        timeout: null,
      });
    }
  }

  /* Function to calculate the progressBar status for the oponent 1 */
  pbarStyle_op1() {
    if (this.state.opponent1_energy === 100) {
      return "bg-success";
    } else if (
      this.state.opponent1_energy < 80 &&
      this.state.opponent1_energy > 60
    ) {
      return "";
    } else if (
      this.state.opponent1_energy < 60 &&
      this.state.opponent1_energy > 40
    ) {
      return "bg-warning";
    } else if (
      this.state.opponent1_energy <= 40 &&
      this.state.opponent1_energy > 0
    ) {
      return "bg-danger";
    }
  }

  pbarStyle_op2() {
    if (this.state.opponent2_energy === 100) {
      return "bg-success";
    } else if (
      this.state.opponent2_energy < 80 &&
      this.state.opponent2_energy >= 60
    ) {
      return "";
    } else if (
      this.state.opponent2_energy < 60 &&
      this.state.opponent2_energy >= 40
    ) {
      return "bg-warning";
    } else if (
      this.state.opponent2_energy <= 40 &&
      this.state.opponent2_energy >= 0
    ) {
      return "bg-danger";
    }
  }

  opponent1_shot() {
    const { opponent1 } = this.props;
    const mSkill = this.props.opponent1.skill;
    const mAcurracy = this.props.opponent1.acurracy;
    const mMinRandom = 1;
    const mMaxRandom = 10;
    const mRand = mMinRandom + Math.random() * (mMaxRandom - mMinRandom);
    const mTempRes = (mSkill + mAcurracy) / 2;
    let mFinalResult = (mTempRes * mRand) / 10;
    if (this.state.opponent2_energy - Number(mFinalResult.toFixed(0)) <= 0) {
      mFinalResult = this.state.opponent2_energy;
    }
    this.state.history_opponent2.push(
      opponent1.warShipName +
        " dealt you " +
        Number(mFinalResult.toFixed(0)) +
        " damage"
    );
    this.setState({
      opponent2_energy:
        this.state.opponent2_energy - Number(mFinalResult.toFixed(0)),
      btn_opponent1_state: "disabled",
      btn_opponent2_state: "",
    });
  }

  opponent2_shot() {
    const { opponent2 } = this.props;
    const mSkill = this.props.opponent2.skill;
    const mAcurracy = this.props.opponent2.acurracy;
    const mMinRandom = 1;
    const mMaxRandom = 10;
    const mRand = mMinRandom + Math.random() * (mMaxRandom - mMinRandom);
    const mTempRes = (mSkill + mAcurracy) / 2;
    let mFinalResult = (mTempRes * mRand) / 10;
    if (this.state.opponent1_energy - Number(mFinalResult.toFixed(0)) <= 0) {
      mFinalResult = this.state.opponent1_energy;
    }
    this.state.history_opponent1.push(
      opponent2.warShipName +
        " dealt you " +
        Number(mFinalResult.toFixed(0)) +
        " damage"
    );
    this.setState({
      opponent1_energy:
        this.state.opponent1_energy - Number(mFinalResult.toFixed(0)),
      btn_opponent1_state: "",
      btn_opponent2_state: "disabled",
    });
  }

  checkVictory () {
    const { opponent1, opponent2 } = this.props;
    if (this.state.opponent1_energy === 0) {
        this.setState({
            victoryMessage: opponent2.warShipName + " WON the battle"
        })
    }
    if(this.state.opponent2_energy === 0) {
        this.setState({
            victoryMessage: opponent1.warShipName + " WON the battle"
        })
    }
  }

  render() {
    const { battle, opponent1, opponent2 } = this.props;
    const divOpponent1 = {
      backgroundColor: "#fff",
      opacity: 0.5,
      width: "30.5%",
      align: "left",
      overflowY: "scroll",
      maxheight: "150px",
      height: "150px",
      padding: "10px",
      float: "left",
      marginLeft: "1.5%",
      color: "blue",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
    };
    const divOpponent2 = {
      backgroundColor: "#fff",
      opacity: 0.5,
      width: "30.5%",
      align: "right",
      overflowY: "scroll",
      maxheight: "150px",
      height: "150px",
      padding: "10px",
      marginLeft: "36%",
      color: "red",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
    };
    const container = {
      paddingTop: "17em",
    };
    const alignText = {
      textAlign: "center",
    };
    const shipInfo = {
      height: "100px",
      opacity: 0.5,
      backgroundColor: "#fff",
      width: "50%",
      fontSize: "14px",
      borderRadius: "5px",
    };

    const floatLeft = {
      float: "left",
    };
    const floatRight = {
      float: "right",
    };
    const buttonNewBattle = {
        position:"relative", 
        margin: "-20px -50px",
        left:"50%",
        boxShadow:"inset 0px 1px 0px 0px #cf866c",
        background:"linear-gradient(to bottom, #d0451b 5%, #bc3315 100%)",
        BackgroundColor: "#d0451b",
        borderRadius: "3px",
        border: "1px solid #942911",
        display: "inline-block",
        cursor: "pointer",
        color: "#ffffff",
        fontFamily: "Arial",
        fontSize: "26px",
        padding: "13px 24px",
        textDecoration: "none",
        textShadow: "0px 1px 0px #854629",
    }

    return (
      <div className="container" style={container}>
        <div className="row">
          <div className="col-sm" style={{ ...alignText }}>
            <img src="assets/images/battlename.png" width="80%"></img>
          </div>
        </div>
        <div className="row">
          <div className="col-sm" style={alignText}>
            <div style={{ ...shipInfo, ...floatLeft }}>
              <p>
                <span>
                  <b>Admiral:</b>
                </span>{" "}
                {opponent1.admiralName}
              </p>
              <p>
                <span>
                  <b>Warship:</b>
                </span>{" "}
                {opponent1.warShipName}
              </p>
              <p>
                <span>
                  <b>Nation:</b>
                </span>{" "}
                {opponent1.nation}
              </p>
            </div>
            <Battleship
              energy={this.state.opponent1_energy}
              fire={this.opponent1_shot.bind(this)}
              pbarStatus={this.pbarStyle_op1()}
              btnShotStatus={this.state.btn_opponent1_state}
              imageName={opponent1.imageName}
            />
          </div>

          <div className="col-sm" style={alignText}>
            <h1><b>{this.state.victoryMessage}</b></h1>
          </div>

          <div className="col-sm" style={alignText}>
            <div style={{ ...shipInfo, ...floatRight }}>
              <p>
                <span>
                  <b>Admiral:</b>
                </span>{" "}
                {opponent2.admiralName}
              </p>
              <p>
                <span>
                  <b>Warship:</b>
                </span>{" "}
                {opponent2.warShipName}
              </p>
              <p>
                <span>
                  <b>Nation:</b>
                </span>{" "}
                {opponent2.nation}
              </p>
            </div>
            <Battleship
              energy={this.state.opponent2_energy}
              fire={this.opponent2_shot.bind(this)}
              pbarStatus={this.pbarStyle_op2()}
              btnShotStatus={this.state.btn_opponent2_state}
              imageName={opponent2.imageName}
            />
          </div>
        </div>
        <div className="row">
          <div id="info_opponent1" style={divOpponent1}>
            {this.state.history_opponent1.map((hist) => (
              <div> {hist} </div>
            ))}
          </div>
          <div id="info_opponent2" style={divOpponent2}>
            {this.state.history_opponent2.map((hist) => (
              <div> {hist} </div>
            ))}
          </div>
        </div>
        <div className="row" style={alignText}>
            <button style={buttonNewBattle} onClick={this.refreshPage}>New battle</button>
        </div>
      </div>
    );
  }
}
