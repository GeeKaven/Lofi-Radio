"use strict"

var $ = document.querySelector;
var $$ = document.querySelectorAll;
var nAudio = document.getElementById("player");

var _get = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status == 200) {
            var data = xhr.responseText;
            callback(data);
        }
    };

    xhr.send();
}

var load = function () {
    _get("n/player.php", function (data) {
        var song = JSON.parse(data);
        if (song.mp3Url.length === 0) {
            //弹出提示， 然后下一首。
            next();
        }
        nAudio.setAttribute('src', song.mp3Url);
        nAudio.play();
    })
}

var next = function () {
    load();
}

var toggle = function () {
    if (nAudio.paused) {
        nAudio.play();
    } else {
        nAudio.pause();
    }
}

nAudio.addEventListener('ended', function(e) {
    next();
});

nAudio.addEventListener('timeupdate', function(e) {
    //播放时间处理， 进度条，歌词...
});

window.onload = function () {
    load();
}
