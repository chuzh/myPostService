'use strict';

var SystemInfo = function (req, res) {
    var _this = exports;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var versionInfo = _this.versionParser().getVersionInfo();
    var result = {
        env: process.env.NODE_ENV || 'development',
        versionInfo: versionInfo
    };
    _this.httpHelper.sendFormattedResponse(null, result, null, res);
};

var exports = module.exports = function (app) {
    var _this = exports;
    _this.app = app;
    _this.systemInfo = SystemInfo;
    return _this;
};