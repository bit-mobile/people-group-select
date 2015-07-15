var Backbone = require("modules-common/backbone/backbone.js"),
	$ = require("modules-common/zepto/zepto.js"),
	TopBar = require("modules-common/topBar/topBar.js"),
	peopleTools = require("modules-common/tools/people.js");

var View = Backbone.View.extend({

	template: __inline("group-item.tmpl"),
	initialize: function() {
		this.render();
		this.initEvent();
	},

	render: function() {
		var that = this;
		this.topBar = new TopBar({
			right: {},
			title: "讨论组选择"
		});

		this.$el.append(this.topBar.$el);
		this.$list = $("<div class='list bd'></div>");
		this.$el.append(this.$list);

		$("#wraper").append(this.$el);

		global.data.departmentList.each(function(model) {
			var obj = model.toJSON();
			obj.type = global.DEST_TYPE.DEPARTMENT;
			that.$list.append(that.template(obj));
		});

		global.data.groupList.each(function(model) {
			var obj = model.toJSON();
			obj.type = global.DEST_TYPE.DISCUSSION_GROUP;
			that.$list.append(that.template(obj));
		});
	},

	attributes: {
		class: "group-select"
	},

	initEvent: function() {
		var that = this;
		this.listenTo(this.topBar, "back", function() {
			that.back();
		});

		this.$el.on("click", ".JS-item", function() {
			var $this = $(this),
				id = $this.data("id"),
				type = $this.data("type");
			that.trigger("select", {
				data: [id],
				type: type
			});
			that.hide();
		});
	},

	back: function() {
		this.hide();
		this.trigger("back");
	},

	show: function() {
		if (this.showing) {
			return;
		}
		this.$el.show();
		this.showing = true;

		if (window.starfishBack) {
			this._starfishBack = window.starfishBack;
			window.starfishBack = $.proxy(this.back, this);
		}
	},

	hide: function() {
		if (this.showing) {
			this.$el.hide();
			this.showing = false;

			if (window.starfishBack) {
				window.starfishBack = this._starfishBack;
			}
		}
	}
});

var view = new View();

module.exports = view;