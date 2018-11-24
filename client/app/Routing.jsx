import React, { Component } from 'react';
import { render } from 'react-dom';
import { ListingTraduction } from "./listing/listingTraduction";
import { DisplayTraduction } from './listing/displayTraduction';
import { CreateTraduction } from "./creation/createTraduction";
import { Dashbord } from "./dashboard";
import { AdminDashbord } from './admin/dashbordAdmin';
import { Signup } from "./auth/signupPage";
import { Login } from "./auth/loginPage";
import { Logout } from "./auth/logoutPage";
import { PageNotFound } from "./pageNotFound";
import {
	Route,
	Switch,
	withRouter
} from 'react-router-dom';
import { UserContext } from "./userContext";

const Renderer = withRouter(props => props.render());

export class Routing extends Component {

	constructor(props) {
		super(props);
	}



	render () {
		return (
			<Switch>
				<Route exact path="/" component={ListingTraduction} />
				<Route exact path='/Dashbord' component={Dashbord} />

				<Route exact path="/List" render={props => <ListingTraduction {...props} />}/>
				<Route exact path="/List/User/:user" render={props => <ListingTraduction {...props} />}/>
				<Route exact path="/List/Artist/:artist" render={props => <ListingTraduction {...props} />}/>

				<Route exact path="/Create" component={CreateTraduction} />
				<Route exact path="/Show/:traduction" component={DisplayTraduction} />
				<Route exact path="/Edit/:traduction" component={CreateTraduction} />

				{this.props.isAdmin && 
					<Route
						exact
						path="/Admin"
						component={AdminDashbord}
					/>
				}

				<Route exact path="/Signup" component={Signup} />
				<Route exact
					path="/Login"
					component={(props) => 
						<Login {...props} 
							isAdmin={this.props.isAdmin} 
							setAdmin={this.props.setAdmin}
						/>
					}
				/>
				<Route exact
					path="/Logout"
					component={Logout}
				/>

				<Route component={PageNotFound}/>
			</Switch>
		);
	}
} 

Routing.contextType = UserContext;