TempUser = new Mongo.Collection("tempUser");

Meteor.methods({
	'tempUser.insertNew': (user) => {
		console.log(user)
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

		console.log(password);

		newUsers = {
			mail: user.mail,
			username: user.username,
			password: password
		}

		User.insert(newUsers);

		return true;
	}
});