<?php

require ("163fm.php");

/**
 * 解析歌词
 * @param  $music_id
 * @return lrc
 */
function build_lrc($music_id)
{
    $lrc_info = json_decode(get_lrc($music_id), true);
    $lrc = "";
    if (isset($lrc_info["nolyric"]) && $lrc_info["nolyric"]) {
        $lrc = "nolyric";
    } else if (isset($lrc_info["uncollected"]) && $lrc_info["uncollected"]) {
        $lrc = "uncollected";
    } else {
        $lrc = $lrc_info["lrc"]["lyric"];
    }
    return $lrc;
}

/**
 * 随机音乐
 * @param  $music_ids
 * @return music_id
 */
function rand_id($music_ids) {
    $r_index = rand(0, count($music_ids) - 1);
    return $music_ids[$r_index];
}


$fm = isset($_GET["fm"]) ? $_GET["fm"] : "all";
$path = "json/" . $fm . ".json";

$music_ids = json_decode(file_get_contents($path), true);

$rand_id = rand_id($music_ids);

$play_info = [];

$music_info = json_decode(get_music_info($rand_id), true);
$song = $music_info["songs"][0];
$play_info["id"] = $rand_id;
$play_info["name"] = $song["name"];
$play_info["duration"] = $song["duration"];
$play_info["mp3Url"] = $song["mp3Url"];
$play_info["artists"] = [];
foreach ($song["artists"] as $v) {
    array_push($play_info["artists"], $v["name"]);
}
$play_info["album_url"] = $song["album"]["picUrl"];
$play_info["lrc"] = build_lrc($rand_id);


echo json_encode($play_info);
?>