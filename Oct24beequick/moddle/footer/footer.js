define(["jquery","text!moddle/footer/footer.html","css!moddle/footer/footer.css"], 
	function($ ,html) {
		// function render(){
			$("footer").html(html);
		    $("footer li").on("touchstart", function() {
		        // 变换背景
		        // 选中样式添加动画类;	
		        $("footer li").removeClass('sele_fo move')
		        $(this).addClass("sele_fo move");
		    })
		// }
		// return {
		// 	render : render
		// }
})
