Traduction = new Mongo.Collection("traduction");

Meteor.methods({
    'traduction.getAll': function () {
        const QueryAllTraduction = Traduction.find({});
        const allTraduction = [];
        QueryAllTraduction.forEach(function(e) {
            allTraduction.push(e)
        });
        return allTraduction;
    }
});


Meteor.methods({
    'traduction.insertNew': function (traduction) {

        if (traduction.title == ""){
            new Meteor.Error(200, "Titre vide");
        } else if (traduction.origin == "") {
            new Meteor.Error(200, "Text original vide");
        } else if(traduction.traduction){
            new Meteor.Error(200, "Aucune traduction donné");
        } else if (traduction.user == "") {
            new Meteor.Error(200, "Vous n'êtes pas connecté");
        }

        let user = User.findOne({ token: traduction.user });

        if (typeof user != 'undefined') {
            Insert = {
                artist: traduction.artist,
                title: traduction.title,
                link: traduction.link,
                origin: traduction.origin,
                traduction: traduction.traduction,
                user: user._id
            }

            Traduction.insert(Insert);
        }else{
            new Meteor.Error(200, "Vous n'êtes pas connecté");
        }

    }
});

Meteor.methods({
    'traduction.updateOne': function (traduction) {
        if (traduction.title == "") {
            new Meteor.Error(200, "Titre vide");
        } else if (traduction.origin == "") {
            new Meteor.Error(200, "Text original vide");
        } else if (traduction.traduction) {
            new Meteor.Error(200, "Aucune traduction donné");
        } else if (!Traduction.findOne({ _id: traduction._id })){
            new Meteor.Error(200, "La traduction a mettre a jour n'a pas été trouvé");
        }

        let user = User.findOne({ token: traduction.user });

        if (typeof user === undefined) {
            new Meteor.Error(200, "Vous n'êtes pas connecté");
        } else {
            Traduction.update(
                { _id: traduction._id},
                {
                    title: traduction.title,
                    artist: traduction.artist,
                    origin: traduction.origin,
                    traduction: traduction.traduction,
                    link: traduction.link
                },
                {upsert: false}
            );
        }
    }
});

Meteor.methods({
    'traduction.getOne': function (traduction_id, params) {
        let traduction = Traduction.findOne({ _id: traduction_id });

        if (params == null) {
            return traduction;
        } else if (params.action = 'edit' && params.user) {
            let user = User.findOne({token: params.user});
            
            if (traduction.user == user._id) {
                return traduction;
            }
        }

        return false;
    }
});

Meteor.methods({
    'traduction.canRemove': function (traduction_id, user_token) {
        let user = User.findOne({ token: user_token });
        let traduction = Traduction.findOne({ _id: traduction_id });

        if (typeof user !== undefined) {
            if (user.admin == 1 || traduction.user == user._id) {
                return true; 
            } else {
                return false;
            }
        }
    }
});

Meteor.methods({
    'traduction.removeOne': function (traduction_id, user_token) {

        let user = User.findOne({ token: user_token });
        let traduction = Traduction.findOne({ _id: traduction_id });

        if (typeof user === undefined) {
            new Meteor.Error(200, "Vous n'êtes pas connecté");
        } else {
            if (user.admin == 1 || traduction.user == user._id) {
                Traduction.remove({ _id: traduction_id})
                return true;
            } else {
                new Meteor.Error(200, "Vous n'avez pas les droits pour réaliser cette action");
                return false;
            }
        }

    } 
});

Meteor.methods({
    'traduction.count': function (traduction_id) {
        return Traduction.find({}).count();
    }
});

Meteor.methods({
    'traduction.searchTraduction': function (search) {
        const queryTraductions = Traduction.find({ 
            $or: [
                {
                    "title": {
                        $regex: new RegExp("^" + ".*" + search + ".*", "i")
                    } 
                }, 
                {
                    "artist": {
                        $regex: new RegExp("^" + ".*" + search + ".*", "i")
                    }
                }
            ]
        });
        const traductions = [];

        queryTraductions.forEach(function (e) {
            traductions.push(e)
        });

        return traductions;
    } 
});
