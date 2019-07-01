import React, { Component } from "react";
import { render } from "react-dom";
import { Redirect } from "react-router-dom";

export class Dashbord extends Component {
  render() {
    return (
      <div>
        <Redirect to="/List" />
      </div>
    );
  }
}
