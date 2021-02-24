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

const {spawn} = require('child_process');
exports.recipe = function(req, res){ 
        var dish = req.params.dish;
        var serving = req.params.serving;
        var optional = req.params.optional;
        console.log("dish: " + dish);
        console.log("serving: " + serving);
        console.log("optional: " + optional);

        if (optional == undefined) {
            optional = "none";
            console.log("optional: " + optional);
        };

        var recipeData;

        //FOR INGREDIENTS
        // spawn new child process to call the python script
        const python = spawn('python', ['recipescript.py', dish, serving, optional]);
        // collect data from script
        python.stdout.on('data', function (data) {
         console.log('Pipe recipe data from python script ...');
         recipeData = data.toString();
        });


        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        // res.send(dataToSend)

        //split recipe data into ingredients and instructions
        var ingredients = "";
        var instructions = "";

        if (recipeData != undefined) {
            ingredients = recipeData.split("\n\n\n")[0];
            instructions = recipeData.split("\n\n\n")[1];
            console.log("Ingredients: " + ingredients);
            console.log("Instructions: " + instructions);
        }

        res.render('recipe', {
            'ingredients': ingredients,
            'instructions': instructions,
        });

        });

    // res.render('recipe');
};



