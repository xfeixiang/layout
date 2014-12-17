$.fn.initTab = function  (url,title) {
	// body...
	var i = -1;
	$(this).children('ul').children('li').each(function(index,element){
		var title1 = $(this).children('a').html();
		if(title1 == title) {			
			//$(this).after('<li><a>'+ title +'</a></li>');			
			//$(this).remove();
		}
	});
	if(i < 0){
		//$(this).children('ul').append('<li><a>'+ title +'</a></li>');
	}	
	//查找根目录
	$('#menu').children('ul').find('li').each(function(){
		//var select_title = $(this).attr('');

	});
	document.getElementById('mainFrame').src = url;
}