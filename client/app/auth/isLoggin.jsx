import React, { Component } from 'react';
import { render } from 'react-dom';
import {
	Redirect
} from 'react-router-dom';
import * as Cookies from "js-cookie";


export class IsLoggin extends Component {
	constructor (props) {
		super(props);

		this.state = {
			redirect: false
		}
	}

	componentWillMount () {
		console.log(Meteor.userId())
		if (!Meteor.userId())  {
			this.setState({ redirect: true })
			Bert.alert(
				"Vous n'êtes pas connecté",
				"danger",
				'growl-top-right'
			);
		} else {
			Meteor.call('user.isUser', Meteor.userId(), (err, res) => {
				if (!res) {
					Bert.alert(
						"Vous n'êtes pas connecté",
						"danger",
						'growl-top-right'
					);
					this.setState({ redirect: true})
				}
			});
		}
	} 

	render() {
		if (this.state.redirect) {
			return <Redirect to='/Login'/>
		}
		return <></>;
	}
}