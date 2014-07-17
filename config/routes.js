'use strict';

function homeRoutes(controllers) {
    controllers = controllers || {};
    var _this = exports;
    _this.homeController = controllers.homeController || require(_this.controllersPath + 'home-controller')(_this.app);

    _this.app.get('/api/systemInfo/?', _this.homeController.systemInfo);
}


function postRoutes(controllers) {
    controllers = controllers || {};
    var _this = exports;
    _this.postController = controllers.postController || require(_this.controllersPath + 'post-controller')(_this.app);

    _this.app.get('/api/findAllPosts',
        _this.allowAnyOriginJSON,
        _this.postController.findAllPosts
    );
}

var InitializeRoutes = function (controllers) {
    homeRoutes(controllers);
    postRoutes(controllers);
};

var AllowAnyOriginJSON = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
};

// module specific
var exports = module.exports = function (app) {
    var _this = exports;
    _this.app = app;
    _this.controllersPath = '../app/controllers/';
    _this.allowAnyOriginJSON = AllowAnyOriginJSON;
    _this.initializeRoutes = InitializeRoutes;
    return _this;
};