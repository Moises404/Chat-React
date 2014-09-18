/////////////////////
// ROOT CONTROLLER //
/////////////////////

exports.index = function (req, res) {
	console.log('Redirecting -> RootController.index');
	res.redirect('/index.html');
};

exports.bot = function (req, res) {
	console.log('Redirecting -> RootController.index');
	res.redirect('/bot.html');
};