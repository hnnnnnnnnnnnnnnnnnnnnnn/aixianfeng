require.config({
	shim : {
		"swiper" : {
			deps : ["jquery","css!moddle/swiper/swiper-3.3.1.min.css"],
			exports : "Swiper"
		}
	},
	paths : {
		"text" : "lib/text",
		"css" : "lib/css",
		"jquery" : "lib/jquery",
		"underscore" : "lib/underscore",
		"backbone" : "lib/backbone",
		"footer" : "moddle/footer/footer",
		"swiper" : "moddle/swiper/swiper-3.3.1.jquery.min"
	}
})
require(["backbone","route","css!moddle/reset.css","footer"],function(){
	Backbone.history.start();
})