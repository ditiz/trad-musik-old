import React, { Component } from 'react';

export function DisplayImage(props) {
	console.log(props)
	if (props.link !== undefined && props.link != "") {
		return (<img className="rounded img-fluid"
			src={props.link}
			alt="image associé à la musique"
			style={{ 
				maxHeight: "60vh",
				height: props.height,
				width: props.width
			}} />)
	} else {
		return (<p></p>);
	}
}