/*导航树插件*/
var htmls = "";
$.fn.extend(
{
	// body...
	//params
	//...
	//funcbody
	navigation:function(urlordata,type){		
		switch(type){
			case 'url':
				$(this)._typeofUrl(urlordata,this);
			break;
			case 'data':
				$(this)._getParentLength(urlordata,this);
				
				$(this).append(htmls);
				$(this)._setMenuPanel();
		$(this)._setHiddeOrShowMenu();
				//alert(htmls);
			break;
			default:
				$(this)._typeofUrl(urlordata,this);
				
			break;			
		}

	},
	_typeofUrl:function(url,obj){
		$(obj).load(url,null,function(response,status,xhr){
			$(this)._setMenuPanel();
			$(this)._setHiddeOrShowMenu();
		});
	},
	_typeofData:function(data,obj){				
		//遍历树结构
		htmls += "<ul>";	

		if(data != null && data.length > 0)	{
		for (var i = 0; i < data.length; i++) {
			var isexpend = data[i].isexpend;
			if(typeof(isexpend) == "undefined"){
				isexpend = false;
			}
			//alert($(obj).html());
			//判断是否是父节点，如果相等则是 反之则否
			if((data[i].pid == data[i].id)|| (data[i].children != null && data[i].children.length > 0)){				
				htmls += "<li isexpend=\""+ isexpend +"\"><span style=\"padding: 0 5px;\" class=\"glyphicon "+ data[i].iconCls +"\"></span>"+data[i].name;			
				if(data[i].children != null){
					$(obj)._typeofData(data[i].children,obj);
				}
			} else {
				htmls += "<li><a link-href=\""+ data[i].url +"\">"+data[i].name+"</a></li>";	
			}
		}
	} else {

		//htmls += "<li><span class=\"glyphicon glyphicon-asterisk\"></span>"+data[i].name;			
	}
		htmls += "</li></ul>";
	},
	_getParentLength:function(data,obj){
		htmls+="<ul>";
		for (var i = 0; i < data.length; i++) {
			var isexpend = data[i].isexpend;
			if(typeof(isexpend) == "undefined"){
				isexpend = false;
			}
			//alert(data.iconCls);
			htmls += "<li isexpend=\""+ isexpend +"\"><span style=\"line-height:35px\"><div><span style=\"padding: 0 5px;\" class=\"glyphicon "+ data[i].iconCls +"\"></span>"+data[i].name+"<span class=\"glyphicon glyphicon-plus extend\"></span></div></span> ";						
			if(data[i].children!=null && data[i].children.length > 0){
				$(this)._typeofData(data[i].children,obj);
			}
			htmls+="</li>";			
			//alert(htmls);
		};

		htmls+="</ul>";
		
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
		$(this).find('a').parent('li').each(function(i,element){
			$(element).bind('click',function(){
				//alert($(this).children('a').html());
				//$(this).attr('isexpend',false);	
				$(obj).find('li').each(function(){
					if($(this).hasClass('click')){
						$(this).removeClass('click');
					}
				});
				
				$(this).attr('class','click');
				//加载自定义url
				var url = $(this).children('a').attr('link-href');
				var title = $(this).children('a').html();
				$('.tab').initTab(url,title);
				
				$(this).children('ul').css('display','');
				return false;
			});
		});
		//遍历父菜单
		$(this).find('ul').parent('li').each(function(i,element){				
				$(this).children('ul').css('border-left','1px dotted #000');
				var j = $(this).attr('isexpend');
				if(j == 'true'){				

					$(this).children('span').children('div').children('span:nth-child(2)').addClass('glyphicon-plus');
				}else if(j == 'false'){			
				//alert(j);		
					$(this).children('span').children('div').children('span:nth-child(2)').addClass('glyphicon-minus');
				}

				$(element).bind('click',function(){	
					$(this).find('ul').addClass('fd');
				//alert("1");
				var p = $(this).attr('isexpend');
				//alert(p);
				if(p != 'undefined'){
					//alert($(this).children('ul').length);
					//alert(p);
					if(p == 'true'){
					//alert("true");
					$(this).attr('isexpend',false);	
					$(this).children('ul').css('display','');
					$(this).children('span').children('div').children('span:nth-child(2)').removeClass('glyphicon-plus');
					$(this).children('span').children('div').children('span:nth-child(2)').addClass('glyphicon-minus');
					}else if(p == 'false'){
						//alert("false");
						$(this).attr('isexpend',true);	
						$(this).children('ul').css('display','none');
						$(this).children('span').children('div').children('span:nth-child(2)').removeClass('glyphicon-minus');
						$(this).children('span').children('div').children('span:nth-child(2)').addClass('glyphicon-plus')
					}
				}
				return false;
			});
			//alert(ishasa);
			
		});		
	},
	_setdefault:function(){

	}
});