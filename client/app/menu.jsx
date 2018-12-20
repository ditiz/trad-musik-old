import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
} from 'react-router-dom'


import { Routing } from "./Routing";
import { MenuItem } from "./menu-item";
import { UserContext } from "./userContext";

import "./css/slider";

export class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: Meteor.userId(),
            isAdmin: false,
            setAdmin: (status) => {
                this.setState({ isAdmin: status })
            }
        };
    }

    componentDidMount() {
        Meteor.call('user.isAdmin', Meteor.userId(), (err, res) => {
            if (err) {
                alert("error");
            } else {
                this.setState({ isAdmin: res });
            }
        });
    }

    render() {
        return (
           <div>
               <div>
                    <div className='col-12'>
                        <UserContext.Provider value={this.state}>
                            <Router>
                                <div className='row'>

                                    <div>
                                        <div className="menu">
                                            <ul className='nav flex-column'>
                                                <MenuItem isAdmin={this.state.isAdmin}/>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='content col-10'>
                                        <Routing
                                            isAdmin={this.state.isAdmin}
                                            setAdmin={this.state.setAdmin}
                                        />
                                    </div>
                                </div>
                            </Router>
                        </UserContext.Provider>
                    </div>
               </div>
           </div>
        );
    }
}