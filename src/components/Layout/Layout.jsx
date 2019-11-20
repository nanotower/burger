import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends Component {
  state={
    showSideDrawer: false
  }
  sideDrawerClosed = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  sideDrawerOpened = () => {
    this.setState( (prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar openSideDrawer={this.sideDrawerOpened}/>
        <SideDrawer 
        closeSideDrawer={this.sideDrawerClosed}
        closed={this.sideDrawerClosed}
        open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
