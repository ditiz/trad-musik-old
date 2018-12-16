import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link, NavLink
} from 'react-router-dom'

import { DisplayTraduction } from "./displayTraduction";
import { ListAllTraduction } from './listAllTraduction';
import { ButtonFilterTraduction } from './buttonFilterTraduction';

export class ListingTraduction extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            traductions: "",
            user: this.props.match.params.user,
            artist: this.props.match.params.artist,
            listingStyle: "block"
        };

        this.messageForNotSecure = React.createRef();
    }

    DisplayTraduction(e) {
        let liWithKey = e.target;
        while (!liWithKey.id){
            liWithKey = liWithKey.parentNode;
        }

        traduction = this.state.traductions.filter(
            (element) => element._id == liWithKey.id
        )        
        
        render(
            <DisplayTraduction traduction={traduction[0]}/>,
            document.getElementById("content")
        )
        
    }

    componentDidMount() {
        if (document.getElementById('app').style.display == 'none') {
            document.getElementById('app').style.display = 'initial';
        }

        this.setState({
            user: this.props.match.params.user,
            artist: this.props.match.params.artist,
        })

        if (this.props.match.params.user) {
            this.getTraductionByUserId(this.props.match.params.user);
        } else if (this.props.match.params.artist) {
            this.getTraductionByArtistName(this.props.match.params.artist);
        } else {
			this.getAllTraduction();
        }
    }
    
    search() {
        let search = document.getElementById("bar-search").value;
        
        Meteor.call("traduction.searchTraduction", search, (error, result) => {
            if (error) {
                alert("Erreur");
            } else {
                var allTraduction = result;
                this.setState({ traductions: allTraduction });
            }
        });
    }

    getTraductionByUserId(userId) {
        console.log(userId)
        let self = this;
        Meteor.call("traduction.getByUser", userId, (err, res) => {
            if (err){
                alert("Erreur");
            } else {
                self.setState({
                    traductions: res,
                    user: userId
				});
            } 
        });
    }

    getTraductionByArtistName(artistName) {
        let self = this;
        Meteor.call("traduction.getByArtist", artistName, (err, res) => {
            if (err) {
                alert("Erreur");
            } else {
                self.setState({
                    traductions: res,
                    artist: artistName
                });
            }
        });
    }

    getAllTraduction() {
        let self = this;
        Meteor.call("traduction.getAll", (error, result) => {
            if (error) {
                Bert.alert(
                    "Erreur, veuillez contacter un administrateur",
                    "danger",
                    'growl-top-right'
                );
            } else {
				var allTraduction = result;
                self.setState({ 
                    traductions: allTraduction,
                    user: '',
                    artist: ''
                });
            }
        });
    }

    changeStyle() {
       if (this.state.listingStyle == "block") {
           this.setState({
               listingStyle: "list"
           });
       } else {
           this.setState({
               listingStyle: "block"
           });
       }
    }

    displayMessageForNotSecure = () => {
        console.log(this.messageForNotSecure.current.classList.remove('d-none'));
    } 
     
    render () {
        return (
            <div className="container-fluid col-12">
                <br/>
                <div className="card">
                    <div className="card-header text-white bg-dark">
                        <h2>Liste des musiques traduites</h2>
                        <ButtonFilterTraduction 
                            display={this.state.listingStyle}
                            user={this.state.user}
                            artist={this.state.artist}
                            routeParams={this.props.match.params}
                            changeStyle={() => this.changeStyle()}
                            getAllTraduction={() => this.getAllTraduction()}
                            getTraductionByUserId={() => this.getTraductionByUserId(Meteor.userId())}
                        />
                    </div>

                    <div className="card-body form-group">
                        <div className="container-fluid">
                            <div className="row input-group">
                                <input type="text"
                                    id="bar-search" 
                                    onKeyUp={() => this.search()} 
                                    className="col-11 input-search">

                                </input>  
                                <div className="input-group-append">
                                    <button className="bg-success button-search">
                                       <i className="fa fa-search"></i>
                                    </button>
                                </div>  
                            </div>
                            <hr/>
                        </div>

                        <div className="row" onLoad={() => this.displayMessageForNotSecure()}>
                            <ListAllTraduction
                                listingStyle={this.state.listingStyle}
                                displayTraduction={this.DisplayTraduction.bind(this)}
                                traductions={this.state.traductions} 
                            />
                        </div>
                    </div>
                </div>

                <br/>

                <div ref={this.messageForNotSecure} className='d-none alert alert-info text-center'>
                    Le navigateur considère le site comme non sécurisé a cause 
                    des images qui ne sont pas en https
                </div>
            </div>
        )
    }
}