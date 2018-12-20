import { SimpleSchema, attachSchema } from 'meteor/aldeed:simple-schema';

Traduction = new Mongo.Collection("traduction");

Traduction.traductionSchema = new SimpleSchema({
    artist: { type: String },
    title: { type: String },
    link: { type: String },
    origin: { type: String },
    traduction: { type: String },
    user: { type: String }
});

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
        if (Meteor.isServer) {
            if (traduction.title == "") {
                throw new Meteor.Error(200, "Titre vide");
            } else if (traduction.origin == "") {
                throw new Meteor.Error(200, "Text original vide");
            } else if (traduction.traduction == "") {
                throw new Meteor.Error(200, "Aucune traduction donné");
            } else if (traduction.user == "") {
                throw new Meteor.Error(200, "Vous n'êtes pas connecté");
            }

                        
            let user = Meteor.users.findOne({ _id: traduction.user });
            let traductionInDB = Traduction.findOne({ 
                title: traduction.title, 
                artist: traduction.artist,
                user: Meteor.userId()
            });

            if (typeof user != 'undefined' 
            && typeof traductionInDB != 'undefined'
            && Meteor.userId() == traductionInDB.user) {

                let updateTraduction = {};
                if (traductionInDB.origin != traduction.origin) {
                    updateTraduction.origin = traduction.origin;
                } 
                if (traductionInDB.traduction != traduction.traduction) {
                    updateTraduction.traduction = traduction.traduction;
                }
                
                if (updateTraduction.traduction || updateTraduction.origin) {
                    Traduction.update(
                        { _id: traductionInDB._id },
                        { $set: updateTraduction },
                        { upsert: false }
                    );
                }

                return {status: 'updated'};
            } else if (typeof user != 'undefined' ) {
                Insert = {
                    artist: traduction.artist,
                    title: traduction.title,
                    link: traduction.link,
                    origin: traduction.origin,
                    traduction: traduction.traduction,
                    user: user._id
                };

                Traduction.insert(Insert);
                
                return { status: 'created' };
            } else {
                throw new Meteor.Error(200, "Vous n'êtes pas connecté");
            }
        }
    }
});

Meteor.methods({
    'traduction.updateOne': function (traduction) {
        if (traduction.title == "") {
            throw new Meteor.Error(200, "Titre vide");
        } else if (traduction.origin == "") {
            throw new Meteor.Error(200, "Text original vide");
        } else if (traduction.traduction) {
            throw new Meteor.Error(200, "Aucune traduction donné");
        } else if (!Traduction.findOne({ _id: traduction._id })){
            throw new Meteor.Error(200, "La traduction a mettre a jour n'a pas été trouvé");
        }

        let user = Meteor.users.findOne({ _id: traduction.user });

        if (typeof user === undefined) {
            new Meteor.Error(200, "Vous n'êtes pas connecté");
        } else if (traduction.user == Meteor.userId()) {
            Traduction.update(
                { _id: traduction._id},
                {
                    title: traduction.title,
                    artist: traduction.artist,
                    origin: traduction.origin,
                    traduction: traduction.traduction,
                    link: traduction.link,
                    user: traduction.user
                },
                {upsert: false}
            );
        }
    }
});

Meteor.methods({
    'traduction.getOne': function (traduction_id, params) {
       if (Meteor.isServer) {
           let traduction = Traduction.findOne({ _id: traduction_id });

           if (typeof traduction !== undefined) {
               if (params == null) {
                   return traduction;
               } else if (params.action = 'edit' && params.user) {
                   let user = Meteor.users.findOne({ _id: params.user });

                   if (traduction.user == user._id || user.admin == 1) {
                       return traduction;
                   }
               }
           }

           return false;
       }
    }
});

Meteor.methods({
    'traduction.getByUser': function (user_id) {
        if (Meteor.isServer) {
            let resTraductions = Traduction.find({ user: user_id });
            
            let traductions = [];
            resTraductions.forEach((e) => {
                traductions.push(e)
            });

            if (typeof traductions !== undefined) {
                return traductions;
            }

            return false;
        }
    }
});

Meteor.methods({
    'traduction.getByArtist': function (artistName) {
        if (Meteor.isServer) {
            let resTraductions = Traduction.find({ artist: artistName });

            let traductions = [];
            resTraductions.forEach((e) => {
                traductions.push(e)
            });

            if (typeof traductions !== undefined) {
                return traductions;
            }

            return false;
        }
    }
});

