import React, { Component } from "react";
import styled from "styled-components";

export function DisplayImage(props) {
  let render = <p />;

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
    );
  }

  if (props.videoLink !== undefined && props.videoLink != "") {
    const Video = styled.img`
      position: absolute;
      height: auto;
      max-height: 330px;
      max-width: 160px;
      margin-top: auto;
      margin-bottom: auto;
      top: 0;
      bottom: 0;
      opacity: 0;
      transition: 0.1s;
      &:hover {
        opacity: 1;
      }
    `;

    render = (
      <a href={props.videoLink} target="_blank">
        <Video src="/img/playIcon.png" />
        {render}
      </a>
    );
  }

  return render;
}
