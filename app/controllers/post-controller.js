'use strict';
var fs = require('fs');
var path = require('path');

var FindAllPosts  = function findAllPosts(req, res){
    var _this = exports;

    var file = path.join(__dirname, '..','..') + '/posts.json';//fixed to work in linux

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
           console.error(err);

            return;
        }

        var posts = JSON.parse(data);

        res.json(posts);
    });
};

var exports = module.exports = function (app) {
    var _this = exports;
    _this.app = app;
    _this.findAllPosts = FindAllPosts;
    return _this;
};