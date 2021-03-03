/*
 * GET home page.
 */

// var recipe_json = require('../recipe.json');
var saved = require('../saved.json');
var data_file = require('../data.json');

exports.view = function(req, res){
	console.log(data);
}
exports.login = function(req, res){
    res.render('login');
};

exports.index = function(req, res){

    var name = data_file.user.name;

    res.render('index', {
        'name': name
        // 'pictureurl': pictureurl
    });
};

//getting Facebook account name and adding it to data_file json
exports.name = function(req, res){

    var name = req.params.user;
    // var pictureurl = req.params.pictureurl;
    console.log("index Name: " + name);
    // console.log("picture url: " + pictureurl);
    data_file.user.name = name;

    res.render('index', {
        'name': name
        // 'pictureurl': pictureurl
    });
};

//renders new recipe page
exports.newrecipe = function(req, res){
    var name = data_file.user.name;

    if (req.query.new == "0") {
        res.render('newrecipe', {
            'name': name,
            'dish': req.query.dish,
            'serving': req.query.serving,
            'optional': req.query.optional
        });
    } else {

        res.render('newrecipe', {
            'name': name
        }); 
    }
};

//renders saved recipe page
exports.savedrecipes = function(req, res){
    var name = data_file.user.name;
    // console.log("SAVeD: " + saved.recipes[0].recipeName);
    res.render('savedrecipes', {
        'name': name,
        recipes: saved.recipes
        // 'recipes': saved.recipes
        // 'pictureurl': pictureurl
    });
};

//after clicking on x for a specific saved recipe,
//removes it from saved.json file and re renders saved recipes page
exports.removerecipe = function(req, res) {

    // var fs = require('fs');

    var recipeName = req.params.recipeName;
    console.log(recipeName);

    
        // fs.readFile('saved.json', 'utf8', function readFileCallback(err, data){
        //     if (err){
        //         console.log(err);
        //     } else {
    // obj = JSON.parse(data); //now it an object

    var numSaved = saved.recipes.length;
    console.log("Number of saved: " + numSaved);

    for (var i=0; i < numSaved; i++) {
        if (saved.recipes[i] != undefined && saved.recipes[i].recipeName == recipeName) {
            saved.recipes.splice(i, 1);
            console.log("hopefully removing: " + recipeName);
        }
    }

                // json = JSON.stringify(obj); //convert it back to json
                // fs.writeFile('saved.json', data, 'utf8', function(err){
                //     if(err) return console.log(err);
                //     console.log('Note added');
                // });
    var name = data_file.user.name;
    // console.log("SAVeD: " + saved.recipes[0].recipeName);
    res.render('savedrecipes', {
        'name': name,
        recipes: saved.recipes
        // 'recipes': saved.recipes
        // 'pictureurl': pictureurl
    });    // res.end();

};

//after clicking on "Save Recipe" saves info to saved.json
//and renders saved recipes page
exports.sendrecipe = function(req, res) {
    var dish = req.query.dish;
    var optional = req.query.optional;
    var recipeName = req.query.recipeName;
    var serving = req.query.serving;
    var ingredients = req.query.ingredients;
    var instructions = req.query.instructions;
    var url = req.query.url;

    var newsavedrecipe = {
        'dish': dish,
        'optional': optional,
        'recipeName': recipeName,
        'serving' : serving,
        'ingredients' : ingredients,
        'instructions' : instructions,
        'url' : url  
    }
    var name = data_file.user.name;
    // var fs = require('fs');
    // fs.readFile('saved.json', 'utf8', function readFileCallback(err, data){
    //     if (err){
    //         console.log(err);
    //     } else {
    //     obj = JSON.parse(data); //now it an object
    //     obj.recipes.push(newsavedrecipe); //add some data
    //     json = JSON.stringify(obj); //convert it back to json
    //     fs.writeFile('saved.json', json, 'utf8', function(err){
    //         if(err) return console.log(err);
    //         console.log('Note added');
    //     });
    // }});

    saved.recipes.push(newsavedrecipe);

    res.render('savedrecipes', {
        'name': name,
        recipes: saved.recipes
    });
}

//after clicking on a saved recipe from the saved recipes page,
//goes to view showing recipe info (without Save Recipe button)
exports.displaysavedrecipe = function(req, res) {
    var name = data_file.user.name;
    var dish = req.query.dish;
    var optional = req.query.optional;
    var recipeName = req.query.recipeName;
    var serving = req.query.serving;
    var ingredients = req.query.ingredients;
    var instructions = req.query.instructions;
    var url = req.query.url;

    res.render('displaysaved', {
        'dish': dish,
        'optional': optional,
        'ingredients': ingredients,
        'instructions': instructions,
        'recipeName': recipeName,
        'url': url,
        'serving': serving,
        'name':name,
    });
}

