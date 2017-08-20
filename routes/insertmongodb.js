/**
 * Created by laoxuanshi on 2015/6/13.
 *
 */
var db=require('../lib/DBOperation.js');
var rf=require("fs");

exports.inserttable4= function(req, res){
    var data=rf.readFileSync("./public/source/liuliang&guishu/scenicCustomerFlowByProvByDay.csv","utf-8");
    var dataline=data.split('\n');
    for(i=0;i<dataline.length;i++)
    {
        var nn=dataline[i].split(',');
        var temp=[];
        for(j=2;j<33;j++)
            temp.push(parseInt(nn[j]));
        db.insert('scenicCustomerFlowByProvByDay',{sightid:parseInt(nn[0]),date:nn[1].toString(),visitorflowbypro:temp});
    }
};

exports.inserttable8= function(req, res){
    var data=rf.readFileSync("./public/source/liuliang&guishu/migrationBetweenScenicSpotTotal.csv","utf-8");
    var dataline=data.split('\n');
    for(i=1;i<dataline.length;i++)
    {
        var nn=dataline[i].split(',');
        db.insert('migration',{inname:nn[0].toString(),outname:nn[1].toString(),count:parseInt(nn[2])});
    }
};

exports.inserttable9= function(req, res){
    var data=rf.readFileSync("./public/source/liuliang&guishu/scenicSpotStayDurCount.csv","utf-8");
    var dataline=data.split('\n');
    for(i=0;i<dataline.length;i++)
    {
        var nn=dataline[i].split(',');
        var temp=[];
        for(j=1;j<6;j++)
            temp.push(parseInt(nn[j]));
        db.insert('scenicSpotStayDurCount',{sightid:parseInt(nn[0]),staydur:temp});
    }
};

exports.inserttable11= function(req, res){
    var data=rf.readFileSync("./public/source/customerHomePlaceCount.csv","utf-8");
    var dataline=data.split('\n');
    for(i=0;i<dataline.length;i++)
    {
        var nn=dataline[i].split(',');
        db.insert('live',{lng:parseFloat(nn[0]),lat:parseFloat(nn[1]),count:parseInt(nn[2])});
    }
};

//更新每个景区当月流量数据
exports.insertscenicindex= function(req, res){
    var data=rf.readFileSync("./public/source/scenicRank.csv","utf-8");
    var dataline=data.split('\n');
    for(i=0;i<dataline.length-1;i++)
    {
        var nn=dataline[i].split(',');
        db.update('scenic',{sightid:parseInt(nn[0])},{$set:{visitormonth:parseInt(nn[1]),stayaverage:parseFloat(nn[2]),stayall:parseFloat(nn[3])}},function (err, item1) {
        });
    }
    res.send('scenic');
};

exports.insertguishubyday= function(req, res){
    var data=rf.readFileSync("./public/source/customerFlowByProvByMonth.csv","utf-8");
    var dataline=data.split('\n');
    for(i=1;i<dataline.length-1;i++)
    {
        var nn=dataline[i].split(',');
        var temp=[];
        for(j=2;j<33;j++)
            temp.push(parseInt(nn[j]));
        db.update('customerFlowByProvByMonth',{date:nn[0].toString(),totalvisitor:parseInt(nn[1])},{$set:{provisitor:temp}},function (err, item) {
        });
    }
    res.send('customerFlowByProvByMonth');
};

exports.insertguishubymonth= function(req, res){
    var data=rf.readFileSync("./public/source/customerFlowByProvByMonth.csv","utf-8");
    var dataline=data.split('\n');
    var nn=dataline[0].split(',');
    var temp=[];
    for(j=2;j<33;j++)
          temp.push(parseInt(nn[j]));
    db.update('guishumap',{date:nn[0].toString()},{$set:{provisitor:temp}},function (err, item) {
    });
    res.send('guishumap');
};

