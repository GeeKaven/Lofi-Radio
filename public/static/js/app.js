$(document).ready(function() {

    var audio = new Audio();
    var played = $(".played");
    var loaded = $(".loaded");
    var cover = $("#album > .cover")
    var coverImg = $("#album > .cover > img")
    var title = $("#info > .title");
    var article = $("#info > .article");
    var toggle = $("#album > .toggle");

    var playList = [];
    var index = 0;
    var size = "?param=360y360";

    function _getList() {
        $.getJSON("/api/random", function(data) {
            console.log(data["play_list"]);
            index = 0;
            playList = data["play_list"];
            console.log(playList);
            _getMusic();
        })
    }

    function _getMusic() {
        var songId = playList[index];
        $.getJSON("/api/getMusic?songId=" + songId, function(data) {
            console.log(data);
            if (typeof data['mp3'] == 'undefined') {
                _next();
            } else {
                _render(data);
            }
        })
    }

    function _next() {
        index++;
        if (index > playList.length) {
            _getList();
        } else {
            _getMusic();
        }
    }

    function _render(data) {
        title.text(data['song'] + ' - ' + data['album_name']);
        article.text(data['articles'].join(' / '));
        coverImg.attr('src', data['album_url'] + size);
        audio.src = data['mp3'];
    }

    $(audio).on({
        'ended': function() {
            _next();
        },
        'playing': function() {

        },
        'pause': function() {

        },
        'timeupdate': function() {
            var rate = (audio.currentTime / audio.duration) * 100;
            played.attr('style', 'width:' + rate + '%');
        },
        'progress': function() {
            if (audio.buffered.length > 0) {
                var bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
                var rate = (bufferedEnd / audio.duration) * 100;
                if (audio.duration > 0) {
                    loaded.attr('style', 'width:' + rate + '%');
                }
            }
        },
        'error': function() {
            console.log("Fetch Error !!");
        }
    });

    $(".home").click(function(e) {
        window.open("http://xiaok.me");
    });

    $(".source").click(function(e) {
        window.open("https://github.com/GeeKaven/NekoFM");
    });

    $(".next").click(function(e) {
        _next();
    })


    function _load() {
        audio.autoplay = true;
        audio.volume = 0.5;
        _getList();
    }

    _load();

})