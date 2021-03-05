var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var accounts = require('./routes/accounts');


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
app.use(multer());

// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
// if ('development' == app.get('env')) {
//   app.use(errorHandler);
// }

// Add routes here
app.get('/', index.login);
app.get('/index', index.index);
app.get('/newrecipe/', index.newrecipe);
app.get(
  ['/dishname/:dish/serving/:serving/optional/:optional', '/dishname/:dish/serving/:serving/optional/'], 
  index.findrecipe);
app.get('/recipename', index.findrecipename);
app.get('/getrecipe', index.recipe);
app.get('/getinstructions', index.instructions)
app.get('/recipe', index.convertrecipe)
app.get('/savedrecipes', index.savedrecipes);
app.get('/account', index.account);
app.get('/accounts', accounts.addAccount);
//app.get('/accounts', accounts.addAccounts);
app.get('/createaccount', index.createaccount);
app.get('/forgotpassword', index.forgotpassword);

app.get('/help', index.help);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
