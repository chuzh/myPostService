'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var FindAllPosts  = function findAllPosts(req, res){
    var _this = exports;

    var file = path.join(__dirname, '..','..') + '/posts.json';//fixed to work in linux

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
           console.error(err);

            return;
        }

        var posts = JSON.parse(data);

        res.json(200,posts);
    });
};

var FindPostById  = function findPostById(req, res){
    var _this = exports;

    var file = path.join(__dirname, '..','..') + '/posts.json';//fixed to work in linux

    var post_id = req.params.id;
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.error(err);

            return;
        }

        var posts = JSON.parse(data);

        var comments = _.findWhere(posts, {'_id': post_id});

        res.json(200,comments);
    });
};

var exports = module.exports = function (app) {
    var _this = exports;
    _this.app = app;
    _this.findAllPosts = FindAllPosts;
    _this.findPostById = FindPostById;
    return _this;
};