define(["jquery",
	"text!moddle/my/my.html",
	"css!moddle/my/my.css"],
	function($,html){
		function render(){
			$(".container").html(html);
			// 点击隐藏footer
			$(".myIndent").on("touchstart",function(){
				$("footer").hide();
			})
			// 显示footer
			$("footer").show();
			
		}
		// getData();
		function getData(){

		}
		return{
			render : render
		}
})