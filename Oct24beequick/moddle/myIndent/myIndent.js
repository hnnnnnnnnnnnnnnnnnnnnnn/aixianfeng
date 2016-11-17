define(["jquery", "text!moddle/myIndent/myIndent.html", "css!moddle/myIndent/myIndent.css"], function($, html) {
    function render() {
        $(".container").html(html);
        $(".nav").on("touchstart", "li", function() {
            $(this).addClass('nav_li_sele').siblings().removeClass('nav_li_sele');
        })
    }
    return {
        render: render
    }
})
