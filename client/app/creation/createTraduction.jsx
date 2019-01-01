import React, { Component } from 'react';
import { IsNotChrome } from "./IsNotChrome";
import { IsLoggin } from '../auth/isLoggin';
import { Redirect } from 'react-router-dom';

export class CreateTraduction extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            _id:               '',
            title:             '',
            artist:            '',
            link:              '',
            origin:            '',
            displayOrigin:     '',
            traduction:        '',
            displayTraduction: '',
            action:            'create',
            user:              '',
            redirect:          '',
        };

        this.changeTitle        = this.changeTitle.bind(this);
        this.changeArtist       = this.changeArtist.bind(this);
        this.changeLink         = this.changeLink.bind(this);
        this.useTextArea        = this.useTextArea.bind(this);
        this.handleSubmit       = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        if (this.props.match.params.traduction) {
            Meteor.call("traduction.getOne", this.props.match.params.traduction, 
                { user: Meteor.userId(), action : "edit"}, 
                function (err, res) {

                if (err || !res) {
                    Bert.alert("La traduction n'a pas pu être récupéré", "danger")
                } else {
                    let arrayOrigin = res.origin.split("\n");
                    arrayOrigin = arrayOrigin.filter((text) => text != "");
                    let origin = arrayOrigin.map((text, index) =>
                        <div onMouseOver={this.hoverOrigin}
                            onMouseLeave={this.leave}
                            data-number={index}
                            id={"origin_" + index}
                            key={"origin_" + index}>
                            {text}
                        </div>
                    );

                    let arrayTraduction = res.traduction.split("\n");
                    arrayTraduction = arrayTraduction.filter((text) => text != "");
                    let traduction = arrayTraduction.map((text, index) =>
                        <div onMouseOver={this.hoverTraduction}
                            onMouseLeave={this.leave}
                            data-number={index}
                            id={"traduction_" + index}
                            key={"traduction_" + index}>
                            <span>{text}</span>
                            <br/>
                        </div>
                    );

                    this.setState({
                        _id:               res._id,
                        title:             res.title,
                        artist:            res.artist,
                        link:              res.link, 
                        displayOrigin:     origin,
                        displayTraduction: traduction,
                        origin:            res.origin,
                        traduction:        res.traduction,
                        action:            "update"
                    });
                }
            }.bind(this));
        }        
    }

    componentDidMount() {
        console.clear();
        //Undisplay error 
        console.error = (function () {
            var error = console.error;

            return function (exception) {
                if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
                    error.apply(console, arguments)
                }
            }
        })();

        //add user id
        this.setState({user: Meteor.userId()});
    }


    handleSubmit = () => { 
        if (!localStorage.parallelHightlight || localStorage.parallelHightlight == 0) {

            let strOrigin = document.getElementById('origin').innerHTML ||
                document.getElementById('origin').textContent;
            let strTraduction = document.getElementById('traduction').innerHTML ||
                document.getElementById('traduction').textContent;

            strOrigin = strOrigin.replace(/<\/div>/g, '<br>');
            strOrigin = strOrigin.replace(/<div>/g, '<br>');

            strTraduction = strTraduction.replace(/\/div><div>/g, '<br>');

            let arrayStrOrigin = strOrigin.split('<br>');
            let arrayStrTraduction = strTraduction.split('<br>');

            let origin = '';
            let traduction = '';

            arrayStrOrigin = arrayStrOrigin.filter((element) => {
                if (element != '') {
                    return element;
                }
            });

            arrayStrTraduction = arrayStrOrigin.filter((element) => {
                if (element != '') {
                    return element;
                }
            });

            arrayStrOrigin.forEach(element => {
                origin += element + '\n';
            });

            arrayStrTraduction.forEach(element => {
                traduction += element + '\n';
            });

            this.state.origin = origin;
            this.state.traduction = traduction;
        }

        switch (this.state.action) {
            case 'create':
                this.state.user = Meteor.userId();

                Meteor.call('traduction.insertNew', this.state, function (err, result) {
                    if (err) {
                        Bert.alert(
                           err.reason,
                            "danger",
                            'growl-top-right'
                        );
                    } else if (result.status == 'created'){
                        Bert.alert('La traduction a été enregisté', 'success', 'growl-top-right');
                    } else if (result.status == 'updated') {
                        Bert.alert('La traduction a été mise à jour', 'success', 'growl-top-right');
                    }
                });

                break;
            case 'update':
                let traduction = {
                    traduction_id: this.state._id,
                    title: this.state.title,
                    artist: this.state.artist,
                    origin: this.state.origin,
                    traduction: this.state.traduction,
                    user_id: this.state.user,
                    link: this.state.link
                };

                Meteor.call('traduction.updateOne', traduction, (err, result) => {
                    if (err) {
                        Bert.alert("Erreur : " + err.reason, 'danger', 'growl-top-right');
                    } else {
                        Bert.alert('La traduction a été mise a jour', 'success', 'growl-top-right');
                        this.setState({
                            redirect: '/Show/' + this.state._id
                        })
                    }
                });
                break;
            default:
                Bert.alert("Erreur, veuillez contacter un administrateur", "danger");
                break;
        }
    }

    changeTitle(e) {
        this.setState({ title: e.target.value });
    }

    changeArtist(e) {
        this.setState({ artist: e.target.value });
    }

    changeLink(e) {
        this.setState({ link: e.target.value });
    }

    useTextArea(side, other) {

        if (!localStorage.parallelHightlight || localStorage.parallelHightlight == 0) {
            return false;
        }

        let colorPassive = "#000";
        let colorActive = "DarkGray";
        
        //Get element
        let node = document.getSelection().anchorNode;
        let text = '';

        //Get the div parent
        while (node.nodeName != "DIV") {
            node = node.parentNode;
        }

        //Remove css 
        let divNode = document.getElementById(side);
        
        divNode.childNodes.forEach((element) => {
            if (element) {
                if (element.style === undefined) {
                    let newDiv = document.createElement("div");
                    let textDiv = document.createTextNode(element.textContent);

                    newDiv.appendChild(textDiv);
                    newDiv.style.color = '';

                    divNode.removeChild(element);
                    divNode.insertBefore(newDiv, divNode.children[0]);

                } else {
                    element.style.color = '';
                }
                text += element.textContent + '\n';
            }
        });
        
        
        //Set data to save
        this.setState({ [side]: text });

        //Set color
        document.getElementById(side).style.color = colorActive;
        node.style.color = colorPassive;
 

        ////////////////////
        ///// Parallel /////
        ////////////////////

    
        //Index of childNode
        let nodeToCount = node;
        let nbChild = 0;
        while ((nodeToCount = nodeToCount.previousSibling) != null)
            nbChild++;

        //Color the parallel line
        let parallelNode = document.getElementById(other).childNodes[nbChild];

        if (parallelNode) {
            if (parallelNode.style === undefined) {
                let newDiv = document.createElement("div");
                let textDiv = document.createTextNode(parallelNode);

                newDiv.appendChild(textDiv);
                parallelNode = newDiv;
            }
            //Remove css 
            divNode = document.getElementById(other);

            divNode.childNodes.forEach(function (element) {
                if (element) {
                    if (element.style === undefined) {
                        let newDiv = document.createElement("div");
                        let textDiv = document.createTextNode(element);

                        newDiv.appendChild(textDiv);
                        element = newDiv;
                    }
                    element.style.color = '';
                    text += element.textContent + '\n';
                }
            });

            //Set color
            document.getElementById(other).style.color = colorActive;
            parallelNode.style.color = colorPassive;
        }
       
    }

    pasteAction(e, side, other) {  
        if (!localStorage.parallelHightlight || localStorage.parallelHightlight == 0) {
            return false;
        }

        let clipbordContent = "";
        if (clipbordContent = e.clipboardData.getData("text")) {
            let base = document.getElementById(side);
            let ArrayContent = [];

            e.preventDefault()

            ArrayContent = clipbordContent.split("\n");

            //uniquement sous chrome
            if (!!window.chrome && !!window.chrome.webstore) {
                ArrayContent.map(
                    element => {
                        let newDiv = document.createElement("div");
                        let textDiv = document.createTextNode(element);

                        newDiv.appendChild(textDiv);
                        base.appendChild(newDiv);
                    }
                )
            }else{
                ArrayContent.map( element =>
                    base.innerHTML += element + '<br>'
                )
            }
        }
        this.useTextArea(side, other);
    }

    loseFocus() {
        if (!!window.chrome && !!window.chrome.webstore) {
            var areaTexts = [
                document.getElementById("origin"),
                document.getElementById("traduction")
            ];

            areaTexts.forEach(function (divNode) {
                divNode.childNodes.forEach(function (element) {
                    if (element) {
                        if (element.style === undefined) {
                            let newDiv = document.createElement("div");
                            let textDiv = document.createTextNode(element);

                            newDiv.appendChild(textDiv);
                            element = newDiv;
                        }
                        element.style.color = '#000';
                    }
                });
            });
        }
    }

    render() {
        if (this.state.redirect != '') {
            <Redirect to={this.state.redirect}/>
        }

        return ( 
            <div className="container-fluid col-12">
                <IsLoggin/>    
                <br/>
                <div className="card">
                    <form className="form-group">
                        <div className="card-header bg-dark text-white">
                            <h2>Créer une nouvelle traduction</h2>
                        </div>

                        <div className="card-body">
                            <div className="container">
                                <div className="container row">
                                    <div className='col-6 form-group'>
                                        <label htmlFor="title">Titre</label>
                                        <input type="text"
                                            name="title"
                                            id="title"
                                            className='form-control'
                                            onChange={this.changeTitle}
                                            value={this.state.title} />
                                    </div>

                                    <div className='col-6 form-group'>
                                        <label htmlFor="artist">Artiste</label>
                                        <input type="text"
                                            name="artist"
                                            id="artist"
                                            className='form-control'
                                            onChange={this.changeArtist}
                                            value={this.state.artist} />
                                    </div>
                                </div>

                                <div className="container row">
                                    <div className='col-12 form-group'>
                                        <label htmlFor="link">Lien vers l'image</label>
                                        <input type="text"
                                            name="link"
                                            id="link"
                                            className='form-control'
                                            onChange={this.changeLink}
                                            value={this.state.link} />
                                    </div>
                                </div>

                                <IsNotChrome/>

                                <div className='container row'>
                                    <div className='form-group col-6'>
                                        <label htmlFor="origin">Texte Original</label>
                                        <div className='card'>
                                            <div id="origin"
                                                className='card-body'
                                                contentEditable="true"
                                                onKeyUp={
                                                    () => this.useTextArea("origin", "traduction")
                                                }
                                                onClick={
                                                    () => this.useTextArea("origin", "traduction")
                                                }
                                                onPasteCapture={
                                                    (e) => this.pasteAction(e, "origin", "traduction")
                                                }
                                                onBlur={this.loseFocus}
                                                style={{ height: "auto", minHeight: '100px' }}>
                                                {this.state.displayOrigin}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-group col-6'>
                                        <label htmlFor="traduction">Texte Traduit</label>
                                        <div className='card'>
                                            <div id="traduction"
                                                className='card-body'
                                                contentEditable="true"
                                                onKeyUp={
                                                    () => this.useTextArea("traduction", "origin")
                                                }
                                                onClick={
                                                    () => this.useTextArea("traduction", "origin")
                                                }
                                                onPaste={
                                                    (e) => this.pasteAction(e, "traduction", "origin")
                                                }
                                                onBlur={this.loseFocus}
                                                style={{ height: "auto", minHeight: '100px' }}>
                                                {this.state.displayTraduction}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br />

                                <input className='btn btn-success container col-4'
                                    type="button"
                                    onClick={this.handleSubmit}
                                    value="Enregistrer la traduction" />
                                <br />
                            </div>

                        </div>
                    </form>
                </div> 
            </div>
        );
    }
}