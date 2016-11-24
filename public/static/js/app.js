$(document).ready(function() {

    var audio = new Audio();
    var played = $(".played");
    var cover = document.querySelector("#album > .cover");
    var coverImg = $("#album > .cover > img");
    var title = $("#info > .title");
    var article = $("#info > .article");
    var toggle = $("#album > .toggle");

    var playList = [];
    var index = 0;
    var size = "?param=360y360";

    function _getList() {
        $.getJSON("/api/random", function(data) {
            index = 0;
            playList = data["play_list"];
            _getMusic();
        })
    }

    function _getMusic() {
        var songId = playList[index];
        $.getJSON("/api/getMusic?songId=" + songId, function(data) {
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
        cover.dataset.state = 'running';
        $(".toggle i").removeClass("fa-play").addClass("fa-pause");
    }

    $(audio).on({
        'ended': function() {
            _next();
        },
        'timeupdate': function() {
            var rate = (audio.currentTime / audio.duration) * 100;
            played.attr('style', 'width:' + rate + '%');
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

    $(".toggle").click(function(e) {
        if (audio.paused) {
            audio.play();
            cover.dataset.state = 'running';
            $(".toggle i").removeClass("fa-play").addClass("fa-pause");
        } else {
            audio.pause();
            cover.dataset.state = 'paused';
            $(".toggle i").removeClass("fa-pause").addClass("fa-play");
        }
    })


    function _load() {
        audio.autoplay = true;
        audio.volume = 0.5;
        _getList();
    }

    _load();

})