import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Menu } from "./app/menu";

Meteor.startup(() => {
  render(<Menu />, document.getElementById("app"));
});
