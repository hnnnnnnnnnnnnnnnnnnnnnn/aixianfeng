define(["jquery", "text!moddle/supermarket/supermarket.html", "css!moddle/supermarket/supermarket.css"], function($, html) {
    function render() {
        $(".container").html(html);
        // 显示footer
        $("footer").show();
        // 显示下面的图标
        
        getData();
    }

    function getData() {
        // 勾选事件
        for (var i = 0; i < $(".sele").length; i++) {
            $(".sele")[i].addEventListener("touchstart", function() {
                console.log($(this))
                $(this).toggleClass('sele_off');
            })
        }
        $(".seleAll").on("touchstart", function() {
                $(this).toggleClass('sele_off');
                // $(this).toggleClass('seleAll');
            })
            // 输出之前存储数据
            // var arrGoodsNum = localStorage.getItem("goodsNum").split(","); //获得数组
        $.ajax({
            url: "http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php",
            type: "GET",
            dataType: "json",
            success: function(data) {
                // data是json格式，把返回数据转成json
                // var data = $.parseJSON(data);
                createShoplist(data);
            }
        })

        function createShoplist(data) {
            var kind = "热销榜";
            $.ajax({
                url: "http://www.vrserver.applinzi.com/aixianfeng/apicategory.php",
                dataType: "json",
                type: "GET",
                data: {
                    "category": kind,
                },
                success: function(data) {
                    shopList(data)
                }
            })

            function shopList(data) {
                var data = data.data;
                for (var i = 0; i < data.length; i++) {
                    var li = $("<li/>");
                    // 左边的商品图
                    var img = $("<div class='img'/>").css("background-image", "url(" + data[i].img + ")").appendTo(li);
                    var shop_msg = $("<div class='shop_msg'/>");
                    // 商品名
                    var name = ($("<p class='name'/>").html(data[i].name));
                    // 精选
                    var shopType = $("<div class='shoptype'/>")
                        .append($("<span class='good'/>").html("精选"));
                    if (data[i].pm_desc.length > 0) {
                        shopType.append($("<span class='pm_desc'/>").html(data[i].pm_desc));
                    }
                    // .append($("<span class='pm_desc'/>").html(data[i].pm_desc));
                    // 质量
                    var specifics = $("<p class='specifics'>").html(data[i].specifics);
                    // 价格
                    var prices = $("<div class='specifics'/>")
                        .append($("<span class='price'/>").html("￥" + data[i].price))
                        .append($("<span class='market_price'>").html("￥" + data[i].market_price));
                    //加减事件
                    var less = $("<span class='less'/>");
                    var add = $("<span class='add'/>");
                    var choose = $("<div class='choose'/>")
                        .append(less)
                        .append($("<span class='num'/>").html(0))
                        .append(add);
                    // 加减商品事件
                    // var goodsNum = 0;
                    add.on("touchstart", function() {
                        // console.log( $(this).parent().find($(".num")).html())
                        var goodsNum = $(this).parent().find($(".num")).html();
                        goodsNum++;
                        $(this).prev().html(goodsNum).show();
                        $(this).prev().prev().show();
                    });
                    // 减事件
                    less.on("touchstart", function() {
                        var goodsNum = $(this).parent().find($(".num")).html();
                        goodsNum == 0 ? goodsNum = 0 : goodsNum--;
                        if (goodsNum == 0) {
                            goodsNum = 0;
                            $(this).hide().next().hide();
                        }
                        $(this).next().html(goodsNum);

                    })

                    shop_msg.append(name).append(shopType).append(specifics).append(prices).append(choose);
                    li.append(shop_msg);
                    $(".main_right").append(li);
                }
            }
            // 点击竖直菜单事件
            $(".nav li").on("touchstart", function() {
                console.log($(this).html())
                $(".main_right").empty();
                kind = $(this).html();
                $.ajax({
                    url: "http://www.vrserver.applinzi.com/aixianfeng/apicategory.php",
                    dataType: "json",
                    type: "GET",
                    data: {
                        "category": kind,
                    },
                    success: function(data) {
                        shopList(data)
                    }
                })

                $(this).css("border-left", ".4rem solid #ffd600").siblings().css("border", "none")
            })

        }
    }
    return {
        render: render
    }
})
