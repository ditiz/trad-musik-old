import React, { Component } from 'react';
import { render } from 'react-dom';
import {
	Link
} from 'react-router-dom';
import * as Cookies from "js-cookie";


export class IsLoggin extends Component {
	constructor (props) {
		super(props);
	}

	componentWillMount () {
		if (!Cookies.get("user"))  {
			document.location.href = '/Login';
			Bert.alert(
				"Vous n'êtes pas connecté",
				"danger",
				'growl-top-right'
			);
		} else {
			Meteor.call('user.isUser', Cookies.get("user"), (err, res) => {
				if (!res) {
					Bert.alert(
						"Vous n'êtes pas connecté",
						"danger",
						'growl-top-right'
					);
					document.location.href = '/Login';
				}
			});
		}
	} 

	render() {
		return <></>;
	}
}