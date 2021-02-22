/*
 * GET home page.
 */

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

exports.account = function(req, res){
    res.render('account');
};