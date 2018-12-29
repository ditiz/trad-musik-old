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
import { VerifiedEmail } from "./auth/verifiedEmail"
import { PageNotFound } from "./pageNotFound";
import { SignupSuccessPage } from './auth/signupSuccessPage';
import { ForgotPassword } from './auth/forgotPassword';
import { ResetPassword } from './auth/resetPassword';
import {
	Route,
	Switch,
	withRouter
} from 'react-router-dom';
import { UserContext } from "./userContext";


export class Routing extends Component {

	constructor(props) {
		super(props);
	}

	render () {
		return (
			<Switch>
				<Route exact path="/" component={ListingTraduction} />
				<Route exact path='/Dashbord' component={Dashbord} />

				<Route exact path="/List" render={props => <ListingTraduction {...props} />} />
				<Route 
					exact 
					path="/List/User/:user" 
					render={props => <ListingTraduction {...props} />}
				/>
				<Route 
					exact 
					path="/List/Artist/:artist" 
					render={props => <ListingTraduction {...props} />}
				/>

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

				<Route exact path="/verify-email" component={VerifiedEmail}/>
				<Route exact path="/Signup-success/:userId" component={SignupSuccessPage}/>
				<Route exact path="/ForgotPassword" component={ForgotPassword}/>
				<Route exact path="/Reset-password/:token" component={ResetPassword}/>

				<Route component={PageNotFound}/>
			</Switch>
		);
	}
} 

Routing.contextType = UserContext;