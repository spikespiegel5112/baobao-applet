const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.postSignUp = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	if (password === confirmPassword) {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				return res.status(500).json({
					error: err
				})
			} else {
				User.create({
					email: email,
					password: hash
				}).then(result=>{
					res.status(200).json({
						message: 'signup success',
						body: req.body
					});
				})
			}
		})
	} else {
		res.status(400).json({
			message: '两次输入的密码不一致',
		});
	}


};

exports.getLogin = (req, res, next) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		errorMessage: message
	});
};

exports.getSignUp = (req, res, next) => {


};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({email: email})
		.then(user => {
			if (!user) {
				req.flash('error', 'Invalid email or password.');
				return res.redirect('/login');
			}
			bcrypt
				.compare(password, user.password)
				.then(doMatch => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save(err => {
							console.log(err);
							res.redirect('/');
						});
					}
					req.flash('error', 'Invalid email or password.');
					res.redirect('/login');
				})
				.catch(err => {
					console.log(err);
					res.redirect('/login');
				});
		})
		.catch(err => console.log(err));
};


exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/');
	});
};
