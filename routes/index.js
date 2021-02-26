/*
 * GET home page.
 */

var recipe_json = require('../recipe.json');


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

exports.account = function(req, res){
    res.render('account');
};

exports.findrecipe = function(req, res){ 
    var spawn = require('child_process').spawn;
    var dish = req.params.dish;
    var optional = req.params.optional;
    console.log("dish: " + dish);
    console.log("serving: " + req.params.serving);
    console.log("optional: " + optional);

    if (optional == undefined) {
        optional = "none";
        console.log("optional: " + optional);
    };

    var recipeData;

    // spawn new child process to call the python script
    const python = spawn('python', ['getrecipe.py', dish, optional]);
    // collect data from script
    python.stdout.on('data', function (data) {
        recipeData = data.toString();
        // console.log("Recipe data: " + recipeData);

        var url = "";

        if (recipeData != undefined) {
            url = recipeData;
            console.log("Scraped URL: " + url);
        }

        var recipe_data = {
            'dish': dish,
            'recipeName': '',
            'url': url,
            'optional': optional,
            'ingredients': '',
            'serving': req.params.serving,
            'instructions': ''
        };

        recipe_json.data = recipe_data;

        // res.redirect('/recipename');

        res.render('getrecipename', {
            'dish': dish,
            'recipeName': '',
            'url':url,
            'serving':req.params.serving,
            'optional': optional
        });

    });

};

exports.findrecipename = function(req, res){ 
    var spawn = require('child_process').spawn;
    var url = recipe_json.data.url;

    var recipeData;

    // spawn new child process to call the python script
    const python = spawn('python', ['recipeName.py', url]);
    // collect data from script
    python.stdout.on('data', function (data) {
        recipeData = data.toString();

        var recipeName = "";

        if (recipeData != undefined) {
            recipeName = recipeData;
            console.log("Scraped recipe name: " + recipeName);
        }

        var recipe_data = {
            'dish': recipe_json.data.dish,
            'recipeName': recipeName,
            'url': url,
            'optional': recipe_json.data.optional,
            'ingredients': '',
            'serving': recipe_json.data.serving,
            'instructions': ''
        };

        recipe_json.data = recipe_data;

        res.render('findingrecipe', {
            'dish': recipe_json.data.dish,
            'recipeName': recipeName,
            'url':url,
            'serving':recipe_json.data.serving,
            'optional': recipe_json.data.optional
        });

    });

};

exports.recipe = function(req, res){ 
    var spawn = require('child_process').spawn;
    var url = recipe_json.data.url

    var recipeData;

    // spawn new child process to call the python script
    const python = spawn('python', ['ingredients.py', url]);
    // collect data from script
    python.stdout.on('data', function (data) {
        recipeData = data.toString();

        var ingredients = "";

        if (recipeData != undefined) {
            console.log("Getting ingredients...");
            ingredients = recipeData;
        }

        var recipe_data = {
            'dish': recipe_json.data.dish,
            'recipeName': recipe_json.data.recipeName,
            'url': url,
            'optional': recipe_json.data.optional,
            'ingredients': ingredients,
            'serving': recipe_json.data.serving,
            'instructions': ''
        };

        recipe_json.data = recipe_data;

        res.render('loadingrecipe', {
            'dish': recipe_json.data.dish,
            'recipeName': recipe_json.data.recipeName,
            'url': recipe_json.data.url,
            'serving': recipe_json.data.serving,
            'optional': recipe_json.data.optional
        });

    });

};

exports.instructions = function(req, res){ 
    var spawn = require('child_process').spawn;
    var url = recipe_json.data.url

    var recipeData;

    // spawn new child process to call the python script
    const python = spawn('python', ['instructions.py', url]);
    // collect data from script
    python.stdout.on('data', function (data) {
        recipeData = data.toString();

        var instructions = "";
        var orig_serving = "";

        if (recipeData != undefined) {
            console.log("Getting instructions ...");
            instructions = recipeData.split("\n\n\n")[0];
            orig_serving = recipeData.split("\n\n\n")[1];
        }

        var recipe_data = {
            'dish': recipe_json.data.dish,
            'recipeName': recipe_json.data.recipeName,
            'url': url,
            'optional': recipe_json.data.optional,
            'ingredients': recipe_json.data.ingredients,
            'orig_serving': orig_serving,
            'serving': recipe_json.data.serving,
            'instructions': instructions,
        };

        recipe_json.data = recipe_data;

        res.redirect('/recipe');

    });

};

exports.convertrecipe = function(req, res){ 
    var spawn = require('child_process').spawn;
    var ingredients = recipe_json.data.ingredients;
    var orig_serving = recipe_json.data.orig_serving;
    var serving = recipe_json.data.serving;

    var recipeData;

    // spawn new child process to call the python script
    const python = spawn('python', ['conversion.py', ingredients, orig_serving, serving]);
    // collect data from script
    python.stdout.on('data', function (data) {
        recipeData = data.toString();

        var ingredients = "";

        if (recipeData != undefined) {
            ingredients = recipeData;
        }

        res.render('recipe', {
            'ingredients': ingredients,
            'instructions': recipe_json.data.instructions,
            'recipeName': recipe_json.data.recipeName,
            'url': recipe_json.data.url,
            'serving': recipe_json.data.serving,
        });

    });

};
