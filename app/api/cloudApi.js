'use strict';var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var crypto = require('crypto');
var request = require('superagent');
var bigInt = require('big-integer');

var MODULE = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
var NONCE = '0CoJUm6Qyw8W8jud';
var PUBKEY = '010001';
var VI = '0102030405060708';
var COOKIE = 'os=pc; osver=Microsoft-Windows-10-Professional-build-10586-64bit; appver=2.0.3.131777; channel=netease; __remember_me=true';

var header = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip,deflate,sdch',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'music.163.com',
    'Referer': 'http://music.163.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.157 Safari/537.36' };


function fetch(url, data) {

    return new _promise2.default(function (resolve, reject) {
        request.
        post(url).
        send(data).
        set('Cookie', COOKIE).
        set(header).
        timeout(5000).
        end(function (error, res) {
            error ? reject(error) : resolve(res);
        });
    });
}

function addPadding(encText, modulus) {
    var ml = modulus.length;
    for (var i = 0; ml > 0 && modulus[i] == '0'; i++) {ml--;}
    var num = ml - encText.length,prefix = '';
    for (var _i = 0; _i < num; _i++) {
        prefix += '0';
    }
    return prefix + encText;
}

function buildSecretKey(length) {
    var keys = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var key = '';
    for (var i = 0; i < length; i++) {
        var pos = Math.floor(Math.random() * keys.length);
        key += keys.charAt(pos);
    }

    return key;
}

function encodeQueryData(data) {
    var params = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var value = data[key];
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
    }
    return params.join('&');
}

function encrypt(raw) {
    var secretKey = buildSecretKey(16);
    var data = {
        'params': aesEncrypt(aesEncrypt((0, _stringify2.default)(raw), NONCE), secretKey),
        'encSecKey': rsaEncrypt(secretKey) };

    return data;
}

function aesEncrypt(data, secKey) {
    var cipher = crypto.createCipheriv('aes-128-cbc', secKey, VI);
    return cipher.update(data, 'utf-8', 'base64') + cipher.final('base64');
}

function rsaEncrypt(secKey) {
    var rText = '',
    radix = 16;
    for (var i = secKey.length - 1; i >= 0; i--) {
        rText += secKey[i];
    }
    var biText = bigInt(new Buffer(rText).toString('hex'), radix),
    biEx = bigInt(PUBKEY, radix),
    biMod = bigInt(MODULE, radix),
    biRet = biText.modPow(biEx, biMod);
    return addPadding(biRet.toString(radix), MODULE);
}

var CloudMusicAPI = {
    getDetail: function getDetail(songId) {
        var url = "http://music.163.com/weapi/v3/song/detail?csrf_token=";
        var data = {
            'c': (0, _stringify2.default)({ 'id': songId }),
            'csrf_token': '' };

        return fetch(url, encrypt(data));
    },

    getPlayList: function getPlayList(playListId) {
        var url = "http://music.163.com/weapi/v3/playlist/detail?csrf_token=";
        var data = {
            'id': playListId,
            'n': 1000,
            'csrf_token': '' };

        return fetch(url, encrypt(data));
    },

    getArtist: function getArtist(artistId) {
        var url = 'http://music.163.com/weapi/v1/artist/' + $artist_id + '?csrf_token=';
        var data = {
            'csrf_token': '' };

        return fetch(url, encrypt(data));
    },

    getAlbum: function getAlbum(albumId) {
        var url = 'http://music.163.com/weapi/v1/album/' + $album_id + '?csrf_token=';
        var data = {
            'csrf_token': '' };

        return fetch(url, encrypt(data));
    },

    getUrl: function getUrl(songId) {var br = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 999000;
        var url = 'http://music.163.com/weapi/song/enhance/player/url?csrf_token=';
        var data = {
            'ids': songId,
            'br': br,
            'csrf_token': '' };

        return fetch(url, encrypt(data));
    },

    getLyric: function getLyric(songId) {
        var url = 'http://music.163.com/weapi/song/lyric?csrf_token=';
        var data = {
            'id': songId,
            'os': 'pc',
            'lv': -1,
            'kv': -1,
            'tv': -1,
            'csrf_token': '' };

        return fetch(url, encrypt(data));
    },

    getMv: function getMv(mvId) {
        var url = 'http://music.163.com/weapi/mv/detail?csrf_token=';
        var data = {
            'id': mvId,
            'csrf_token': '' };

        return fetch(url, encrypt(data));
    },

    search: function search(_search) {var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var url = 'http://music.163.com/weapi/cloudsearch/get/web?csrf_token=';
        var data = {
            's': _search,
            'type': type,
            'limit': limit,
            'total': 'true',
            'offset': offset,
            'csrf_token': '' };

        return fetch(url, encrypt(data));
    } };


module.exports = CloudMusicAPI;
//# sourceMappingURL=cloudApi.js.map