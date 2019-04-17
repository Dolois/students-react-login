import React from "react";
// import { Link } from "react-router-dom";
// import { userService } from "../_services";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log("HomePage");
  }

  render() {
    return <h1>Home page</h1>;
  }
}

export { HomePage };
