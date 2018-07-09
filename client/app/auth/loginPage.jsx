import React, { Component } from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'
import * as Cookies from "js-cookie";

function Connected () {

}

export class Login extends Component {

	constructor(props){
		super(props);

		this.state = {
			error: "",
			info: "",
		}
	}

	
	componentDidMount() {
		let self = this;
		if (Cookies.get("user")){
			Meteor.call('user.isUser', Cookies.get("user"), (err, res) => {
				if (res) {
					self.setState({
						info: 'Vous êtes connecté'
					})
				}
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		let email = document.getElementById('login-email').value;
		let password = document.getElementById('login-password').value;

		Meteor.call("user.getOne", email, password, (err, res) => {
			if (err) {

				this.setState({ error: "Identifiant incorrecte" });
				Bert.alert(
					"Les identifiants que vous avez donné semble incorrect",
					"danger",
					'growl-top-right'
				);

			} else {

				this.setState({ error: "" });
				Bert.alert(
					"Connexion réussi",
					"success",
					'growl-top-right'
				);

				Cookies.set('user', res.token, { expires: 365 });
				document.location.href = '/';
				
			}
		});
	}

	render() {
		const error = this.state.error;
		const info 	= this.state.info; 

		return(
			<div className="container-fluid col-12">
				<br/>
				<div className="col-3 container">

					<div className='card card-header col-12 bg-dark text-white'>
						<h2>Connexion</h2>
					</div>

					<div className="card card-body">

						<form id="login-form"
							className="form center-block"
							onSubmit={this.handleSubmit}>

							<div>
								<div className="form-group">
									<input type="text"
										id="login-email"
										className="form-control input-lg"
										placeholder="Adresse mail"/>
								</div>
								<div className="form-group">
									<input type="password"
										id="login-password"
										className="form-control input-lg"
										placeholder="Mot de passe"/>
								</div>
								<div className="form-group text-center">
									<input type="submit"
										id="login-button"
										className="btn btn-primary btn-lg btn-block"
										value="Login"/>
								</div>


								{error.length > 0
									? <div className="alert alert-danger">{error}</div>
									: ""}

								{info.length > 0
									? <div className="alert alert-info">{info}</div>
									: ""}
									
								<div className="form-group text-center">
									<p className="text-center">
										Pas encore de compte ?
										<Link to="/signup">Inscription ici</Link>
									</p>
								</div>
							</div>
						</form>
					</div>

				</div>
			</div>
		);
	}
}