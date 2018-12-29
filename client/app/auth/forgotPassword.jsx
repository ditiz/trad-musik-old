import React, { Component } from 'react'

export class ForgotPassword extends Component {

	constructor(props) {
		super(props);

		this.emailRef = React.createRef();
	}

	handleSubmit = (e) => {
		e.preventDefault();

		Meteor.call('user.resetPassword', this.emailRef.current.value, (err, res) => {
			if (!err) {
				let message = "Un email pour réinitialiser votre mot de passe vous a été envoyé";
				Bert.alert(message, 'success', 'growl-top-right');
			} else {
				Bert.alert(err.reason, 'danger', 'growl-top-right');
			}
		});
		
	}

	render() {

		let info = "";
		let error = "";

		return (
			<div>
				<div className="container-fluid col-12">
					<br />
					<div className="col-6 container">

						<div className='card card-header col-12 bg-dark text-white'>
							<h2>Récuperation du mot de passe</h2>
						</div>

						<div className="card card-body">

							<form id="login-form"
								className="form center-block"
								onSubmit={this.handleSubmit}>

								<div>
									<div className="form-group alert alert-info text-center">
										Entrer votre adresse email ci-dessous pour recevoir un 
										mail vous permettant de créer un nouveau mot de passe
									</div>

									<div className="form-group">
										<input type="email"
											id="login-email"
											className="form-control input-lg"
											placeholder="Adresse mail"
											ref={this.emailRef}
											required/>
									</div>
									
									<div className="form-group text-center">
										<input type="submit"
											id="login-button"
											className="btn btn-primary btn-lg btn-block"
											value="Récupération du mot de passe" />
									</div>

									{error.length > 0
										? <div className="alert alert-danger">{error}</div>
										: ""}

									{info.length > 0
										? <div className="alert alert-info">{info}</div>
										: ""}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
	