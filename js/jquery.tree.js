/*导航树插件*/

var htmls = "";
var bootpath = "";
$.fn.extend ({
	initTree:function(urlordata,type){		
		$(this).append("<div id=\"alertmsg123\" style=\"position:absolute;_position:absolute;z-index:1000;width:100%;text-align:center;top:0px;background:url('css/icons/loading.png') no-repeat scroll center center #fff; height:100%;opacity:0.5;padding:100% 0\">正在加载中...</div>");
		switch(type){
			case 'url':
				return $(this)._typeofUrl(urlordata,this);
			break;
			case 'data':
				$(this)._getParentLength(urlordata,this);				
				$(this).append(htmls);
				$('#alertmsg123').html('加载完成');
				$(this).find('#alertmsg123').remove();
				$(this)._setMenuPanel();
				$(this)._setHiddeOrShowMenu();
			break;
			default:
				return $(this)._typeofUrl(urlordata,this);				
			break;
		}
	},
	_typeofUrl:function(url,obj){		
		setTimeout(function(){
		$(obj).load(url,null,function(response,status,xhr){	
			if(status=="success"){
				$(obj).append("<div id=\"alertmsg123\" style=\"position:absolute;_position:absolute;z-index:1000;width:100%;text-align:center;top:0px;background:url('css/icons/loading.png') no-repeat scroll center center #fff; height:100%;opacity:0.5;padding:100% 0\">加载完成...</div>");
				//alert($('#alertmsg123').html());
				$(this)._setMenuPanel();
				$(this)._setHiddeOrShowMenu();
				setTimeout(function(){
					$(obj).find('#alertmsg123').remove();
				},300);
			}			
			if(status=="error") {
				$('#alertmsg123').html("Error: "+xhr.status+": "+xhr.statusText);
			}      				
				
		});
	},300);
	},
	_typeofData:function(data,obj){				
		//遍历树结构
		htmls += '<ul>';
		if(data != null && data.length > 0)	{
		for (var i = 0; i < data.length; i++) {
			var isexpend = data[i].isexpend;
			if(typeof(isexpend) == "undefined"){
				isexpend = false;
			}
			//alert($(obj).html());
			//判断是否是父节点，如果相等则是 反之则否
			if((data[i].pid == data[i].id)|| (data[i].children != null && data[i].children.length > 0)){				
				htmls += "<li data-text=\""+ data[i].name +"\" isexpend=\""+ isexpend +"\"><span style=\"padding: 0 5px;\" class=\"border-radius glyphicon "+ data[i].iconCls +"\"></span>"+data[i].name;			
				if(data[i].children != null){
					$(obj)._typeofData(data[i].children,obj);
				}
			} else {
				htmls += "<li data-text=\""+ data[i].name +"\"><span class=\"glyphicon defineAuto "+ data[i].iconCls +"\"></span><a link-href=\""+ data[i].url +"\">"+data[i].name+"</a><span class=\"\"></span></li>";	
			}
		}
	} else {

		//htmls += "<li><span class=\"glyphicon glyphicon-asterisk\"></span>"+data[i].name;			
	}
		htmls += '</li></ul>';		
	},
	_getParentLength:function(data,obj){
		
		htmls+="<ul>";
		for (var i = 0; i < data.length; i++) {
			var isexpend = data[i].isexpend;
			if(typeof(isexpend) == "undefined"){
				isexpend = 'false';
			}
			//alert(data.iconCls);
			if(isexpend){
				htmls += '<li data-text="'+ data[i].name + '" isexpend="'+ isexpend +'"><span style="line-height:35px"><div><span style="padding: 0 5px;" class="glyphicon '+ data[i].iconCls + '"></span>'+data[i].name+'<span class="glyphicon glyphicon-chevron-up extend"></span></div></span> ';
			}else{
				htmls += '<li data-text="'+ data[i].name + '" isexpend="'+ isexpend +'"><span style="line-height:35px"><div><span style="padding: 0 5px;" class="glyphicon '+ data[i].iconCls + '"></span>'+data[i].name+'<span class="glyphicon glyphicon-chevron-down extend"></span></div></span> ';
			}
									
			if(data[i].children!=null && data[i].children.length > 0){
				$(this)._typeofData(data[i].children,obj);
			}
			htmls+='</li>';			
			//alert(htmls);
		};

		htmls+='</ul>';
		
	},
	_setMenuPanel:function(){
		$(this).find("ul").find('li').each(function(){
			var p = $(this).attr('isexpend');
			
			if(typeof(p) != "undefined" && p == 'true'){
				//alert(p);
				$(this).find('ul').css('display','none');
				$(this).find('ul').addClass('fd');
			}else{
				$(this).find('ul').css('display','');
				$(this).find('ul').addClass('fd');
			}
		});		
	},
	_setHiddeOrShowMenu:function(){
		var obj = this;
		$(this).find('li').each(function(){
			if($(this).hasClass('click')){
				$(this).removeClass('click');
			}
		});
		//遍历子菜单
		$(this).find('a').parent('li').each(function(i,element) {
			if($(this).hasClass('hover')){
				$(this).removeClass('hover');
			}
			$(this).addClass('hover');
			$(element).bind('click',function(){
				$(obj).find('li').each(function(){
					if($(this).hasClass('click')){
						$(this).removeClass('click');
					}
				});
				
				var cl = $(this).attr('class');
				cl+=' click';
				$(this).attr('class',cl);
				//加载自定义url
				var url = $(this).children('a').attr('link-href');
				var title = $(this).children('a').html();
				bootpath = "";
				$(obj)._getBootPath(title,this);
				$('.tab').initTab(url,title,bootpath);
				
				$(this).children('ul').css('display','');
				return false;
			});
		});
		//遍历父菜单
		$(this).find('ul').parent('li').each(function(i,element){				
				$(this).children('ul').css('border-left','1px dotted #000');
				var j = $(this).attr('isexpend');
				$(this).children('span').children('div').children('span:nth-child(2)').removeClass('gglyphicon-chevron-down');
				$(this).children('span').children('div').children('span:nth-child(2)').removeClass('gglyphicon-chevron-up');
					
				if(j == 'true'){			
						
					$(this).children('span').children('div').children('span:nth-child(2)').addClass('glyphicon-chevron-up');
				} else{			
				//alert(j);		
					$(this).children('span').children('div').children('span:nth-child(2)').addClass('gglyphicon-chevron-down');
				}

				$(element).bind('click',function(){	
					$(this).find('ul').addClass('fd');
				//alert("1");
				var p = $(this).attr('isexpend');
				//alert(p);
				if(typeof(p) != 'undefined'){
					//alert($(this).children('ul').length);
					//alert(p);
					if(p == 'true'){
					//alert("true");
					$(this).attr('isexpend',false);	
					$(this).children('ul').css('display','');
					$(this).children('span').children('div').children('span:nth-child(2)').removeClass('glyphicon-chevron-up');
					$(this).children('span').children('div').children('span:nth-child(2)').addClass('glyphicon-chevron-down');
					}else if(p == 'false'){
						//alert("false");
						$(this).attr('isexpend',true);	
						$(this).children('ul').css('display','none');
						$(this).children('span').children('div').children('span:nth-child(2)').removeClass('glyphicon-chevron-down');
						$(this).children('span').children('div').children('span:nth-child(2)').addClass('glyphicon-chevron-up')
					}
				}
				return false;
			});
			//alert(ishasa);
			
		});		
	},
	_getBootPath:function(title,ooj){		
		var obj = this;
		var tmp = "";
		bootpath = "";
		var tmpObj = "";
		var tmpP = "";
		$(this)._getparentP(ooj);
		//遍历父菜单
		$(this).children('ul').children('li').each(function(i,element){	
			var ij = 0;
			var obj1 = this; 	
			$(this).find('ul').children('li').each(function(j,elel){
				ij++;
				var t = $(this).attr('data-text');		
				if(t == title){
					//alert(ij);
					return false;					
				}
			});		

			return false;	
		});
	},
	_getparentP:function(obj){
		var par = $(obj).parent('ul').parent('li');
		//有父节点
		if(typeof(par) != 'undefined'){			
			bootpath += par.attr('data-text')+'>,';
			
			par.each(function(i,j){
				$(this)._getparentP(this);
			});			
		}else{
			bootpath = par.attr('data-text');
		}
	},
	_pushMenuToArray:function(array){
		var tmp = "";
		for (var i = 0; i < array.length-1; i++) {
			tmp = array[i];
			array[i]= array[i+1];
			array[i+1] = tmp;
		};
		//alert(array);
	}
});