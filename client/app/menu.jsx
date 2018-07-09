import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import { ListingTraduction } from "./listing/listingTraduction";
import { DisplayTraduction } from './listing/displayTraduction';
import { CreateTraduction } from "./creation/createTraduction";
import { Dashbord } from "./dashboard";
// import { LoginPage } from "./auth/login"; 
import { Signup } from "./auth/signupPage";
import { Login } from "./auth/loginPage";

import "./css/slider";

function Actions() {

    const actions = [
        {
            text: "Liste des musiques traduites",
            idAction: 1,
            url: "/List",
            icon: "fa fa-music"
        },
        {
            text: "Créer une nouvelle traduction",
            idAction: 2,
            url: "/Create"
        }
    ];
    
    const htmlActions = actions.map( (object) => 
        <div key={object.idAction}>
            <li
            className='nav-item'
            id={object.idAction}>

                <Link to={object.url} className="menu-item">
                    <p className='nav-link'>
                        <span>
                            {object.text}
                        </span>
                    </p>
                </Link>

            </li>
        </div>
        
    );

    return (
        <div className='col-12'>
            <Router>
                <div className='row'>

                    <div className='col-2'>
                        <div className="menu">
                            <ul className='nav flex-column'>
                                {htmlActions}
                            </ul>
                       </div>
                    </div>


                    <div className='col-10'>
                        <Route exact path="/" component={ListingTraduction}/>
                        <Route path='/Dashbord' component={Dashbord}/>   
                        <Route path="/List" component={ListingTraduction} />
                        <Route path="/Create" component={CreateTraduction} />
                        <Route path="/show/:traduction" component={DisplayTraduction}/>
                        <Route path="/edit/:traduction" component={CreateTraduction}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Signup" component={Signup}/>
                    </div>
                </div>
            </Router>
        </div>
        
    )
}

export class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div>
               <div className=''>
                    <Actions />
               </div>
           </div>
        );
    }
}