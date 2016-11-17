define(["jquery", "text!moddle/score/score.html", "css!moddle/score/score.css"],
    function($, html) {
    	function render(){
    		$(".container").html(html);
    		// $(".header_left").on("touchstart",function(){
    		// 	history.go("my");
    		// })
            // 隐藏footer
            $("footer").hide();
            // 返回
            $(".header_left").on("touchstart",function(){
                history.go(-1);
            })
    	}
    	return {
    		render : render
    	}
    })
