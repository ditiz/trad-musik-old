import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import * as Cookies from 'js-cookie';

export class RemoveTraduction extends Component {

	constructor(props){
		super(props);

		// TODO: ne pas afficher le bouton supprimer si pas les droits
		this.state = {
			displayRemove: false,
			displayEdit: false
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
		var elementWithKey = e.target;
		var rep = confirm("Êtes-vous sûr de vouloir supprimer cette traduction ?");

		if (rep) {
			Meteor.call("traduction.removeOne", traduction_id, Meteor.userId(), 
			function (err, res) {
				// console.clear();
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
							document.location.href = '/List';
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
		return (
			<div className="btn-group" style={{width: "300px"}}>
				{ this.state.displayEdit && 
					<div className="col-2 pull-right">
						<a className='btn btn-secondary' href={"/edit/" + this.state._id}>
							&#9998;
						</a> 
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