import React, { Component } from 'react';
import { render } from 'react-dom';


export class IsNotChrome extends Component {

	constructor(){
		super();

		//cas firefox 
		if (typeof InstallTrigger !== 'undefined') {
			
		}

		//cas chrome
		else {
			if (!localStorage.parallelHightlight) {
				localStorage.setItem("parallelHightlight", 1);
			}
		}
	}

	changeParallelHightlight () {
		if (localStorage.parallelHightlight == 1) {
			this.setCheckbox();
			localStorage.setItem("parallelHightlight", 0);
		} else {
			this.setCheckbox();
			localStorage.setItem("parallelHightlight", 1);
		}
	};

	setCheckbox () {
		if( localStorage.parallelHightlight) {
			if (localStorage.parallelHightlight == 1) 
			{
				document.getElementById("checkBoxParallelHightlight").checked = true;
			} else {
				document.getElementById("checkBoxParallelHightlight").checked = false;

			}
		}
	};

	componentDidMount () {
		this.setCheckbox();
	}
	
	render () {
		//cas firefox 
		if (typeof InstallTrigger !== 'undefined') {
			return (
				<div className='container row'>
					<div className='col-12 alert alert-info'>
						À ma grande déception,
						l'outil ci-dessous ne peut
						développer son plein potentiel
						uniquement sous chrome pour l'instant,
						Firefox m'a trahi :(
                	</div>
				</div>
			);
		}
		//cas chrome
		else {
			return (
				<div className='alert alert-info form-inline parallelHightlight-parent'>
					<label className="switch">
						<input type="checkbox" id="checkBoxParallelHightlight" />
						<span className="slider round" onClick={
							() => this.changeParallelHightlight()}>
						</span>
					</label>
					<div style={{ margin: "auto" }}>Localision de texte en parallèle</div>
				</div>
			);
		}
	}
}