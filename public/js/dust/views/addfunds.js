define(["dust-runtime"],function (dust) {
	// views\addfunds.dust
	(function(){dust.register("views\addfunds",body_0);function body_0(chk,ctx){return chk.write("<h4>Please enter the amount you would like to add.</h4><label for=\"amount\">Enter amount</label><form method=\"post\"><input type=\"text\" name=\"add-balance\" value=\"\" class=\"add-funds-input\"><input type=\"submit\" name=\"balance-submit\" value=\"Enter\" class=\"btn btn-primary\"></form>");}return body_0;})();
	return "views\\addfunds";
});