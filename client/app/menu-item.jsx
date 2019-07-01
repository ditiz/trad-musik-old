import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";

export class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let actions = [
      {
        text: "Liste des musiques traduites",
        idAction: 1,
        url: "/List",
        icon: "/img/music-list2.png"
      },
      {
        text: "Créer une nouvelle traduction",
        idAction: 2,
        url: "/Create",
        icon: "/img/music-plus.png"
      },
      {
        text: "Page admin",
        idAction: 3,
        url: "/Admin",
        icon: "/img/admin.png",
        admin: true
      },
      {
        text: "Logout",
        idAction: 4,
        url: "/Logout",
        icon: "/img/logout.png",
        down: true
      }
    ];

    let isAdmin = false;

    return (
      <div>
        <div>
          <div className="nav-item">
            <Link to="/List" className="menu-item">
              <p className="nav-link" title="Liste des musiques traduites">
                <img
                  src="/img/music-list2.png"
                  className="icon-menu"
                  alt="Liste des musiques traduites"
                />
              </p>
            </Link>
          </div>

          <div className="nav-item">
            <Link to="/Create" className="menu-item">
              <p className="nav-link" title="Créer une nouvelle traduction">
                <img
                  src="/img/music-plus.png"
                  className="icon-menu"
                  alt="Créer une nouvelle traduction"
                />
              </p>
            </Link>
          </div>

          {this.props.isAdmin && (
            <div className="nav-item">
              <Link to="/Admin" className="menu-item">
                <p className="nav-link" title="Page admin">
                  <img
                    src="/img/admin.png"
                    className="icon-menu"
                    alt="Page admin"
                  />
                </p>
              </Link>
            </div>
          )}

          <div className="nav-item-down">
            <UserContext.Consumer>
              {UserContext => (
                <div onClick={() => UserContext.setAdmin(false)}>
                  <Link to="/Logout" className="menu-item">
                    <p className="nav-link" title="Déconnexion">
                      <img
                        src="/img/logout.png"
                        className="icon-menu"
                        alt="Déconnexion"
                      />
                    </p>
                  </Link>
                </div>
              )}
            </UserContext.Consumer>
          </div>
        </div>
      </div>
    );
  }
}
