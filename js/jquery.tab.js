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
	document.getElementById('mainFrame').src = url;
}
}); 