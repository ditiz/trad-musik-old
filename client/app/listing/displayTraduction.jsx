import React, { Component } from "react";

import { Link } from "react-router-dom";

import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { DisplayImage } from "./displayImage";
import { RemoveTraduction } from "./removeTraduction";

export class DisplayTraduction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      title: "",
      artist: "",
      link: "",
      videoLink: "",
      origin: "",
      traduction: "",
      user: "",
      username: ""
    };
  }

  hoverOrigin(e) {
    let id = e.target.dataset.number;

    e.target.style.background = "#429af7";
    e.target.style.color = "#FFF";

    let elementParallel = document.getElementById("traduction_" + id);
    if (elementParallel) {
      elementParallel.style.background = "#4fa563";
      elementParallel.style.color = "#FFF";
    }
  }

  hoverTraduction(e) {
    let id = e.target.dataset.number;

    e.target.style.background = "#4fa563";
    e.target.style.color = "#FFF";

    let elementParallel = document.getElementById("origin_" + id);
    if (elementParallel) {
      elementParallel.style.background = "#429af7";
      elementParallel.style.color = "#FFF";
    }
  }

  leave(e) {
    let id = e.target.dataset.number;

    let elementOrigin = document.getElementById("origin_" + id);
    let elementTraduction = document.getElementById("traduction_" + id);

    if (elementOrigin) {
      elementOrigin.style.background = "none";
      elementOrigin.style.color = "black";
    }

    if (elementTraduction) {
      elementTraduction.style.background = "none";
      elementTraduction.style.color = "black";
    }
  }

  componentDidMount() {
    let self = this;
    Meteor.call(
      "traduction.getOne",
      this.props.match.params.traduction,
      function(err, res) {
        if (err) {
          Bert.alert("La traduction n'a pas pu être récupéré", "danger");
        } else {
          let arrayOrigin = res.origin.split("\n");
          arrayOrigin = arrayOrigin.filter(text => text != "");
          let origin = arrayOrigin.map((text, index) => (
            <p
              onMouseOver={this.hoverOrigin}
              onMouseLeave={this.leave}
              data-number={index}
              id={"origin_" + index}
              style={{ padding: "2px" }}
              key={"origin_" + index}
            >
              {text}
            </p>
          ));

          let arrayTraduction = res.traduction.split("\n");
          arrayTraduction = arrayTraduction.filter(text => text != "");
          let traduction = arrayTraduction.map((text, index) => (
            <p
              onMouseOver={this.hoverTraduction}
              onMouseLeave={this.leave}
              data-number={index}
              id={"traduction_" + index}
              style={{ padding: "2px" }}
              key={"traduction_" + index}
            >
              {text}
            </p>
          ));

          this.setState({
            _id: res._id,
            title: res.title,
            artist: res.artist,
            link: res.link,
            videoLink: res.videoLink,
            origin: origin,
            traduction: traduction,
            user: res.user
          });

          Meteor.call("user.getUsername", res.user, (err, res) => {
            if (err) {
              alert("erreur");
            } else {
              self.setState({ username: res });
            }
          });
        }
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="container-fluid col-12">
        <br />

        <div className="card">
          <div className="card-header bg-dark text-white">
            <div className="row">
              <div className="col-6">
                <h3>{this.state.title}</h3>
                <span>
                  <Link
                    to={"/List/Artist/" + this.state.artist}
                    className="link-white"
                  >
                    <small>Par : </small> {this.state.artist}
                  </Link>
                </span>
                <br />
                <span>
                  <Link
                    to={"/List/User/" + this.state.user}
                    className="link-white"
                  >
                    <small>Traduit par : </small> {this.state.username}
                  </Link>
                </span>
                <br />
                <br />
                <div className="btn-group">
                  <RemoveTraduction
                    traduction_id={this.props.match.params.traduction}
                    useIn="displayTraduction"
                    goBack="true"
                  />
                </div>
              </div>
              <div className="col-6 ">
                <div className="pull-right float-right">
                  <DisplayImage
                    link={this.state.link}
                    videoLink={this.state.videoLink}
                    height="10em"
                    width="auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <ScrollSync>
              <div className="row">
                <div className="col-6">
                  <div className="card">
                    <div className="bg-primary text-white card-header">
                      <div className="col-12">
                        <h2>Texte Original</h2>
                      </div>
                    </div>

                    <ScrollSyncPane>
                      <div
                        className="card-body bg-light"
                        style={{ overflow: "auto" }}
                      >
                        <section style={{ height: "52vh" }}>
                          <div className="render">{this.state.origin}</div>
                        </section>
                      </div>
                    </ScrollSyncPane>
                  </div>
                </div>

                <div className="col-6">
                  <div className="card">
                    <div className="bg-success text-white card-header">
                      <div className="">
                        <h2>Texte Traduit</h2>
                      </div>
                    </div>
                    <ScrollSyncPane>
                      <div
                        className="card-body bg-light"
                        style={{ overflow: "auto" }}
                      >
                        <section style={{ height: "52vh" }}>
                          <div className="render">{this.state.traduction}</div>
                        </section>
                      </div>
                    </ScrollSyncPane>
                  </div>
                </div>
              </div>
            </ScrollSync>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
