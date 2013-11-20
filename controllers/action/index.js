'use strict';

//var preProcess = require('../middlewares/preprocess.js');
var config = require('../../models/config.json');



module.exports = function(app){
	'use strict';
	var viewName;

	var postProcess = function(req, res, next){
		var data = req.model.data;
		next();
	}

	var runFlow = function(req, res, next){
		  if(typeof req.session.data == 'undefined'){
		    req.session.data = {};
		  }
		  

		  req.model = req.model || {};
		  req.session.data.balance = '10,000';

		  req.model.data = req.session.data;
		  req.model.data = {
		  	viewName: viewName,
		  	hideHeader: config.isMainNavEnabled,
		  	isBeta: config.isBeta,
		  	isLoggedIn: true
		  };
		 
		 if(req.body.loginButton){
		 	viewName = 'home';
		 }else{
		  var flow = req.flow;
		  var action = require('./flows'+flow);
		  viewName = action.runFlow(viewName, req.model.data);
		}
		
		next();

	}

	app.post('/flow', runFlow, function(req, res){
		res.render('home', req.model);
	});

	app.get('/flow', postProcess, function(req, res){
		res.json(req.model.data)
	});

}