define(['jquery','underscore', 'backbone'], function($, _, Backbone){

	var AppView = Backbone.View.extend({
			el: $('#main'),
			initialize: function(){
				this.listenTo(this.model, 'change', this.render);
      			this.listenTo(this.model, 'destroy', this.remove);
      			this.render();
			},
			render: function(){
				
			},
			events:{
				"click a#addTransaction": "addTransaction",
				"click #submit": "submitInformation"
			}
	});
	return AppView;

});
