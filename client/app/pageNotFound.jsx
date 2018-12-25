import React, { Component } from 'react';
import { render } from 'react-dom';

export class PageNotFound extends Component {

	render() {
		return (
			<div className="infoPage notFound">
				<div>
					<h1>404</h1>
					<hr />
					<div>La page a laquelle vous essayer d'accéder n'existe pas</div>
				</div>
			</div>
		);
	}
}