import React, { Component } from 'react';
import {
	Redirect
} from 'react-router-dom';
import * as Cookies from "js-cookie";


export class Logout extends Component {

	constructor(props) {
		super(props);

		this.state = {
			redirect: false
		}
	}

	
	componentWillMount() {
		let self = this;
		let user_id = Meteor.userId();

		Meteor.logout((err) => {
			if (!err) {
				if (user_id) {
					Bert.alert('Déconnexion', 'success', 'growl-top-right');
				}
				self.setState({
					redirect: true
				})
			}
		})
	}

	render() {
		if (this.state.redirect) {
			return(<Redirect to='/Login'/>);
		}
		return(<></>);
	}
}