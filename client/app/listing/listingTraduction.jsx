import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import { DisplayTraduction } from "./displayTraduction"
import { DisplayImage } from './displayImage'; 
import { RemoveTraduction } from './removeTraduction';

function ListAllTraduction(props) {
    traductions = props.traductions;

    var rendu = <div></div>;

    if (traductions){
        traductions.forEach(function (traduction) {
            if (traduction.title.length > 30){
                traduction.title = traduction.title.slice(0, 30) + "...";
            }
            if (traduction.artist.length > 30) {
                traduction.artist = traduction.artist.slice(0, 30) + "...";
            }
        });

        rendu = traductions.map(
            (traduction, index) => (
                <div className='col-12 col-lg-3 col-sm-5' key={traduction._id}> 
                    <div className="listing-item container-fluid alert alert-dark"
                        style={{color: "white !important"}}
                        id={traduction._id}>
                        <div className="col-2 pull-right p-1">
                            <RemoveTraduction traduction_id={traduction._id}
                                useIn='listingTraduction'/>
                        </div>
                        <div>
                            <div className="col-9">
                                <Link to={"/show/" + traduction._id}>
                                    <div>
                                        <div>
                                            <h3>{traduction.title}</h3>
                                            <small>
                                                <strong>Artiste : </strong> 
                                                {traduction.artist}
                                            </small>
                                        </div>
                                        <br />
                                    </div>
                                </Link>
                            </div>
                            
                        </div>
                        <div className="listing-item-image">
                            <DisplayImage link={traduction.link} height="auto" width="auto" />
                        </div>
                    </div>
               </div>
            )
        )
    }

    return rendu;
}

export class ListingTraduction extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            traductions: ""
        } 
    }

    DisplayTraduction(e) {
        var liWithKey = e.target;
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

    componentWillMount() {
        if (document.getElementById('app').style.display == 'none') {
            document.getElementById('app').style.display = 'initial';
        }

        if (this.props.match.params.user) {
            this.getTraductionByUserId(this.props.match.params.user);
        } else if (this.props.match.params.artist) {
            this.getTraductionByUserId(this.props.match.params.artist);
        } else {
			this.getAllTraduction();
        }
    }
    
    search () {
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
        Meteor.call("traduction.getByArtist", userId, (err, res) => {
            if (err){
                alert("Erreur");
            } else {
                self.setState({
					traductions: res
				});
            } 
        });
    }

    getTraductionByArtistName(userId) {
        let self = this;
        Meteor.call("traduction.getByUser", userId, (err, res) => {
            if (err) {
                alert("Erreur");
            } else {
                self.setState({
                    traductions: res
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
                    traductions: allTraduction
                });
            }
        });
    }
     
    render () {

        return (
            <div className="container-fluid col-12">
                <br/>
                <div className="card">
                    <div className="card-header text-white bg-dark">
                        <h2>Liste des musiques traduites</h2>
                        <div className="pull-right">
							{this.props.match.params.user
                            ? <Link to={'/List/'} className='btn btn-success'>
                                Toutes les traductions
                            </Link>
                            : <Link to={'/List/User/' + Meteor.userId()} className='btn btn-success'>
                                Mes Traductions
                            </Link>
                            }
                        </div>
                    </div>

                    <div className="card-body form-group">
                        <div className="col-12">
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
                                displayTraduction={this.DisplayTraduction.bind(this)}
                                traductions={this.state.traductions} />
                        </div>
                    </div>
        
                </div>
            </div>
        )
    }
}