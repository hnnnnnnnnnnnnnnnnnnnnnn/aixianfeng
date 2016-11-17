define(["jquery",
    "text!moddle/shopcar/shopcar.html",
    "css!moddle/shopcar/shopcar.css"
], function($, html) {
    function render() {
        $(".container").html(html);
        getData();
    }
    function getData() {
        for (var i = 0; i < $(".sele").length; i++) {
            $(".sele")[i].addEventListener("touchstart", function() {
                console.log($(this))
                $(this).toggleClass('sele_off');
            })
        }
        $(".seleAll").on("touchstart", function() {
                $(this).toggleClass('sele_off');
            })
        // 输出
        $.ajax({
            url: "http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php",
            type: "GET",
            dataType: "json",
            success: function(data) {
                // data是json格式，把返回数据转成json
                createShoplist(data);
            }
        })

        function createShoplist(data) {
            
        }
    }
    return{
    	render : render
    }
})
