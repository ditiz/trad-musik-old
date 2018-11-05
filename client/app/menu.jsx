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
import { Logout } from "./auth/logoutPage";

import "./css/slider";

function Actions() {

    const actions = [
        {
            text: "Liste des musiques traduites",
            idAction: 1,
            url: "/List",
            icon: "/img/music-list2.png"

        },{
            text: "Créer une nouvelle traduction",
            idAction: 2,
            url: "/Create",
            icon: "/img/music-plus.png"
        },{
            text: 'Logout',
            idAction: 3,
            url: "/Logout",
            icon: "/img/logout.png",
            down: true
        }
    ];
    
    const htmlActions = actions.map( (object) => {
        if (object.down) {
            return (
                <div key={object.idAction}>
                    <li
                        className='nav-item-down'
                        id={object.idAction}>

                        <Link to={object.url} className="menu-item">
                            <p className='nav-link' title={object.text}>
                                <img src={object.icon} className="icon-menu" content={object.text} />
                            </p>
                        </Link>

                    </li>
                </div>
            );
        } else {
            return (
                <div key={object.idAction}>
                    <li className='nav-item' id={object.idAction}>
                        <Link to={object.url} className="menu-item">
                            <p className='nav-link' title={object.text}>
                                <img src={object.icon} 
                                    className="icon-menu" 
                                    alt={object.text} 
                                    title={object.text}/>
                            </p>
                        </Link>
                    </li>
                </div>
            );
        }
    }
       
        
    );

    return (
        <div className='col-12'>
            <Router>
                <div className='row'>

                    <div className=''>
                        <div className="menu">
                            <ul className='nav flex-column'>
                                {htmlActions}
                            </ul>
                       </div>
                    </div>


                    <div className='content col-10'>
                        <Route exact path="/" component={ListingTraduction}/>
                        <Route exact path='/Dashbord' component={Dashbord}/>   
                        <Route exact path="/List" component={ListingTraduction} />
                        <Route exact path="/List/:userId" component={ListingTraduction} />
                        <Route exact path="/Create" component={CreateTraduction} />
                        <Route exact path="/show/:traduction" component={DisplayTraduction}/>
                        <Route exact path="/edit/:traduction" component={CreateTraduction}/>
                        <Route exact path="/Login" component={Login}/>
                        <Route exact path="/Signup" component={Signup}/>
                        <Route exact path="/Logout" component={Logout}/>
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