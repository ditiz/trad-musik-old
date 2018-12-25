import React, { Component } from 'react'

export class SignupSuccessPage extends Component {

	sendVerificationEmail(e) {
		let button = e.target;

		// Disable button
		button.disabled = true;

		// Resend email
		Meteor.call('user.sendVerificationEmail', this.props.match.params.userId, (err, res) => {
			if (!err) {
				Bert.alert(
					"L'email pour vérifié votre compte a été renvoyé", 
					'success', 
					'growl-top-right'
				);
				button.disabled = false;
			} else {
				Bert.alert(err.reason, 'danger', 'growl-top-right');
			}
		});
	}

	render() {
		return (
			<div className="infoPage">
			<div>
				<h1>Votre compte a été crée !</h1>
				<hr/>
				<p>
					Il ne vous reste plus qu'à vérifier 
					votre compte en cliquant sur le lien 
					que vous avez reçu par email
				</p>

				<button onClick={(e) => this.sendVerificationEmail(e)} className="btn btn-lg btn-primary">
					Renvoyer le mail pour vérifier votre compte
				</button>
			</div>
			</div>
		)
	}
}
