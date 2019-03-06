import React, { Component } from 'react';

export function DisplayImage(props) {
	let render = <p></p>;



	if (props.link !== undefined && props.link != "") {
		const style = {
			maxHeight: "330px",
			height: props.height,
			width: props.width
		};

		render = (
			<img 
				className="rounded img-fluid"
				src={props.link}
				alt="image associé à la musique"
				style={style} 
			/>
		)
	}

	if (props.videoLink !== undefined && props.videoLink != "") {
		render = (
			<a href={props.videoLink} target='_blank'>{render}</a>
		);
	}

	return render;
}