exports.insertguishubysight= function(req, res){
    var data=rf.readFileSync("./public/source/scenicCustomerFlowByProvByMonth.csv","utf-8");
    var dataline=data.split('\n');
    var temp=[];
    for(i=0;i<dataline.length-1;i++)
    {
        var temp1=[];
        var nn=dataline[i].split(',');
        for(j=1;j<32;j++)
            temp1.push(parseInt(nn[j]));
        temp.push({sightid:parseInt(nn[0]),visitornum:temp1});
        temp.sort(function(a,b){return a.sightid> b.sightid?1:-1;});
    }
    //TODO 自动获取当前月份
    db.update('scenicCustomerFlowByProvByMonth',{date:'201512'},{$set:{provisitor:temp}},function (err, item) {
    });
    res.send('scenicCustomerFlowByProvByMonth');
};

//TODO 更新交通方式数据
exports.inserttraffic= function(req, res){
    //var data=rf.readFileSync("./public/source/provinceByTransMode.csv","utf-8");
    //var dataline=data.split('\n');
    //for(i=0;i<dataline.length;i++)
    //{
    //    var nn=dataline[i].split(',');
    //    db.insert('traffic',{prov:nn[0].toString(),selfcar:parseInt(nn[1]),plane:parseInt(nn[2]),train:parseInt(nn[3]),undefine:parseInt(nn[4])});
    //}
};

exports.insertsightflow1= function(req, res){
    var data=rf.readFileSync("./public/source/scenicCustomerFlowByMonth.csv","utf-8");
    var dataline=data.split('\n');
    var temp=[];
    for(i=0;i<dataline.length-1;i++)
    {
        var temp1=[];
        var nn=dataline[i].split(',');
        for(j=2;j<nn.length;j++)
            temp1.push(parseInt(nn[j]));
        temp.push({sightid:parseInt(nn[0]),allflow:parseInt(nn[1]),visitorflowbyday:temp1})
    }
    temp.sort(function(a,b){return a.sightid> b.sightid?1:-1;});
    //TODO 自动获取当前月份
    db.update('scenicCustomerFlowByMonth',{date:'201512'},{$set:{flow:temp}},function (err, item) {
    });
    res.send('scenicCustomerFlowByMonth');
};

exports.insertsightflow2= function(req, res){
    var data=rf.readFileSync("./public/source/scenicCustomerFlowByDay.csv","utf-8");
    var dataline=data.split('\n');
    for(i=0;i<dataline.length-1;i++)
    {
        var nn=dataline[i].split(',');
        var temp=[];
        for(j=9;j<23;j++)
            temp.push(parseInt(nn[j]));
        db.insert('scenicCustomerFlowByDay',{sightid:parseInt(nn[0]),date:nn[1].toString(),visitorflowbyhour:temp});
    }
    res.send('scenicCustomerFlowByDay');
};

exports.insertprostay= function(req, res){
    var data=rf.readFileSync("./public/source/customerStayDaysCount.csv","utf-8");
    var dataline=data.split('\n');
    var temp=[];
    for(i=0;i<dataline.length-1;i++)
    {
        var nn=dataline[i].split(',');
        temp.push({stayday:parseInt(nn[0]),count:parseInt(nn[1])});
    }
    temp.sort(function(a,b){return a.stayday> b.stayday?1:-1;});
    //TODO
    db.update('customerStayDaysCount',{date:'201512'},{$set:{stay:temp}},function (err, item) {
    });
};

exports.insertsightline= function(req, res){
    var data=rf.readFileSync("./public/source/201508/HotRouteForShort.csv","utf-8");
    var dataline=data.split('\n');
    var nn1=dataline[8].split(',');
    var nn2=nn1[0].split('#');
    //db.insert('HotRoute',{date:'201508',mark:'short',routeid:8,name:[],geo:[],count:parseInt(nn1[1])},function (err, item) {});
    for(j=0;j<nn2.length;j++)
    {
        db.read('scenic',{sightid:parseInt(nn2[j])},function(err,item){
            db.update('HotRoute',{date:'201508',mark:'short',routeid:8},{$push:{name:item.sightname,geo:[item.lng,item.lat]}},function (err, item) {
            });
        });
    }
    //TODO
};

exports.insertinandout= function(req, res){
    var data=rf.readFileSync("./public/source/customerInOutDateCount.csv","utf-8");
    var dataline=data.split('\n');
    for(i=0;i<dataline.length-1;i++)
    {
        var nn=dataline[i].split(',');
        db.update('inandout',{date:nn[0].toString()},{$set:{in:parseInt(nn[1]),out:parseInt(nn[2])}},function (err, item) {
        });
    }
    res.send('inandout');
};

