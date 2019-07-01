import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import { DisplayImage } from "./displayImage";
import { RemoveTraduction } from "./removeTraduction";

export class BlockStyleTraduction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const traduction = this.props.traduction;
    return (
      <div
        className="listing-item container-fluid alert alert-dark"
        style={{ color: "white !important" }}
        id={traduction._id}
      >
        <div className="col-2 pull-right p-1">
          <RemoveTraduction
            traduction_id={traduction._id}
            useIn="listingTraduction"
          />
        </div>
        <div>
          <div>
            <Link to={"/Show/" + traduction._id}>
              <div>
                <div>
                  <h3>{traduction.title}</h3>
                  <small>
                    <strong>Artiste : </strong>
                    {traduction.artist}
                  </small>
                </div>
                <br />
              </div>
            </Link>
          </div>
        </div>
        <div className="listing-item-image">
          <DisplayImage link={traduction.link} height="auto" width="auto" />
        </div>
      </div>
    );
  }
}
