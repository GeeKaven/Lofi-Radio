<?php
function curl_get($url)
{
    # code...
    $header = [];
    $header[] = 'Referer: http://music.163.com';
    $header[] = 'Cookie: '.'appver=1.5.2';

    $options = [
        CURLOPT_URL => $url,
        CURLOPT_HEADER => 0,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_BINARYTRANSFER => true,
        CURLOPT_HTTPHEADER => $header,
    ];

    $ch = curl_init();
    curl_setopt_array($ch, $options);
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}

/**
 * 获取音乐信息
 * @param  $music_id
 * @return music_info
 */
function get_music_info($music_id)
{
    $url = "http://music.163.com/api/song/detail/?id=" . $music_id . "&ids=%5B" . $music_id . "%5D";
    return curl_get($url);
}

/**
 * 获取歌单信息
 * @param  $playlist_id
 * @return playlist_info
 */
function get_playlist_info($playlist_id)
{
    $url = "http://music.163.com/api/playlist/detail?id=" . $playlist_id;
    return curl_get($url);
}

/**
 * 获取歌词信息
 * @param  $music_id
 * @return lrc_info
 */
function get_lrc($music_id)
{
    $url = "http://music.163.com/api/song/lyric?os=pc&id=" . $music_id . "&lv=-1&kv=-1&tv=-1";
    return curl_get($url);
}


// echo get_playlist_info();
// echo get_music_info(26215437);
// echo get_playlist_info(432056819);
// echo get_lrc(35391462);
 ?>
