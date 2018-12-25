import { Accounts } from 'meteor/accounts-base';

import { Random }  from 'meteor/random';

checkUserExist = (user) => {
	let userEmailExist = false;
	let usernameExist = false;

	userEmailExist = Accounts.findUserByEmail(user.mail);
	usernameExist = Accounts.findUserByUsername(user.username)

	if (userEmailExist) {
		throw new Meteor.Error(200, "Email d'utilisateur déjà utilisé");
	} else if (usernameExist) {
		throw new Meteor.Error(200, "Nom d'utilisateur déjà utilisé");
	}
};

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
		// Check user params
		if (user.mail == "") {
			throw new Meteor.Error(200, "Aucune adresse mail donné");
		} else if (user.password == "") {
			throw new Meteor.Error(200, "Aucun mot de passe donné");
		} else if (user.username == "") {
			throw new Meteor.Error(200, "Aucun nom utilisateur donné");
		}
		
		//Test if the mail already exist
		checkUserExist(user);
		
		// User params
		newUser = {
			email: 		user.mail,
			username: 	user.username,
			password: 	user.password
		}
		
		// Create user
		let userId = Accounts.createUser(newUser);

		// Verify mail adress
		Accounts.sendVerificationEmail(userId);		

		return userId;
	}
});

Meteor.methods({
	'user.isUser': (user_id) => {
		user = Meteor.users.findOne({ _id: user_id });



		if (typeof user !== 'undefined') {
			if (user) {
				return true
			} 
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

Meteor.methods({
	'user.verificationEmail': (token) => {
		let user = Meteor.users.findOne({ "services.email.verificationTokens.token": token });

		if (user !== undefined) {
			// update only the first mail, use $[] and arrayFilter mangodb don't work 
			Meteor.users.update(
				{ _id: user._id },
				{ $set : { "emails.0.verified": true } }
			);

			if (user.emails[0].verified === false) {
				return true;
			} else if (user.emails[0].verified == true) {
				return "already verified";
			}
		}

		return false;
		
	}
});

Meteor.methods({
	'user.sendVerificationEmail': (userId) => {
		Accounts.sendVerificationEmail(userId);
	}
});

