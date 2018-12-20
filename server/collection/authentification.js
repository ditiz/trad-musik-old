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
		if (user.mail == "") {
			throw new Meteor.Error(200, "Aucune adresse mail donné");
		} else if (user.password == "") {
			throw new Meteor.Error(200, "Aucun mot de passe donné");
		} else if (user.username == "") {
			throw new Meteor.Error(200, "Aucun nom utilisateur donné");
		}
		
		//Test if the mail already exist
		checkUserExist(user);
		
		newUser = {
			email: 		user.mail,
			username: 	user.username,
			password: 	user.password
		}
		
		Accounts.createUser(newUser);

		return true;
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

Accounts.validateLoginAttempt((options) => {

	// Check if user use correct email and password 
	if (!options.allowed) {
		return false;
	}

	// Check if email is verified
	let user = options.user;

	for (let email in user.email ) {
		if (email.verified === true) {
			return true;
		}
	}

	let errorMessage = "Vous devez vérifier votre email avant de vous connecter";
	throw new Meteor.Error(200, errorMessage);
});