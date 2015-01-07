require.config({
    paths: {
        jquery: 'jquery-1.9.1.min',
        dialog:'jquery.dialog',
        tree:'jquery.tree',
        tab:'jquery.tab',
        defineV:'dialogFun'
    }
});

require(['jquery','dialog','tree','tab'],function  () {
	// body...
	require(['defineV'],function (defineV) {
		defineV.outPutTree();
	});
});