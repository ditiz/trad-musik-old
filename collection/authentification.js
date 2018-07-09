User = new Mongo.Collection("user");

import { Random } from 'meteor/random'

Meteor.methods({
	'user.getOne': (mail, password) => {
		let user = User.findOne({ mail: mail });
		if (user && (user !== undefined)) {
			// let comparePassword = bcrypt.compareSync(password, user.password)

			if (true || comparePassword){
				let token = Random.secret() 

				User.update(
					{ _id: user._id },
					{ $set: {
							token: token,
							last_login: new Date }
					}, { upsert: false }	
				);

				delete user._id;
				delete user.password;

				user["token"] = token;
				
				return user;
				
			}else {
				console.log("wrong password")
			}
		}else{
			throw new Meteor.Error(200, "Utilisateur non trouvé");
		}

	}
});

Meteor.methods({
	'user.insertNew': (user) => {

		return "disable";

		if (user.mail == "") {
			new Meteor.Error(200, "Aucune adresse mail donné");
		} else if (user.password == "") {
			new Meteor.Error(200, "Aucun mot de passe donné");
		} else if (user.username) {
			new Meteor.Error(200, "Aucun nom utilisateur donné");
		}

		//Test if the mail already exist
		let userExist = User.find({ mail: user.mail }).count();

		if (userExist) {
			new Meteor.Error(200, "Adresse mail déjà utilisé");
		}
		
		// hash of the password
		let password = user.password;

		newUsers = {
			mail: 		user.mail,
			username: 	user.username,
			password: 	password
		}

		User.insert(newUsers);

		return true;
	}
});

Meteor.methods({
	'user.isUser': (user_token) => {
		user = User.findOne({ token: user_token });

		if (typeof user !== 'undefined') {
			return true
		} else {
			return false
		}
	}
});