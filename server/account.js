Accounts.validateLoginAttempt((options) => {

	// Check if user use correct email and password 
	if (!options.allowed) {
		return false;
	}

	// Check if email is verified
	let user = options.user;

	for (let email of user.emails) {
		if (email.verified === true) {
			return true;
		}
	}

	console.log(options.user);

	// Throw error message if email isn't verified
	throw new Meteor.Error(200, "emailNotVerify",  options.user._id);
	
});