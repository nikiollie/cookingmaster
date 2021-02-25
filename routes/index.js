/*
 * GET home page.
 */
var data = require('../data.json');
exports.view = function(req, res){
	console.log(data);
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

