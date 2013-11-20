var express = require('express')
  , http = require('http')
  , dust = require('dustjs-linkedin')
  , cons = require('consolidate') 
  , path = require('path')
  , util = require('util')
  , config = require('./models/config.json')
  , scan = require('node-mvc-controller');

var app = express();

app.configure(function(){
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8000);
  app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.engine('dust', cons.dust);
  app.use(express.favicon('favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  //app.use(express.cookieSession());
  app.use(express.session({ secret: 'keyboard cat', cookie: { maxAge: 9000000 }}));
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

scan(__dirname+'/controllers', app);



var preProcess = function(req, res, next){

  if(typeof req.session.data == 'undefined'){
    req.session.data = {};
  }
  req.model = {};

  req.model.data= req.session.data || {};
  req.session.data.balance = '10,000';
  req.model.data.hideHeader = config.isMainNavEnabled;
  req.model.data.isBeta = config.isBeta;

  next();
};

/*
app.get('/', preProcess, function(req, res, next){ 
  res.render('login', req.model);
});

*/
var validateLogin = function(req, res, next){
    if(!req.session.data.loggedIn){
        req.session.sessionTimeout = "Please provide valid user id and password";
        res.redirect('/');
    }
    else if(req.session.data.currentSession != req.sessionID){
        req.session.data.sessionTimeout = "You current session has been expired. Kindly login again";
        res.redirect('/');
      }
    else{
      req.session.touch()
      next();
    }
}

app.set('preProcess', preProcess);

app.get('/transaction',preProcess, validateLogin, function(req, res, next){
  var date = new Date();
   res.render('landing', { month: date.getMonth() ==2 ? "March":'', year: date.getFullYear() });
});


app.get('/home',preProcess, validateLogin, function(req, res, next){
  res.render('welcome', { name: req.session.user });
});

app.post('/home', preProcess ,function(req, res, next){
 var details = null;
 if(req.session.data.loggedIn === 'true'){
           res.render('welcome', req.model);
  }
  else if(req.body.username){
      db.open(function(err, client) {
          if (err) {
            throw err;
          }

          db.authenticate('nodejitsu', 'b8352371d860968e0c19d3f96ed77003', function authenticate(err, replies) {
            if (err) {
              throw err;
            }
          var users = db.collection('users'),
       //     tranasctions = new mongo.Collection(client, 'history'),
       //     profile = new mongo.Collection(client, 'profile'),
            balance;
      /*       tranasctions.find().toArray(function(err, results){
               req.session.data.tranasctions = results;
            });

             profile.find({user: req.body.username}).toArray(function(err, result) {
                req.session.data.balance  = result[0].balance; 
            
            }); */

         
             
        users.find({}, {limit:10}).toArray(function(err, docs) {
          details = docs;
          if(docs.length > 0 && (docs.length > 0 && details[0].user_id === req.body.username && details[0].password === req.body.password)){
            req.session.data.currentSession = req.sessionID;
            var balance;
            req.session.data.loggedIn = 'true';
            req.session.data.user = details[0].user_id ;
            req.model.data = req.session.data;
            res.render('welcome', req.model); 
          }
         else{
          res.render(login, {error: req.body.username });
        }
        
      });
    });
  });
  
  }
} );



app.post('/savemodel', function(req, res, next){
   res.json({ save: 'Express' });
});

app.get('/logout', preProcess,  function(req, res, next){
  //  req.session = {};
    req.session.data.loggedIn = 'false';
     res.render('login', { title: 'Express' });
});



app.get('/addfunds', validateLogin, function(req, res, next){
   res.render('addfunds', req.model);
});

app.get('/signup', function(req, res, next){
   res.render('signup', req.model);
});


app.post('/signup-submit', function(req, res, next){
  /*    db.open(function(err, client) {
          if (err) {
                 console.log('failed o[pen');
            throw err;
          }

          db.authenticate('nodejitsu', 'b8352371d860968e0c19d3f96ed77003', function authenticate(err, replies) {
            if (err) {
              console.log('failed');
              throw err;
              
            }
           
            var users = db.collection('users'),
              balance;

                console.log(users);
            users.insert({user_id: req.body.username, password: req.body.password});
          });
        });
     db.close();  */
   res.render('login', req.model);
});



/**




app.get('/addfunds', validateLogin, function(req, res, next){
   res.render('addfunds', req.model);
});
app.get('/addfundingsource', validateLogin, function(req, res, next){
   res.render('addfundingsource', req.model);
});

app.get('/addsavings', function(req, res, next){
    console.log(req.session);
   res.render('addsavings', req.model);
});




*/


app.listen(app.get('port'), app.get('ipaddress'), function(){
  console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), app.get('ipaddress'), app.get('port'));
});
