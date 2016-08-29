"use strict"

var nAudio = document.querySelector("#song");
var cover = document.querySelector('#cover');
var play = document.querySelector("#play");
var next = document.querySelector('#next');
var played = document.querySelector('#played');
var progress = document.querySelector('.progress');


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
        if (song.mp3Url === "") {
            //弹出提示， 然后下一首。
            next();
        }
        document.querySelector("#cover img").setAttribute('src', song.album_url);
        document.querySelector("#info>h1").innerHTML = song.name;
        document.querySelector("#info>p").innerHTML = song.artists.join("/");
        nAudio.setAttribute('src', song.mp3Url);
        toggle();
    })
}

var next_music = function () {
    load();
}

var toggle = function () {
    if (nAudio.paused) {
        nAudio.play();
        play.innerHTML = `
        <svg viewBox="0 0 32 32" width="32" height="32">
            <use xlink:href="k/i/icon-sprite.svg#si-awesome-pause"></use></svg>
        </svg>`;
    } else {
        nAudio.pause();
        play.innerHTML = `
        <svg viewBox="0 0 32 32" width="32" height="32">
            <use xlink:href="k/i/icon-sprite.svg#si-awesome-play"></use></svg>
        </svg>`;
    }
}

var reset_cover = function () {
    var cover_height = cover.offsetHeight + "px";
    cover.setAttribute("style","width:" + cover_height);
}

nAudio.addEventListener('ended', function(e) {
    next_music();
});

nAudio.addEventListener('timeupdate', function(e) {
    //播放时间处理， 进度条，歌词...
    var rate = (nAudio.currentTime / nAudio.duration) * 100;
    played.setAttribute("style", "width:" + rate + "%");
});

play.addEventListener('click', function(e) {
    toggle();
})

next.addEventListener('click', function(e) {
    next_music();
})

progress.addEventListener('mousedown', function(e) {
    nAudio.currentTime = (e.clientX / progress.offsetWidth) * nAudio.duration;
})


window.onload = function () {
    reset_cover();
    load();
}
