'use strict';exports.__esModule = true;var _getIterator2 = require('babel-runtime/core-js/get-iterator');var _getIterator3 = _interopRequireDefault(_getIterator2);var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _cloudApi = require('../api/cloudApi');var _cloudApi2 = _interopRequireDefault(_cloudApi);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var config = require('../../fm.json');

var listPath = _path2.default.join(__dirname, "../../public/music");exports.default =

{
    getRandomMusic: function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:case 'end':return _context.stop();}}}, _callee, undefined);}));return function getRandomMusic(_x, _x2) {return _ref.apply(this, arguments);};}(),



    buildList: function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {var all, _loop, _iterator, _isArray, _i, _ref3, _ret;return _regenerator2.default.wrap(function _callee2$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

                            all = [];_loop = _regenerator2.default.mark(function _loop() {var item, res, resJSON, trackIds, list, filePath;return _regenerator2.default.wrap(function _loop$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!_isArray) {_context2.next = 6;break;}if (!(_i >= _iterator.length)) {_context2.next = 3;break;}return _context2.abrupt('return', 'break');case 3:_ref3 = _iterator[_i++];_context2.next = 10;break;case 6:_i = _iterator.next();if (!_i.done) {_context2.next = 9;break;}return _context2.abrupt('return', 'break');case 9:_ref3 = _i.value;case 10:
                                                item = _ref3;_context2.next = 13;return (
                                                    _cloudApi2.default.getPlayList(item["id"]));case 13:res = _context2.sent;
                                                resJSON = JSON.parse(res.text);
                                                trackIds = resJSON['playlist']['trackIds'];
                                                list = [];
                                                trackIds.forEach(function (_ref4) {var id = _ref4.id;
                                                    list.push(id);
                                                });
                                                filePath = _path2.default.join(listPath, item["type"] + ".json");
                                                _fs2.default.writeFileSync(filePath, (0, _stringify2.default)(list));
                                                all.push(list);case 21:case 'end':return _context2.stop();}}}, _loop, undefined);});_iterator = config.playList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);case 4:return _context3.delegateYield(_loop(), 't0', 5);case 5:_ret = _context3.t0;if (!(_ret === 'break')) {_context3.next = 8;break;}return _context3.abrupt('break', 10);case 8:_context3.next = 4;break;case 10:

                            _fs2.default.writeFileSync(_path2.default.join(listPath, "all.json"), (0, _stringify2.default)(all));
                            ctx.body = (0, _stringify2.default)(all);_context3.next = 18;break;case 14:_context3.prev = 14;_context3.t1 = _context3['catch'](0);

                            console.log(_context3.t1);
                            ctx.body = null;case 18:case 'end':return _context3.stop();}}}, _callee2, undefined, [[0, 14]]);}));return function buildList(_x3, _x4) {return _ref2.apply(this, arguments);};}(),



    getMusic: function () {var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {var query, detail;return _regenerator2.default.wrap(function _callee3$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                            query = ctx.query;_context4.next = 3;return (
                                _cloudApi2.default.getDetail(query['songId']));case 3:detail = _context4.sent;
                            console.log(detail.text);case 5:case 'end':return _context4.stop();}}}, _callee3, undefined);}));return function getMusic(_x5, _x6) {return _ref5.apply(this, arguments);};}(),


    getPlayList: function () {var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {var query, playList;return _regenerator2.default.wrap(function _callee4$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                            query = ctx.query;_context5.next = 3;return (
                                _cloudApi2.default.getPlayList(query['playList']));case 3:playList = _context5.sent;
                            ctx.body = playList.text;case 5:case 'end':return _context5.stop();}}}, _callee4, undefined);}));return function getPlayList(_x7, _x8) {return _ref6.apply(this, arguments);};}() };module.exports = exports['default'];

//# sourceMappingURL=musicCtrl.js.map