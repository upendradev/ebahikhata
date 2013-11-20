define(["dust-runtime"],function (dust) {
	// views\error.dust
	(function(){dust.register("views\error",body_0);function body_0(chk,ctx){return chk.exists(ctx.get("error"),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.reference(ctx.get("error"),ctx,"h");}return body_0;})();
	return "views\\error";
});