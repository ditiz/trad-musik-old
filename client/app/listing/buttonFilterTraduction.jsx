import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import { DisplayImage } from "./displayImage";
import { RemoveTraduction } from "./removeTraduction";

export class ButtonFilterTraduction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: this.props.display
    };
  }

  componentDidMount() {
    if (!Meteor.userId()) {
      this.setState({
        content: "hide"
      });
    }
  }

  render() {
    //Define text for button type display
    let typeDisplay = "";

    if (this.props.display == "block") {
      typeDisplay = "Affichage en liste";
    } else if (this.props.display == "list") {
      typeDisplay = "Affichage en block";
    }

    //Define text for my traduction button
    let getMyTraductionText = "";
    let getMyTraductionFunction = () => {};

    if (this.props.user || this.props.artist) {
      getMyTraductionText = "Toutes les traductions";
      getMyTraductionFunction = () => this.props.getAllTraduction();
    } else {
      getMyTraductionText = "Mes Traductions";
      getMyTraductionFunction = () =>
        this.props.getTraductionByUserId(Meteor.userId());
    }

    return (
      <div className="btn-group pull-right">
        <button
          className="btn btn-primary"
          onClick={() => this.props.changeStyle()}
        >
          {typeDisplay}
        </button>

        <button
          className="btn btn-success"
          onClick={() => getMyTraductionFunction()}
        >
          {getMyTraductionText}
        </button>
      </div>
    );
  }
}
