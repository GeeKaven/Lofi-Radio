const crypto = require('crypto')
const request = require('superagent')
const bigInt = require('big-integer')

const MODULE = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
const NONCE = '0CoJUm6Qyw8W8jud'
const PUBKEY = '010001'
const VI = '0102030405060708'
const COOKIE = 'os=pc; osver=Microsoft-Windows-10-Professional-build-10586-64bit; appver=2.0.3.131777; channel=netease; __remember_me=true'

const header = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip,deflate,sdch',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'music.163.com',
    'Referer': 'http://music.163.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.157 Safari/537.36'
}

function fetch(url, data, callback) {
    let req;
    req = request.post(url).send(data);
    req.set('Cookie', COOKIE);
    req.set(header).timeout(5000).end(callback);
}

function addPadding(encText, modulus) {
    let ml = modulus.length;
    for (i = 0; ml > 0 && modulus[i] == '0'; i++)ml--;
    let num = ml - encText.length, prefix = '';
    for (let i = 0; i < num; i++) {
        prefix += '0';
    }
    return prefix + encText;
}

function buildSecretKey(length) {
    let keys = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let key = ''
    for (let i = 0; i < length; i++) {
        let pos = Math.floor(Math.random() * keys.length);
        key += keys.charAt(pos)
    }

    return key
}

function encodeQueryData(data) {
    let params = []
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let value = data[key];
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
        }
    }
    return params.join('&')
}

function encrypt(raw) {
    let secretKey = buildSecretKey(16)
    let data = {
        'params' : aesEncrypt(aesEncrypt(JSON.stringify(raw), NONCE), secretKey),
        'encSecKey' : rsaEncrypt(secretKey)
    };
    return data;
}

function aesEncrypt(data, secKey) {
    let cipher = crypto.createCipheriv('aes-128-cbc', secKey, VI)
    return cipher.update(data, 'utf-8', 'base64') + cipher.final('base64')
}

function rsaEncrypt(secKey) {
    let rText = '', 
        radix = 16;
    for (let i = secKey.length - 1; i >= 0; i--) {
        rText += secKey[i];
    }
    let biText = bigInt(new Buffer(rText).toString('hex'), radix),
        biEx = bigInt(PUBKEY, radix),
        biMod = bigInt(MODULE, radix),
        biRet = biText.modPow(biEx, biMod);
    return addPadding(biRet.toString(radix), MODULE);
}

let CloudMusicAPI = {
    getDetail : function(songId, callback) {
        let url = "http://music.163.com/weapi/v3/song/detail?csrf_token="
        let data = {
            'c' : JSON.stringify({'id':songId}),
            'csrf_token' : ''
        }
        fetch(url, encrypt(data), callback)
    },

    getPlayList : function(playListId, callback) {
        let url = "http://music.163.com/weapi/v3/playlist/detail?csrf_token="
        let data = {
            'id' : playListId,
            'n' : 1000,
            'csrf_token' : ''
        }
        fetch(url, encrypt(data), callback)
    },

    getArtist : function(artistId, callback) {
        let url = 'http://music.163.com/weapi/v1/artist/' + $artist_id + '?csrf_token='
        let data = {
            'csrf_token' : ''
        }
        fetch(url, encrypt(data), callback)
    },

    getAlbum : function(albumId, callback) {
        let url = 'http://music.163.com/weapi/v1/album/' + $album_id + '?csrf_token=';
        let data = {
            'csrf_token' : ''
        }
        fetch(url, encrypt(data), callback)
    },

    getUrl : function(songId, br = 999000, callback) {
        let url = 'http://music.163.com/weapi/song/enhance/player/url?csrf_token='
        let data = {
            'ids' : songId,
            'br' : br,
            'csrf_token' : ''
        }
        fetch(url, encrypt(data), callback)
    },

    getLyric : function(songId, callback) {
        let url = 'http://music.163.com/weapi/song/lyric?csrf_token='
        let data = {
            'id' : songId,
            'os' : 'pc',
            'lv' : -1,
            'kv' : -1,
            'tv' : -1,
            'csrf_token' : ''
        }
        fetch(url, encrypt(data), callback)
    },

    getMv : function(mvId, callback) {
        let url = 'http://music.163.com/weapi/mv/detail?csrf_token='
        let data = {
            'id' : mvId,
            'csrf_token' : '',
        }
        fetch(url, encrypt(data), callback)
    },

    search : function(search, limit=30, offset=0, type=1, callback) {
        let url = 'http://music.163.com/weapi/cloudsearch/get/web?csrf_token='
        let data = {
            's' : search,
            'type' : type,
            'limit' : limit,
            'total' : 'true',
            'offset' : offset,
            'csrf_token' : ''
        }
        fetch(url, encrypt(data), callback)
    }
}

module.exports = CloudMusicAPI