define(["jquery", "text!moddle/home/home.html", "moddle/swiper/mSwiper",
 "css!moddle/home/home.css"],
    function($, html, ms) {
        function render() {
            // 显示footer
            $("footer").show();
            // 添加html
            $(".container").html(html);
            // 添加扫一扫事件
            $(".header_left").on("touchstart", function() {
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function(res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    }
                });
            })
            getData();
        }

        function getData() {
            // 请求数据
            $.ajax({
                url: "http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
                type: "GET",
                dataType: "json",
                success: function(data) {
                    // data是json格式，把返回数据转成json
                    createLoop(data);
                    createNav(data);
                }
            })

            function createLoop(res) {
                var sp = $(".swiper-wrapper");
                $.get("http://www.vrserver.applinzi.com/aixianfeng/apihome.php", function(res) {
                        var data = res.data.slide;
                        for (var i = 0; i < data.length; i++) {
                            var o = data[i];
                            var div = $("<div class='swiper-slide'/>");
                            var img = $("<img src='" + o.activity.img + "'/>");
                            div.append(img);
                            sp.append(div);
                        }
                        ms.render(".swiper-container")
                    }, "json")
            }

            function createNav(res) {
                var menu = res.data.menu;
                for (var i = 0; i < menu.length; i++) {
                    var a = $("<a/>");
                    $(".nav").append(a.html(menu[i].activity.name).
                        css("background-image", "url(" + menu[i].activity.img + ")"));
                }
            }
            $.ajax({
                url: "http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php",
                type: "get",
                dataType: "json",
                success: function(data) {
                    createhot(data);
                }
            })

            function createhot(data) {
                var shops = data.data;
                for (var i = 0; i < shops.length; i++) {
                    var li = $("<li/>").append($("<div/>").addClass("hotshop").css("background-image", "url(" + shops[i].img + ")"))
                        // 商品名称
                    var shopName = $("<p/>").html(shops[i].name);
                    // 类型
                    var shopType = $("<div class='shoptype'/>").
                    append($("<span class='good'/>").html("精选"));
                    if (shops[i].pm_desc.length > 0) {
                        shopType.append($("<span class='pm_desc'/>").html(shops[i].pm_desc));
                    }
                    // 质量
                    var specifics = $("<p class='specifics'>").html(shops[i].specifics);
                    // 价格
                    var prices = $("<div class='specifics'/>").append($("<span class='price'/>").html("￥" + shops[i].price))
                        .append($("<span class='market_price'>").html("￥" + shops[i].market_price));
                    // 加减商品
                    var less = $("<span class='less'/>");
                    var add = $("<span class='add'/>");
                    var choose = $("<div class='choose'/>")
                        .append(less)
                        .append($("<span class='num'/>").html(0))
                        .append(add);
                    // 加减商品事件
                    add.data("goodsId", i); //给商品一个ID
                    var arrGoodsNum = ""; //定义一个字符串存放商品ID
                    add.on("touchstart", function() {
                        // 加号左边显示数字和减号按钮
                        var goodsNum = $(this).parent().find($(".num")).html();
                        goodsNum++;
                        $(this).prev().html(goodsNum).show();
                        $(this).prev().prev().show();
                        // 购物车右上角加事件
                        var num_shopcar = $(".num_shopcar").html();
                        num_shopcar++;
                        $(".num_shopcar").show().html(num_shopcar);
                        // 本地存储
                        arrGoodsNum += $(this).data("goodsId").toString() + ",";
                        var arrGoodsNumEnd = arrGoodsNum.substring(0, arrGoodsNum.length - 1);
                        console.log(arrGoodsNumEnd);
                        if (window.localStorage) {
                            localStorage.setItem("goodsNum", arrGoodsNumEnd);
                        }
                        console.log(arrGoodsNumEnd.split(","));
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
                        // 购物车右上角减事件
                        var num_shopcar = $(".num_shopcar").html();
                        if (num_shopcar == 1) {
                            $(".num_shopcar").hide();
                            num_shopcar = 0;
                        } else {
                            num_shopcar--;
                        }
                        $(".num_shopcar").html(num_shopcar);
                    })
                    li.append(shopName).append(shopType).append(specifics).append(prices).append(choose);
                    $(".hot").append(li)

                }
            }
        }
        return {
            render: render
        }
    })