exports.insertbenshengselect= function(req, res){
    var data=rf.readFileSync("./public/source/localFeature.csv","utf-8");
    var dataline=data.split('\n');
    for(j=0;j<dataline.length-1;j++)
    {
        var nn=dataline[j].split(',');

        db.update('benshengselect',{date:'201508',userid:nn[0]},{$set:{allcontect:parseInt(nn[1]),incontect:parseInt(nn[2]),outcontect:parseInt(nn[3]),outtime:parseFloat(nn[4]),
            leavetime:parseFloat(nn[5]),rad:parseFloat(nn[6]),monthout:parseInt(nn[7]),mouthouttime:parseFloat(nn[8]),monthsight:parseInt(nn[9]),monthsighttime:parseFloat(nn[10]),
            commute:parseFloat(nn[11]),home:[nn[12],nn[13]],work:[nn[14],nn[15]]}},function (err, item) {
        });
    }
    //TODO
};

exports.insertwaishengselect= function(req, res){
    var data=rf.readFileSync("./public/source/tagsForSelection.csv","utf-8");
    var dataline=data.split('\n');
    for(j=0;j<dataline.length-1;j++)
    {
        var nn=dataline[j].split(',');
        var temp2=[];
        if(nn[18].indexOf('|')>=0) {
            var nn1 = nn[18].split('|');
            for (k = 0; k < nn1.length; k++) {
                if (nn1[k].indexOf('#') >= 0) {
                    var nn2 = nn1[k].split('#');
                    for (l = 0; l < nn2.length; l++) {
                        temp2.push(nn2[l]);
                    }
                }
                else
                    temp2.push(nn1[k]);
            }
        }
        else
            temp2.push(nn[18]);

        db.update('waishengselect',{date:'201512',userid:nn[0]},{$set:{province:nn[1],traffic:nn[2],usertype:nn[3],mianshui:nn[4],daycell:nn[5],sightnum:parseInt(nn[6]),
        sightstay:parseFloat(nn[7]),livefarest:parseFloat(nn[8]),top3:[[nn[9],nn[10]],[nn[11],nn[12]],[nn[13],nn[14]]],livecell:nn[15],liveplace:[nn[16],nn[17]],livetype:temp2}},function (err, item) {
        });
    }
    //TODO
};

exports.inserthotel= function(req, res){
    var data=rf.readFileSync("./public/source/201512/cellHotelMap.csv","utf-8");
    var dataline=data.split('\n');
    for(j=0;j<dataline.length-1;j++)
    {
        var nn=dataline[j].split('|');
        var temp=[]
        var nn1=nn[4].split('#');
        for(k=0;k<nn1.length;k++)
            temp.push(nn1[k]);
        db.update('hotelmap',{date:'201512',cellid:nn[0],hotelid:nn[2]},{$set:{cellkm:parseFloat(nn[1]),hotelname:nn[3],hoteltype:temp}},function (err, item) {
        });
    }
    //TODO
};

exports.insertmotif= function(req, res){
    var data=rf.readFileSync("./public/source/displaytest.txt","utf-8");
    var dataline=data.split('\n');
    for(j=0;j<dataline.length-1;j++)
    {
        var nn=dataline[j].split(',');
        db.update('motif3',{userid:nn[0]},{$set:{num:nn[1],geo:[nn[2],nn[3]]}},function (err, item) {
        });
    }
    //TODO
};

exports.insertbenshengroute= function(req, res){
    var data=rf.readFileSync("./public/source/201512ReprestRtFromHmToWk.csv","utf-8");
    var dataline=data.split('\n');
    for(j=0;j<dataline.length-1;j++)
    {
        var nn=dataline[j].split(',');
        var passby=[];
        for(k=5;k<nn.length;k=k+2)
        {
            passby.push([nn[k],nn[k+1]]);
        }
        db.update('benshenguser',{userid:nn[0]},{$set:{home:[nn[1],nn[2]],work:[nn[3],nn[4]],passby:passby}},function (err, item) {
        });
    }
    //TODO
};

