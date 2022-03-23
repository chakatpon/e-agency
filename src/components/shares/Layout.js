import React from "react";
import Header from "./Header";
import Imagelotus from "../../assets/img/bgviriyah0.png";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.id} className="main-layout">
        <Header {...this.props}></Header>
        <div className="main-area"> {this.props.children} </div>
        <img className="bg-img" src={Imagelotus} />
      </div>
    );
  }
}

export default Layout;
