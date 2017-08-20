/**
 * 系统公共JS、CSS文件统一引用入口
 * @author 李智贤
 * @data 2015-09-10
 */

/*HTML5 Shiv 和 Respond.js 用于让 IE8 支持 HTML5元素和媒体查询*/
/* 注意： 如果通过 file://  引入 Respond.js 文件，则该文件无法起效果*/
	
//系统公共JS文件对象
var common_js_files = [
                       'js/html5shiv.min.js',
                       'js/bootstrap-select.js',
                       'plugin/table/bootstrap-table.min.js',
                       'plugin/table/bootstrap-table-zh-CN.min.js',
                       'plugin/table/bootstrap-table-edit.js'
                       
                   ];
//系统CSS文件对象
var common_css_files = [
                        'plugin/table/bootstrap-table.min.css'
                   ];

/**
 * 导入CSS文件
 */
for(var i = 0; i < common_css_files.length; i++){
	document.write("<link rel='stylesheet' type='text/css' href='"+common_css_files[i]+"'>");
}
/**
 * 导入JS文件
 */
for(var i = 0; i < common_js_files.length; i++){
	document.write("<script type='text/javascript' src='"+common_js_files[i]+"'></script>");
}