exports.insertdbscan= function(req, res){
    var data=rf.readFileSync("./public/source/dbscan_cluster_center.csv","utf-8");
    var dataline=data.split('\n');
    for(j=1;j<dataline.length-1;j++)
    {
        var nn=dataline[j].split(',');
        db.update('dbscan',{userid:nn[0]},{$set:{point:[nn[1],nn[2]],radius:nn[3],score:nn[4]}},function (err, item) {
        });
    }
    //TODO
};

exports.insertlj= function(req, res){
    var data=rf.readFileSync("./public/source/haikou_afterAddSpot.csv","utf-8");
    var dataline=data.split('\n');
    for(j=0;j<dataline.length-1;j++) {
        var nn = dataline[j].split('->');
        var nn1 = nn[0].split(',');
        var nn2 = nn[1].split(' ');

        var tmp=[]
        for (k = 0; k < nn2.length ; k++){
            var nn3=nn2[k].split(',');
            tmp.push([parseFloat(nn3[1].replace(')',"")),parseFloat(nn3[0].replace('(',""))])
        }
        db.update('hbdlj',{ljid:nn1[0]},{$set:{kind:nn1[1],passby:tmp}},function (err, item) {
        });
    }
    //TODO
};

exports.insertlfjs = function (req, res) {
    var readline = require('readline');
    var fs = require('fs');
    var objReadline = readline.createInterface({
        input: fs.createReadStream('./public/source/201512LocalSubSetTrip.csv')
    });

    objReadline.on('line', function(data) {
        var nn=data.split('#',-1);
        var nn1=nn[2].split(',');
        var nn2=nn[3].split(',');

        if(nn.length==4)
            db.update("lfjs", {"user": nn[0]},{$set: {
                "day": nn[1],
                "startPoint": {"type": "Point", "coordinates": [parseFloat(nn1[0]), parseFloat(nn1[1])], start_time: nn1[2], duration: nn1[3]},
                "endPoint": {"type": "Point", "coordinates": [parseFloat(nn1[0]), parseFloat(nn1[1])], start_time: nn2[2], duration: nn2[3]}
                //"passingBy": passingBy
            } },function (err, item) {
            });
        else{
            var nn3=nn[4].split('$');
            var tmp=[];
            for(k=0;k<nn3.length;k++){
                var nn4=nn3[k].split(',');
                tmp.push({point:[nn4[0],nn4[1]],time:nn4[2],duration:nn4[3]});
            }
            db.update("lfjs", {"user": nn[0]},{$set: {
                "day": nn[1],
                "startPoint": {"type": "Point", "coordinates": [parseFloat(nn1[0]), parseFloat(nn1[1])], start_time: nn1[2], duration: nn1[3]},
                "endPoint": {"type": "Point", "coordinates": [parseFloat(nn2[0]), parseFloat(nn2[1])], start_time: nn2[2], duration: nn2[3]},
                "passingBy": tmp
            } },function (err, item) {
            });
        }
    });

    objReadline.on('close', function(data) {
        console.log('end');
    });
};

exports.createIndex = function (req, res) {
    //db.createIdx("places", {"stopPoint": "2dsphere"}, "stopPointIndex");
    db.createIdx("lfjs", {"startPoint": "2dsphere"}, "startPointIndex");
    db.createIdx("lfjs", {"endPoint": "2dsphere"}, "endPointIndex");
};

exports.insertlfd = function (req, res) {
    var readline = require('readline');
    var fs = require('fs');
    var objReadline = readline.createInterface({
        input: fs.createReadStream('./public/source/20151231170000SubSet.csv')
    });

    objReadline.on('line', function(data) {
        var nn = data.split('#', -1);
        var nn1 = nn[1].split(',');
        var nn2 = nn[2].split(',');

        db.insert("lfd", {
            "time": nn[0],
            "startPoint": {
                "id": nn1[0],
                "coordinates": [parseFloat(nn1[1]), parseFloat(nn1[2])],
                nodeWeight: parseFloat(nn1[3])
            },
            "endPoint": {
                "id": nn2[0],
                "coordinates": [parseFloat(nn2[1]), parseFloat(nn2[2])],
                nodeWeight: parseFloat(nn2[3])
            },
            "weight": parseInt(nn[3])
        });

    });

    objReadline.on('close', function(data) {
        console.log('end');
    });
};