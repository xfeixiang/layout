/* File Created: 十二月 9, 2014 */
require.config({
    paths: {
        jquery: 'jquery-1.9.1.min',
        dialog:'jquery.dialog',
        tab:'jquery.tab',
        tree:'jquery.tree',        
        defineV:'dialogFun'
    }
});

require(['jquery'],function  () {
	require(['dialog','tab','tree'],function(){
	// body...
	require(['defineV'],function (defineV) {
		<!--弹出框-->
		$('#alertXX').bind('click',function(){
			defineV.alertA();
		});
		<!--确认框-->
		$('#confirmXX').bind('click',function(){
			defineV.confirmA();
		});
		<!--窗口-->
		$('#windowXX').bind('click',function(){
			defineV.windowA();
		});

		<!--初始化树-->
            var data =[{
        "name": "个人中心",
        "id": "0",
        "pid": "0",
        "isexpend":false,
        "iconCls":"glyphicon-home",
        "children": [
            {
                "id": "1",
                "pid": "0",
                "name": "个人信息管理",
                "iconCls":"glyphicon-user"                             
            },
            {
                "id": "2",
                "pid": "0",
                "name": "文章管理",
                "url":"http://www.baidu.com",
                "iconCls":"glyphicon-list-alt"
            },
            {
                "id": "3",
                "pid": "0",
                "url":"http://www.xfeixiang.com",
                "name": "分类管理",
                "iconCls":"glyphicon-bookmark"
            }
        ]
    }
];
        //$("#menu").initTree(data,"data");
         $("#menu").initTree('navigation.htm',"url");
        $('.layout').height(document.body.clientHeight);

        <!--退出按钮功能-->
        $('#loginout').bind('click',function(){
        	defineV.confirmA();
        });
	});
});
});