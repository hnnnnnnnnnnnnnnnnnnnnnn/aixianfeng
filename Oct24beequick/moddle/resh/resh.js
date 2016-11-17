define(["jquery",
    "text!moddle/resh/resh.html",
    "css!moddle/resh/resh.css"
], function($, html) {
    function render() {
        $(".container").html(html);
        getData();
    }

    function getData() {
        $.ajax({
            url: "http://www.vrserver.applinzi.com/aixianfeng/apiyuding.php",
            type: "get",
            dataType: "json",
            success: function(data) {
                createList(data);
            }
        })

        function createList(data) {
            var products = data.product;
            for (var i = 0; i < products.length; i++) {
                var li = $("<li/>").css("background-image", "url(" + products[i].img + ")");
                var promsg = $("<div class='promsg'/>").append($("<p class='proname'/>").html(products[i].name)).append($("<P class='proprice'/>").html("￥" + products[i].market_price))
                $(".prolist").append(li.append(promsg));
            }
            // 默认选中新鲜预定
            // $(".footer_resh").css("background-image", "url(imgs/footer13.png)")
        }
    }
    return {
        render: render
    }
})
