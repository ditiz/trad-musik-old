import React, { Component } from 'react'
import { Login }  from "./loginPage";

export class VerifiedEmail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			titre: "",
			text: "",
			login: false,
			className: ""
		};
	}
	
	componentDidMount() {
		// Get token from params url
		let token = JSON.parse('{"' + decodeURI(this.props.location.search)
			.replace(/"/g, '\\"')
			.replace(/&/g, '","')
			.replace(/=/g, '":"') 
			.replace(/\?/g, '')
			+ '"}');

		Meteor.call('user.verificationEmail', token.token, (err,res) => {
			if (!err) {
				
				let titre = "";
				let text = "";
				let login = false;
				let className = "danger";

				if (res == "already verified") {
					titre = "Votre email a été vérifié";
					text = `Vous pouvez à présent vous connecter`
					login = true;
					className = "success";
				} else if (res == true){
					titre = "Votre email a déjà été vérifié"
					text = `Vous pouvez à présent vous connecter`
					login = true;
					className = "success";
				} else {
					titre = "Une erreur est survenue",
					text = `Il semble que le lien sur lequel 
						vous avez cliqué ne soit pas correcte`
				}

				this.setState({
					titre: titre,
					text: text,
					login: login,
					className: className
				});
			}
		});
	}

	render() {
		return (
			<React.Fragment>
				<br/>
				<div className={"infoPage alert alert-" + this.state.className}>
					<div>
						<h1>{this.state.titre}</h1>
						<hr />
						<div>{this.state.text}</div>
					</div>
				</div>
				{this.state.login && 
					<Login />
				}
			</React.Fragment>
		)
	}
}