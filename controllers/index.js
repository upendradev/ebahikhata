
/*
 * GET home page.
 */

'use strict';

var config  = require('../models/config.json');

module.exports  = function(app){

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
	}
	app.get('/', preProcess, function(req, res){
  			res.render('login', req.model);
	});

};
 


