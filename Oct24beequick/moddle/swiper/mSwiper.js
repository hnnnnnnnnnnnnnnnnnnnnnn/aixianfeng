define(["swiper"],function(sw){
    function render(c){
        var mySwiper = new Swiper(c, {
            autoplay: 2000,//可选选项，自动滑动
            loop : true,
            pagination : '.swiper-pagination',
            paginationClickable: true
        })
    }
    return {
        render : render
    }
})