Meteor.methods({
    'traduction.canRemove': (traduction_id, user_id) => {
       if (Meteor.isServer) {
           let user = Meteor.users.findOne({ _id: user_id });
           let traduction = Traduction.findOne({ _id: traduction_id });
           
           if (typeof user == 'undefined' || typeof traduction == 'undefined') {
               return false;
           }

           if (user.admin == 1 || (traduction.user == user._id)) {
               return true;
           }

           return false;
       }
    }
});

Meteor.methods({
    'traduction.removeOne': function (traduction_id, user_id) {
        let user = Meteor.users.findOne({ _id: user_id });
        let traduction = Traduction.findOne({ _id: traduction_id });

        if (typeof user == 'undefined' || typeof traduction == 'undefined') {
            return false;
        }

        if (typeof user === undefined) {
            throw new Meteor.Error(200, "Vous n'êtes pas connecté");
        } else {
            if (user.admin == 1 || traduction.user == user._id) {
                Traduction.remove({ _id: traduction_id})
                return true;
            } else {
                throw new Meteor.Error(200, "Vous n'avez pas les droits pour réaliser cette action");
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


Meteor.methods({
    'traduction.importFromFile': function (file) {
        if (Meteor.isServer) {
            let data = JSON.parse(file);
            
            data.map((traduction) => {
                if(traduction._id) {
                    delete(traduction._id);
                }

                Traduction.insert(traduction);
            });

        }
    }
});

Meteor.methods({
    'traduction.factoryTraduction': function () {
        if (Meteor.isServer) {

            let title = "Test " + (new Date().getTime() / 1000 | 0).toString(16);;

            let origin = `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Fusce vel dolor nibh. Donec id quam tortor. 
                Phasellus at lorem in velit lobortis dapibus sed vitae nisi. 
                Suspendisse potenti. 
                Praesent euismod nunc sed metus sagittis, ut fringilla eros lobortis. 
                Phasellus in metus dui. 
                Vivamus congue dolor mi, nec tempor tortor tempor nec. 
                Maecenas sit amet finibus neque. Sed et facilisis lacus. 
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, 
                per inceptos himenaeos. 
                Vestibulum ut consequat arcu.
                Etiam interdum maximus sollicitudin.
                Mauris mattis tortor non eros dictum pharetra. 
                Nulla ipsum nulla, accumsan vitae varius in, posuere eget libero. 
                Morbi ipsum quam, varius a felis sit amet, blandit tincidunt mi. 
                Phasellus dolor sem, mollis in augue a, pellentesque ultricies massa. 
                Donec sapien ipsum, convallis ac pharetra in, mollis eget felis. 
                Donec molestie, enim nec porta gravida, arcu ligula bibendum erat, 
                id sodales ante felis eget nisl
            `;

            let traduction = `
                Nunc in mollis nibh, a elementum metus.
                Nulla ullamcorper dolor at massa fermentum vehicula.
                Nunc ullamcorper cursus tortor et finibus.
                Nam nec augue magna.
                Cras id sem dui.
                Pellentesque nec pharetra mi, egestas porta lorem.
                Pellentesque eget sem vitae risus mollis luctus.
                Nam pharetra mi quis molestie egestas.
                Etiam vitae ligula magna.Sed id pellentesque leo.
                Etiam condimentum maximus suscipit.
                Cras a turpis gravida nibh vestibulum ultricies.
                Sed scelerisque tempus arcu, in pretium elit cursus et.Aenean tincidunt arcu non ante rutrum tristique.
                Aenean pretium faucibus elementum.
                Sed malesuada, urna ut finibus pulvinar, urna tellus dapibus libero, vel sagittis ex risus eget velit.
                In hac habitasse platea dictumst.
                Aliquam porta volutpat auctor.
                Etiam interdum nisl est, eu semper arcu eleifend vel.
                Vestibulum feugiat tortor ligula, at ultrices sapien malesuada quis.
                Vestibulum non dui ac sem lacinia hendrerit.
            `;

            Traduction.insert({
                title: title,
                artist: 'admin',
                origin: origin,
                traduction: traduction,
                link: 'https://insurancemarket.ng/images/thumbnails/649/220/detailed/3/26e178f.png',
                user: Meteor.userId()
            });

            return title;
        } 
    } 
});