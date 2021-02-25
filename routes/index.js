/*
 * GET home page.
 */
var data = require('../data.json');
exports.view = function(req, res){
	console.log(data);
}
exports.login = function(req, res){
    res.render('login');
};

exports.forgotpassword = function(req, res){
    res.render('forgot');
};

exports.createaccount = function(req, res){
    res.render('create');
};

exports.index = function(req, res){
    res.render('index');
};

exports.newrecipe = function(req, res){
    res.render('newrecipe');
};

exports.savedrecipes = function(req, res){
    res.render('savedrecipes');
};


exports.recipe = function(req, res){
    res.render('recipe');
};

exports.account = function(req, res){
    res.render('account');
};

