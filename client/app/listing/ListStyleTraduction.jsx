import React, { Component } from 'react';
import { render } from 'react-dom';
import {
	Link
} from 'react-router-dom'

import { DisplayImage } from './displayImage';
import { RemoveTraduction } from './removeTraduction';

export class ListStyleTraduction extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const traduction = this.props.traduction;
		return (
			<div 
				className="container-fluid alert alert-dark d-inline-flex"
				style={{ color: "white !important" }}
				id={traduction._id}
			>
				<div>
					<Link to={"/Show/" + traduction._id}>
						<div>
							<div>
								<h3>{traduction.title}</h3>
								<small>
									<strong>Artiste : </strong>
									{traduction.artist}
								</small>
							</div>
							<br />
						</div>
					</Link>
				</div>

				<div className="listingStyle-right d-flex justify-content-end">
					<div className="listing-image">
						<DisplayImage link={traduction.link} height="100px" width="auto"/>
					</div>

					<div className="listingStyle-remove">
						<RemoveTraduction traduction_id={traduction._id}
							useIn='listingTraduction'/>
					</div>
				</div>
			</div>
		);
	}
}