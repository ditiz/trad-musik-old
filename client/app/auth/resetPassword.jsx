import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };

    this.passwordRef = React.createRef();
    this.passwordComfimRef = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();

    let password = this.passwordRef.current.value;
    let passwordComfim = this.passwordComfimRef.current.value;
    let token = this.props.match.params.token;

    Meteor.call(
      "user.changePassword",
      password,
      passwordComfim,
      token,
      (err, res) => {
        if (!err) {
          Bert.alert(
            "Votre mot de passe a été modifié",
            "success",
            "growl-top-right"
          );

          this.setState({ redirect: "/Login" });
        } else {
          Bert.alert(err.reason, "danger", "growl-top-right");
        }
      }
    );
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <form className="container col-6" onSubmit={this.handleSubmit}>
        <div className="card card-header bg-dark text-white">
          <h2>Réinitialisation de votre mot de passe</h2>
        </div>

        <div className="card card-body">
          <div className="form-group">
            <input
              ref={this.passwordRef}
              type="password"
              className="form-control input-lg"
              placeholder="Mot de passe"
              required
            />
          </div>

          <div className="form-group">
            <input
              ref={this.passwordComfimRef}
              type="password"
              className="form-control input-lg"
              placeholder="Confirmation mot de passe"
              required
            />
          </div>

          <br />

          <div className="form-group text-center">
            <input
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              value="Nouveau mot de passe"
            />
          </div>
        </div>
      </form>
    );
  }
}
