var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
// var session = require('express-session');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
// var MemoryStore = require('memorystore')(session)

var index = require('./routes/index');

// var saved = require('./saved.json');
// module.exports = saved;

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// app.use(express.favicon());
// app.use(favicon(__dirname + '/public/favicon.ico'));

// app.use(express.logger('dev'));
app.use(logger('dev'));

// app.use(express.json());
app.use(bodyParser.json());                        

// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.methodOverride());
app.use(methodOverride());

// app.use(express.cookieParser('IxD secret key'));
// app.use(express.session());
app.use(session({ resave: true, saveUninitialized: true, 
  secret: 'uwotm8' }));
// app.use(session({
//   cookie: { maxAge: 86400000 },
//   store: new MemoryStore({
//     checkPeriod: 86400000 // prune expired entries every 24h
//   }),
//   resave: false,
//   saveUninitialized: true,
//   secret: 'keyboard cat'
// }))

app.use(multer());

// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// Add routes here
app.get('/', index.login);
app.get('/index', index.index);
app.get('/index/user/:user', index.name);
// app.get('/index/:account')
app.get('/newrecipe/', index.newrecipe);
app.get(
  ['/dishname/:dish/serving/:serving/optional/:optional', '/dishname/:dish/serving/:serving/optional/'], 
  index.findrecipe);
app.get('/recipename', index.findrecipename);
app.get('/getrecipe', index.recipe);
app.get('/getinstructions', index.instructions)
app.get('/recipe', index.convertrecipe)
app.get('/savedrecipes', index.savedrecipes);
app.get('/saveRecipe', index.sendrecipe);
app.get('/removerecipe/:recipeName', index.removerecipe);
app.get('/displaysavedrecipe', index.displaysavedrecipe);
app.get('/account', index.account);
// app.get('/accounts', accounts.addAccount);
//app.get('/accounts', accounts.addAccounts);
// app.get('/createaccount', index.createaccount);
// app.get('/forgotpassword', index.forgotpassword);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
