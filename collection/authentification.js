import { Accounts } from 'meteor/accounts-base';

import { Random }  from 'meteor/random';

// Meteor.methods({
// 	'user.getOne': (username, password) => {
// 		if (Meteor.isServer) {
// 			return Meteor.users.find(Meteor.userId())
// 		}
// 	}
// });

Meteor.methods({
	'user.getUsername': (userId) => {
		if (Meteor.isServer) {
			let user = Meteor.users.findOne({ _id: userId });
			return user.username
		}
	}
});

Meteor.methods({
	'user.insertNew': (user) => {
		if (user.mail == "") {
			new Meteor.Error(200, "Aucune adresse mail donné");
		} else if (user.password == "") {
			new Meteor.Error(200, "Aucun mot de passe donné");
		} else if (user.username) {
			new Meteor.Error(200, "Aucun nom utilisateur donné");
		}
		
		//Test if the mail already exist
		let userEmailExist = false;
		let usernameExist = false;

		if (Meteor.isServer) {
			userEmailExist = Accounts.findUserByEmail(user.mail);
			usernameExist = Accounts.findUserByUsername(user.username)
		}

		if (userEmailExist || usernameExist) {
			new Meteor.Error(200, "Information d'utilisateur déjà utilisé");
		}
		
		// hash of the password
		let password = user.password;
		
		newUser = {
			email: 		user.mail,
			username: 	user.username,
			password: 	password
		}
		
		Accounts.createUser(newUser);

		return true;
	}
});

Meteor.methods({
	'user.isUser': (user_id) => {
		user = Meteor.users.findOne({ _id: user_id });

		if (typeof user !== 'undefined') {
			return true
		} else {
			return false
		}
	}
});

Meteor.methods({
	'user.isAdmin': (user_id) => {
		user = Meteor.users.findOne({ _id: user_id }, { admin: 1 });

		if (typeof user !== 'undefined' && user.admin) {
			return true
		} else {
			return false
		}
	}
});