import React, { Component } from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link, NavLink
} from 'react-router-dom'

import { BlockStyleTraduction } from './blockStyleTraduction';
import { ListStyleTraduction } from './ListStyleTraduction' 

export function ListAllTraduction(props) {
	let traductions = props.traductions;
	let listingStyle = props.listingStyle;
	let rendu = <div></div>;

	if (traductions) {
		traductions.forEach(function (traduction) {
			if (traduction.title.length > 30) {
				traduction.title = traduction.title.slice(0, 30) + "...";
			}
			if (traduction.artist.length > 30) {
				traduction.artist = traduction.artist.slice(0, 30) + "...";
			}
		});

		if (listingStyle == "block") {
			rendu = traductions.map(
				(traduction) => (
					<div key={traduction._id} className="
						d-flex 
						col-xs-12 col-sm-12 col-md-6 col-lg-3
						p-2 
						justify-content-around
					">
						<BlockStyleTraduction
							traduction={traduction}
						/>
					</div>
				)
			)
		} else if (listingStyle == "list") {
			let list = traductions.map(
				(traduction) => (
					<li key={traduction._id} className="col-12">
						<ListStyleTraduction
							traduction={traduction}
						/>
					</li>
				)
			)

			rendu = <ul className="col-12">{list}</ul>
		}
	}

	return rendu;
}
