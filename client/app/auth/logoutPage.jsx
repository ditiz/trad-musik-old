import React, { Component } from 'react';
import {
	Redirect
} from 'react-router-dom';
import * as Cookies from "js-cookie";


export class Logout extends Component {

	constructor(props) {
		super(props);
	}

	
	componentWillMount() {
		Meteor.logout(e => {
			Bert.alert('Déconnexion', 'success', 'growl-top-right');
		})
	}

	render() {
		return(<Redirect to='/Login'/>);
	}
}