'use strict';exports.__esModule = true;var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _indexCtrl = require('../controllers/indexCtrl');var _indexCtrl2 = _interopRequireDefault(_indexCtrl);
var _musicCtrl = require('../controllers/musicCtrl');var _musicCtrl2 = _interopRequireDefault(_musicCtrl);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _koaRouter2.default)();

router.
get('/', _indexCtrl2.default).
get('/api/buildList', _musicCtrl2.default.buildList).
get('/api/getMusic', _musicCtrl2.default.getMusic).
get('/api/getPlayList', _musicCtrl2.default.getPlayList);exports.default =

router;module.exports = exports['default'];

//# sourceMappingURL=index.js.map