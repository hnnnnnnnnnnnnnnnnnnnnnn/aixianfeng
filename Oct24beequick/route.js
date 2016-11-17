define(["backbone"],function(){
	// 构建路由对象
	var Router = Backbone.Router.extend({
		// 自定义路由
		routes : {
			"home" : "home",
			"my" : "my",
			"shopcar" : "shopcar",
			"resh" : "resh",
			"supermarket" : "supermarket",
			"secrch" : "secrch",
			"myIndent" : "myIndent",
			"score" : "score",
			"*actions" : "defaultAction",
		},
		my : function(){
			require(["moddle/my/my"],function(my){
				// (my)是返回值
				my.render();
			})
		},
		shopcar : function(){
			require(["moddle/shopcar/shopcar"],function(shopcar){
				shopcar.render();
			})
		},
		resh : function(){
			require(["moddle/resh/resh"],function(resh){
				resh.render();
			})
		},
		// 闪送超市
		supermarket : function(){
			require(["moddle/supermarket/supermarket"],function(supermarket){
				supermarket.render();
			})
		},
		// 主页
		home : function(){
			require(["moddle/home/home"],function(home){
				home.render();
			})
		},
		// 搜索页
		secrch : function(){
			require(["moddle/secrch/secrch"],function(secrch){
				secrch.render();
			})
		},
		// 我的订单
		myIndent : function(){
			require(["moddle/myIndent/myIndent"],function(myIndent){
				myIndent.render();
			})
		},
		score : function(){
			require(["moddle/score/score"],function(score){
				score.render();
			});
		},
		defaultAction : function(){
		 	location.hash = "home";
		},

	})
    return new Router();
})