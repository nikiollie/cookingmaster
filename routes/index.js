/*
 * GET home page.
 */

var recipe_json = require('../recipe.json');

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

exports.recipe = function(req, res){ 
    var spawn = require('child_process').spawn;
    var dish = req.params.dish;
    var optional = req.params.optional;
    console.log("dish: " + dish);
    console.log("optional: " + optional);

    if (optional == undefined) {
        optional = "none";
        console.log("optional: " + optional);
    };

    var recipeData;

    // spawn new child process to call the python script
    const python = spawn('python', ['recipe.py', dish, optional]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe recipe data from python script ...');
        recipeData = data.toString();

        //split recipe data into ingredients and instructions
        var ingredients = "";
        var instructions = "";
        var orig_serving = "";

        if (recipeData != undefined) {
            ingredients = recipeData.split("\n\n\n")[0];
            instructions = recipeData.split("\n\n\n")[1];
            orig_serving = recipeData.split("\n\n\n")[2];
            console.log("Ingredients: " + ingredients);
            console.log("Instructions: " + instructions);
            console.log("Orig Serving: " + orig_serving);
        }

        var recipe_data = {
            'ingredients': ingredients,
            'instructions': instructions,
            'orig_serving': orig_serving,
            'serving': req.params.serving
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

    console.log("ingredients: " + ingredients);
    console.log("orig_serving: " + orig_serving);
    console.log("serving: " + serving);

    var recipeData;

    // spawn new child process to call the python script
    const python = spawn('python', ['conversion.py', ingredients, orig_serving, serving]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe recipe data from python script ...');
        recipeData = data.toString();

        var ingredients = "";

        if (recipeData != undefined) {
            ingredients = recipeData;
        }

        res.render('recipe', {
            'ingredients': ingredients,
            'instructions': recipe_json.data.instructions,
        });

    });

};
