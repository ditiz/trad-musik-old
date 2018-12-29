import React, { Component } from 'react'

export class ResetPassword extends Component {

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
		console.log("pouet");
	}

	render() {
		return (
			<div className="container">
				<div className="card card-header bg-dark text-white">
					head
				</div>

				<div className="card card-body">
					body
				</div>
			</div>
		)
	}
}