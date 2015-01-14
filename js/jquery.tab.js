$.fn.extend({
	initTab:function  (url,title,bootPath) {
	bootPath = bootPath.substring(0, bootPath.length - 1);
	var array = new Array();
	array = bootPath.split(',');
	array.pop();
	array.reverse();
	var path = "";
	//alert(path);
	for (var i = 0; i < array.length; i++) {
		if(i == 0){
			path+="<a class=\"default\">"+ array[i] +"</a>";
		}else{
			path+="<a>"+ array[i] +"</a>";
		}
	};
	path+="<a>"+ title +"</a>";
	
	$('#jj').find('li').remove();
	$('#jj').append('<li>'+path+'</li>');
	//console.log('测试输出');
	
	//document.getElementById('mainFrame').onreadystatechange = function(){
		//alert('加载完毕1');
		//if(document.getElementById('mainFrame').readyState == 'complete'){
			//alert('加载完毕');
		//}
	//}
var iframe = document.getElementById('mainFrame');
$('.right').append("<div id=\"alertmsg123\" style=\"position:absolute;_position:absolute;z-index:5000;width:100%;height:100%;text-align:center;background:url('css/icons/loading.png') no-repeat scroll center 0 #fff; opacity:0.5;padding:0 0;text-indent:120px;line-height:30px;top:35px;\">正在加载中...</div>");
document.getElementById('mainFrame').src = url;
if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera){
    iframe.onreadystatechange = function(){
        if (iframe.readyState == "complete"){
            //alert("Local iframe is now loaded.");
            $('#alertmsg123').html('加载完成');
            setTimeout(function(){
            	$('.right').find('#alertmsg123').remove();
            },200);
        }
		if(iframe.readyState == "error")
        {
        	$('#alertmsg123').html('加载失败');
        }
    };
} else {
    iframe.onload = function(){
    	if(iframe.readyState == 'complete'){
    		$('#alertmsg123').html('加载完成');
    		 setTimeout(function(){
            	$('.right').find('#alertmsg123').remove();
            },200);   
    	}else{
    		$('#alertmsg123').html('加载失败');
    	}                    
    };
}
}
}); 