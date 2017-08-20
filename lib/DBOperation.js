/**
 * Created by chh on 2015/3/13.
 */
var dbconfig = require('../config.js').config.dbconfig;
var MongoClient = require('mongodb').MongoClient;
var log4js = require("./log.js").log4js
var assert = require("assert");

var logger = log4js.getLogger('database');
logger.setLevel('DEBUG');
var db = {};
MongoClient.connect(dbconfig.mongodb_url, function (err, database) {
    if (err != null) {
        logger.error("mongodb can't be connected!");
        process.exit(-1);
    }else
        logger.debug("success: mongodb has been connected!");
    db = database;
    var adminDb = db.admin();
    adminDb.authenticate('lxs', 'laoxuanshi', function(err, result) {
    });
});

function insert(collectionString, documentJSON) {
    var col = db.collection(collectionString);
    col.insertOne(documentJSON, function (err, result) {
        var str;
        if (err != null) {
            str = "inserting into mongodb fails," + err.message;
            logger.warn(str);
        }
        else if (result == null || result.insertedCount!=1) {
            str = "inserting into mongodb fails," + err.message + ",collection=" + collectionString + ",document=" + JSON.stringify(documentJSON);
            logger.warn(str);
        }else {
            str = "success: inserting "+JSON.stringify(documentJSON)+" into mongodb collection: "+ collectionString;
            //logger.debug(str);
        }
    })
}

function insertback(collectionString, documentJSON,callback) {
    assert(callback != null && typeof callback == "function" );
    var col = db.collection(collectionString);
    col.insertOne(documentJSON, function (err, result) {
        var str;
        if (err != null) {
            str = "inserting into mongodb fails," + err.message;
            logger.warn(str);
        }
        else if (result == null || result.insertedCount!=1) {
            str = "inserting into mongodb fails," + err.message + ",collection=" + collectionString + ",document=" + JSON.stringify(documentJSON);
            logger.warn(str);
        }else {
            str = "success: inserting "+JSON.stringify(documentJSON)+" into mongodb collection: "+ collectionString;
            logger.debug(str);
        }
        callback(err, JSON.stringify(documentJSON));
    })
}

function read(collectionString, documentJSON, callback) {
    assert(callback != null && typeof callback == "function" );
    var col = db.collection(collectionString);
    col.findOne(documentJSON, function (err, item) {
        if (err != null) {
            var str = "reading mongodb fails," + err.message + ",collection=" + collectionString + ",document=" + JSON.stringify(documentJSON);
            logger.warn(str);
        }else{
            var str = "success: reading "+JSON.stringify(item)+" from mongodb collection: "+collectionString;
            //logger.debug(str);
        }
        callback(err, item);
    })
}

function readall(collectionString, documentJSON, callback) {
    assert(callback != null && typeof callback == "function" );
    var col = db.collection(collectionString);
    col.find(documentJSON).toArray(function (err, item) {
        if (err != null) {
            var str = "reading mongodb fails," + err.message + ",collection=" + collectionString + ",document=" + JSON.stringify(documentJSON);
            logger.warn(str);
        }else{
            var str = "success: reading "+JSON.stringify(item)+"from mongodb collection: "+collectionString;
            //logger.debug(str);
        }
        callback(err, item);
    });
}

function readallseq(collectionString, documentJSON, sortJSON,callback) {
    assert(callback != null && typeof callback == "function" );
    var col = db.collection(collectionString);
    col.find(documentJSON).sort(sortJSON).toArray(function (err, item) {
        if (err != null) {
            var str = "reading mongodb fails," + err.message + ",collection=" + collectionString + ",document=" + JSON.stringify(documentJSON);
            logger.warn(str);
        }else{
            var str = "success: reading "+JSON.stringify(item)+"from mongodb collection: "+collectionString;
            //logger.debug(str);
        }
        callback(err, item);
    });
}

function update(collectionString, documentJSON1,documentJSON2,callback) {
    assert(callback != null && typeof callback == "function" );
    var col = db.collection(collectionString);
    col.updateOne(documentJSON1,documentJSON2, {upsert:true},function (err, item) {
        if (err != null) {
            var str = "updating mongodb fails," + err.message + ",collection=" + collectionString + ",document=" + JSON.stringify(documentJSON1);
            logger.warn(str);
        }else{
            //var str = "success: updating "+JSON.stringify(item)+" from mongodb collection: "+collectionString;
            //logger.debug(str);
        }
        callback(err, item);
    });
}

function deletedb(collectionString, documentJSON1,callback) {
    assert(callback != null && typeof callback == "function" );
    var col = db.collection(collectionString);
    col.removeOne(documentJSON1,{safe:true},function (err, item) {
        if (err != null) {
            var str = "deleting mongodb fails," + err.message + ",collection=" + collectionString + ",document=" + JSON.stringify(documentJSON1);
            logger.warn(str);
        }else{
            var str = "success:deleting mongodb "+JSON.stringify(item)+" from mongodb collection: "+collectionString;
            logger.debug(str);
        }
        callback(err, item);
    });
}

function deletealldb(collectionString,callback) {
    assert(callback != null && typeof callback == "function" );
    var col = db.collection(collectionString);
    col.removeMany({},{safe:true},function (err, item) {
        if (err != null) {
            var str = "deleting mongodb fails," + err.message + ",collection=" + collectionString + ",document=" + JSON.stringify(documentJSON1);
            logger.warn(str);
        }else{
            var str = "success:deleting mongodb "+JSON.stringify(item)+" from mongodb collection: "+collectionString;
            logger.debug(str);
        }
        callback(err, item);
    });
}

function createIdx(collectionString, documentJSON1, indexName) {
    var col = db.collection(collectionString);
    col.createIndex(documentJSON1, {"name":indexName}, function(err, result) {
        console.log(err);
        console.log(result);
    });
}

exports.insert=insert;
exports.insertback=insertback;
exports.read=read;
exports.readall=readall;
exports.readallseq=readallseq;
exports.update=update;
exports.deletedb=deletedb;
exports.deletealldb=deletealldb;
exports.createIdx=createIdx;
exports.close=function(){db.close();};