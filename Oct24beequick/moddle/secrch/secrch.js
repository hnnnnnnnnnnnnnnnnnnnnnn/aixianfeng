define(["jquery", "text!moddle/secrch/secrch.html", "css!moddle/secrch/secrch.css"], function($, html) {
    function render() {
        $(".container").html(html);
        // 点击清空历史事件
            // 添加历史记录事件 jq添加
        $(".hot_ul").on("touchstart", "li", function() {
            var isRepeat = false;
            var his_li = $("<li/>").html($(this).html());
            for (var i = 0; i < $(".his_ul li").length; i++) {
                if ($(".his_ul li").eq(i).html() == $(this).html()) {
                    isRepeat = true;
                } else {
                    isRepeat = false;
                }
            }
            if (isRepeat == false) {
                $(".his_ul").append(his_li);
                $(".clear").show();
            }
        })
        $(".clear").on("touchstart",function(){
        	$(".his_ul").empty();
            $(this).hide();
        })
    }
    return {
        render: render
    }
})
