import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link, NavLink
} from 'react-router-dom'

import { DisplayTraduction } from "./displayTraduction"
import { ListAllTraduction } from './listAllTraduction'

export class ListingTraduction extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            traductions: "",
            user: this.props.match.params.user,
            artist: this.props.match.params.artist,
            listingStyle: "block"
        };
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

        console.log(this.props.match.params.user);
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
     
    render () {
        return (
            <div className="container-fluid col-12">
                <br/>
                <div className="card">
                    <div className="card-header text-white bg-dark">
                        <h2>Liste des musiques traduites</h2>
                        <div className="pull-right btn-group">
                            <button 
                                className="btn btn-primary"
                                onClick={() => this.changeStyle()}>
                                {this.state.listingStyle == "block" 
                                ? "Affichage liste" 
                                : "Affichage block"
                                }
                            </button>
							{this.state.user == Meteor.userId()
                                ? 
                            <div 
                                className='btn btn-success' 
                                onClick={() => this.getAllTraduction()}
                            >
                                Toutes les traductions
                            </div>
                                : 
                            <div 
                                className='btn btn-success' 
                                onClick={() => this.getTraductionByUserId(Meteor.userId())}
                            >
                                Mes Traductions
                            </div>
                            }
                        </div>
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

                        <div className="row">
                            <ListAllTraduction
                                listingStyle={this.state.listingStyle}
                                displayTraduction={this.DisplayTraduction.bind(this)}
                                traductions={this.state.traductions} />
                        </div>
                    </div>
        
                </div>
            </div>
        )
    }
}