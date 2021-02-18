/*
 * GET home page.
 */

exports.view = function(req, res){
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

