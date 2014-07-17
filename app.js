'use strict';

// newrelic
switch (process.env.NEW_RELIC) {
    case 'true':
        require('newrelic');
        break;
}

// requires
var express = require('express');
var async = require('async');
var path = require('path');
// setup server variables
var http = require('http');

//export itself
var exports = module.exports = express();

var defaultCallback = function () {
};

if (module.parent) {
    initializeExports();
    initializeSIGTerm();
    initializeGlobalConfiguration();
    initializeExpress();
    initializeErrorHandler();
    initializeRouting();
} else {
    async.series([
        function (cb) {
            initializeExports(cb);
        },
        function (cb) {
            initializeSIGTerm(cb);
        },
        function (cb) {
            initializeExpress(cb);
        },
        function (cb) {
            initializeRouting(cb);
        },
        function (cb) {
            initializeAPIServer(cb);
        }
    ], function (err) {
        var _this = exports;
        if (err) {
            console.error(err.message);
        }
        else {
            console.log('Initialization Complete');
        }
    });
}

function initializeExports(cb) {
    var _this = exports;
    cb = cb || defaultCallback;

    _this.config = require('./config/server').config;

    cb();
}

function initializeSIGTerm(cb) {
    var _this = exports;
    cb = cb || defaultCallback;
    // initialize server from the ground up
    console.log('Initializing SIGTERM');
    process.on('SIGTERM', function () {
        console.log('API Shutting Down');
    });
    cb();
};

function initializeGlobalConfiguration(cb) {
    var _this = exports;
    cb = cb || defaultCallback;
    cb();
};

function initializeExpress(cb) {
    var _this = exports;
    cb = cb || defaultCallback;
    console.log('Initializing Express Server');
    // all environments
    _this.set('port', process.env.PORT || 10000);
    _this.set('environment', process.env.NODE_ENV || 'development');
    _this.set('views', __dirname + '/views');
    _this.use(express.favicon());
    _this.use(express.logger('dev'));
    _this.use(express.bodyParser());
    _this.use(express.methodOverride());
    _this.use(express.cookieParser('castapre5rewRUCrEr2Gu_6?2+-Hufu4'));
    _this.use(express.session({
        secret: 'r7$R_9h$dunuxenUpas4+s$U*e$h9jan'
    }));
    _this.use(_this.router);
    _this.use('/api', express.static(path.join(__dirname, 'public')));
    _this.use('/api/docs', express.static(path.join(__dirname, 'docs')));
    cb();
};


function initializeRouting(cb) {
    var _this = exports;
    cb = cb || defaultCallback;
    console.log('Initializing Routes');
    _this.apiRoutes = require('./config/routes')(_this);
    _this.apiRoutes.initializeRoutes();
    _this.options('/*', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, usertoken');
        res.send(200);
    });
    cb();
};

function initializeAPIServer(cb) {
    var _this = exports;
    cb = cb || defaultCallback;
    console.log('Initializing API Server');
    http.createServer(_this).listen(_this.get('port'), function () {
        console.log('API Server Listening @ Port: ' + _this.get('port'));
        console.log('Environment: ' + _this.get('environment'));
        cb();
    });
};
