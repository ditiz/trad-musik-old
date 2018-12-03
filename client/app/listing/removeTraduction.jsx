import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	withRouter,
	Route,
	Link,
	Redirect
} from 'react-router-dom';
import * as Cookies from 'js-cookie';

export class RemoveTraduction extends Component {

	constructor(props){
		super(props);

		// TODO: ne pas afficher le bouton supprimer si pas les droits
		this.state = {
			displayRemove: false,
			displayEdit: false,
			redirect: false
		}

		if (!Meteor.userId()) {
			this.state.displayRemove = false;
		}
		
		this.removeTrad = this.removeTrad.bind(this);
	}

	componentWillMount () {
		let self = this;

		Meteor.call(
			"traduction.canRemove", 
			this.props.traduction_id,
			Meteor.userId(), 
			(err, res) => {
				if (res) {
					self.setState({
						displayRemove: true
					});
				
					if (this.props.useIn == "displayTraduction") {
						self.setState({
							displayEdit: true
						});
					}
				}
			}
		);
	}

	removeTrad(e, traduction_id) {
		let self = this;
		var elementWithKey = e.target;
		var rep = confirm("Êtes-vous sûr de vouloir supprimer cette traduction ?");

		if (rep) {
			Meteor.call("traduction.removeOne", traduction_id, Meteor.userId(), 
			function (err, res) {
				if (err) {
					Bert.alert(err.reason, "danger", 'growl-top-right');
				} else {
					if (res) {
						Bert.alert("Traduction Supprimé", 'success', 'growl-top-right');
						
						while (!elementWithKey.id) {
							elementWithKey = elementWithKey.parentNode;
						}

						elementWithKey.style.display = "none";

						if (this.props.goBack) {
							self.setState({
								redirect: true
							})
						}
						
					} else {
						Bert.alert("Vous n'avez pas les droits pour réaliser cette action", 
							'danger', 'growl-top-right');
					}
				}
			}.bind(this));
		}
	}

	render() {

		if (this.state.redirect) {
			return (<Redirect exact to='/List'/>);
		}

		return (
			<div className="btn-group" >
				{ this.state.displayEdit && 
					<div className="col-2 pull-right">
						<Link className='btn btn-secondary' to={"/edit/" + this.props.traduction_id}>
							&#9998;
						</Link> 
					</div>
				}
				{ this.state.displayRemove &&
					<div className='btn btn-danger' style={{ cursor: "pointer" }}
						onClick={(e) => this.removeTrad(e, this.props.traduction_id)}>

						<span>&times;</span>
					</div>
				}
			</div>
		)
	}
}