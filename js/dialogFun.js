　define(function (){
        var alertX = null;
        //定义确认框对象
        var confirmX = null;
        //定义窗口对象
        var windowX = null;
        alertX = jQuery.dialog.alert;
        confirmX = jQuery.dialog.confirm;
        windowX = jQuery.dialog.window;
　　　　var alertW = function () {
                alertX("提示信息", "这是自定义对话框",true, function () {
                    $.dialog.alert("提示信息", "关闭了");
                });
        };
        var confirmW = function () {
                confirmX("提示信息", "这是确认框", true,function () {
                    $.dialog.alert("提示信息", "确认了",true);
                });
        };
        var windowW = function () {
                windowX("窗口标题", "demo.htm","0", function () {
                    $.dialog.alert("提示信息", "保存了");
                });
        };
　　　　return {            
            alertA: alertW,
            confirmA:confirmW,
            windowA: windowW
　　　　};
　　});
     