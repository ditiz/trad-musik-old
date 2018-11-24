import React, { Component } from 'react';
import { render } from 'react-dom';
import { UserContext } from "../userContext";

export class AdminDashbord extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isAdmin: this.props.isAdmin
		};

		this.importFile = React.createRef();
	}

	dowloadTraduction() {
		Meteor.call('traduction.getAll', (err, res) => {
			if(err) {
				alert(err);
			} else {
				let traductions = JSON.stringify(res);
				let link = document.createElement('a');
				let fileType = "data:text/plain;charset=utf-8,";
				let fileName = "traduction_" + JSON.stringify(Date.now()) + ".json"
				link.setAttribute('href', fileType + encodeURIComponent(traductions));
				link.setAttribute('download', fileName);

				link.style.display = 'none';
				document.body.appendChild(link);

				link.click();

				document.body.removeChild(link);
			}
		});
	}

	importTraduction() {
		let file = this.importFile.current.files[0];
		let reader = new FileReader();

		reader.readAsText(file);

		reader.onload = () => {
			Meteor.call('traduction.importFromFile', reader.result, (err, res) => {
				if(!err) {
					Bert.alert(
						'Fichier importer',
						'success',
						'growl-top-right');
				}
			})
		}
	} 

	render() {
		return (
			<div className="admin">
				<div className="d-flex p-2 justify-content-between">
					<h1>Page Administateur</h1>
					<UserContext.Consumer>
						{(UserContext) => (
							<div onClick={() => UserContext.setAdmin(!UserContext.isAdmin)}>
								<button className={
									UserContext.isAdmin ? "btn btn-success" : "btn-warning"
								}>
									Admin mode {UserContext.isAdmin ? "On" : "Off"}
								</button>
							</div>
						)}
					</UserContext.Consumer>
				</div>

				<br/>

				<div className="card">
					<div className="card-header">
						Récupération de données
					</div>

					<div className="card-body">
						<div className="d-flex p-2 justify-content-around">
							<button className="btn btn-dark" onClick={this.dowloadTraduction}>
								Télécharger toutes les traductions
							</button>

							<button className="btn btn-secondary" onClick={() => this.importFile.current.click()}>
								Importer des traductions
								<input
									ref={this.importFile}
									id="file-input"
									type="file"
									style={{ display: "none" }}
									onChange={() => this.importTraduction()}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}