import React, { Component } from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

export class Test extends Component {

	componentDidMount() {
		console.log("pouet")
	}

	render() {
		return(
			<div>Halo</div>
		);
	}
}