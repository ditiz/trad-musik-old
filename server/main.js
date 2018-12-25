import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	// Setup SMTP
	let username = 'mail.smarzyk';
	let password = 'jcxwvbPvaAL62A&4o%8#U%@';
	let server = 'smtp.gmail.com';
	let port = '465';

	// Email server adress
	process.env.MAIL_URL = 'smtps://' +
		encodeURIComponent(username) + ':' +
		encodeURIComponent(password) + '@' +
		encodeURIComponent(server) + ':' + port;

	// Edit email verification
	customVerificationEmail();
	
	// Activate verification email
	Accounts.config({
		sendVerificationEmail: true
	});

	// Custom verify email url
	Accounts.urls.verifyEmail = function(token) {
		return Meteor.absoluteUrl("verify-email?token=" + token);
	};
});


function customVerificationEmail () {
	Accounts.emailTemplates.verifyEmail.from = () => {
		return 'Traduction-musik';
	};

	Accounts.emailTemplates.verifyEmail.subject = (user) => {
		return 'Vérification de votre adresse email';
	};

	Accounts.emailTemplates.verifyEmail.text = (user, url) => {
		return 'Cliquer sur le lien suivant pour activité votre compte: ' + url;
	};
}