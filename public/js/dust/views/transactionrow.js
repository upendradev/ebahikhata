define(["dust-runtime"],function (dust) {
	// views\transactionrow.dust
	(function(){dust.register("views\transactionrow",body_0);function body_0(chk,ctx){return chk.write("<tr><td><input name=\"date_").reference(ctx.get("count"),ctx,"h").write("\" type=text class=\"date small datepicker\"></td><td><input name=\"desc_").reference(ctx.get("count"),ctx,"h").write("\" type=text style=\"width:225px;\" class=\"desc\"></td><td><input name=\"amount_").reference(ctx.get("count"),ctx,"h").write("\" type=text class=\"amount small\"></td><td><input name=\"source_").reference(ctx.get("count"),ctx,"h").write("\" type=text class=\"source\"></td></td>");}return body_0;})();
	return "views\\transactionrow";
});