//renders account page
exports.account = function(req, res){

    var name = data_file.user.name;
    // var pictureurl = data_file.user.pictureurl;

    console.log("account Name: " + name);
    // console.log("picture url: " + pictureurl);

    res.render('account', {
        'name': name
        // 'pictureurl': pictureurl
    });


};

//calls a python script to scrape allrecipes.com 
//searches for dish + optional ingredients
//gets url of recipe page
exports.findrecipe = function(req, res){ 
    var spawn = require('child_process').spawn;
    var dish = req.query.dish;
    var optional = req.query.optional;
    console.log("dish: " + dish);
    console.log("serving: " + req.query.serving);
    console.log("optional: " + optional);

    if (optional == undefined || optional == "") {
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

        // var recipe_data = {
        //     'dish': dish,
        //     'recipeName': '',
        //     'url': url,
        //     'optional': optional,
        //     'ingredients': '',
        //     'serving': req.query.serving,
        //     'instructions': ''
        // };

        // recipe_json.data = recipe_data;

        // res.redirect('/recipename');

        res.render('getrecipename', {
            'dish': dish,
            'recipeName': '',
            'url': url,
            'serving':req.query.serving,
            'optional': optional
        });

    });

};

//gets recipe name from recipe url
exports.findrecipename = function(req, res){ 
    var spawn = require('child_process').spawn;
    var url = req.query.url;

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

        // var recipe_data = {
        //     'dish': recipe_json.data.dish,
        //     'recipeName': recipeName,
        //     'url': url,
        //     'optional': recipe_json.data.optional,
        //     'ingredients': '',
        //     'serving': recipe_json.data.serving,
        //     'instructions': ''
        // };

        // recipe_json.data = recipe_data;

        // res.redirect('/getrecipe');

        res.render('findingrecipe', {
            'dish': req.query.dish,
            'recipeName': recipeName,
            'url': url,
            'serving':req.query.serving,
            'optional': req.query.optional
        });

    });

};

//gets ingredients
exports.recipe = function(req, res){ 
    var spawn = require('child_process').spawn;
    var url = req.query.url

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

        // var recipe_data = {
        //     'dish': recipe_json.data.dish,
        //     'recipeName': recipe_json.data.recipeName,
        //     'url': url,
        //     'optional': recipe_json.data.optional,
        //     'ingredients': ingredients,
        //     'serving': recipe_json.data.serving,
        //     'instructions': ''
        // };

        // recipe_json.data = recipe_data;

        // res.redirect('/getinstructions')
        res.render('loadingrecipe', {
            'dish': req.query.dish,
            'ingredients': ingredients,
            'recipeName': req.query.recipeName,
            'url': req.query.url,
            'serving': req.query.serving,
            'optional': req.query.optional
        });

    });

};

//gets instructions and orig serving size
exports.instructions = function(req, res){ 
    var spawn = require('child_process').spawn;
    var url = req.query.url

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

        // var recipe_data = {
        //     'dish': recipe_json.data.dish,
        //     'recipeName': recipe_json.data.recipeName,
        //     'url': url,
        //     'optional': recipe_json.data.optional,
        //     'ingredients': recipe_json.data.ingredients,
        //     'orig_serving': orig_serving,
        //     'serving': recipe_json.data.serving,
        //     'instructions': instructions,
        // };

        // recipe_json.data = recipe_data;

        var url = require('url');
        res.redirect(url.format({
            pathname: '/recipe', 
            query: {
                'dish': req.query.dish,
                'recipeName': req.query.recipeName,
                'url': req.query.url,
                'serving': req.query.serving,
                'optional': req.query.optional,
                'ingredients': req.query.ingredients,
                'instructions': instructions,
                'orig_serving': orig_serving
            }
        }));

    });

};

//puts original ingredient amount & orig serving/desired serving 
//into converter, scrapes new ingredient amounts
exports.convertrecipe = function(req, res){ 
    var spawn = require('child_process').spawn;
    var ingredients = req.query.ingredients;
    var orig_serving = req.query.orig_serving;
    var serving = req.query.serving;

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

        var name = data_file.user.name;

        res.render('recipe', {
            'dish': req.query.dish,
            'optional': req.query.optional,
            'ingredients': ingredients,
            'instructions': req.query.instructions,
            'recipeName': req.query.recipeName,
            'url': req.query.url,
            'serving': req.query.serving,
            'name': name,
        });

    });

};
