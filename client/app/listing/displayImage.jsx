import React, { Component } from 'react';

export function DisplayImage(props) {
	let render = <p></p>;



	if (props.link !== undefined && props.link != "") {
		const styleImg = {
			maxHeight: "330px",
			height: props.height,
			width: props.width
		};

		render = (
			<img 
				className="rounded img-fluid"
				src={props.link}
				alt="image associé à la musique"
				style={styleImg} 
			/>
		)
	}

	if (props.videoLink !== undefined && props.videoLink != "") {
		const styleVideo = {
			position: 'absolute',
			height: 'auto',
			width: props.width,
			maxHeight: "330px",
			maxWidth: '160px',
			marginTop: 'auto',
			marginBottom: 'auto',
			top: 0,
			bottom: 0,
			display: 'block',
			'&:hover': {
				display: "",
			}
		}

		render = (
			<a href={props.videoLink} target='_blank'>
				<img style={styleVideo} src='/img/playIcon.png'/>
				{render}
			</a>
		);
	}

	return render;
}