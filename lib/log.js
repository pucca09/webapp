/**
 * Created by chh on 2015/3/13.
 * description:
 *      读取config中的logconfig配置，为每个服务进程设定日志输出
 * Usage:
 *      var logger = log4js.getLogger('b');
 *      logger可以输出的日志等级在INFO之上，包括WARN，ERROR。之下的有DEBUG等
 *      logger.setLevel('INFO');
 *      这条信息等级为info
 *      logger.info("a");
 *   output is [2015-03-14 03:49:12.091] [INFO] b - a
 */
var logconfig=require("../config.js").config.logconfig;
var log4js = require('log4js');
var path=require("path");
var fs=require("fs");
logconfig.forEach(function(x, index, array) {
    path.dirname(x);
    if (x.type == "file") {
        var dir=path.dirname(x.filename);
        if(!fs.existsSync(dir))
            fs.mkdirSync(dir);
        //多进程部署时，同一个日志文件会出现问题，用pid区分
        //logconfig[index].filename=logconfig[index].filename+"_"+process.pid+"_";
    }
});
log4js.configure({
    appenders: logconfig
});
exports.log4js=log4js;