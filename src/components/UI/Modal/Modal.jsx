import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }


  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} click={this.props.modalClosed}></Backdrop>
        <div
          className={classes.Modal}
          style={{
            opacity: this.props.show ? 1 : 0,
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
  
};

export default modal;
