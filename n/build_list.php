<?php
/**
 * 构建play_list
 */

include '163fm.php';
include 'config.php';

$music_infos = [];

foreach ($playlist as $name => $id) {
    $info = json_decode(get_playlist_info($id), true);
    $tracks = $info["result"]["tracks"];
    $single_list = [];
    foreach ($tracks as $item) {
        array_push($single_list, $item["id"]);
        array_push($music_infos, $item["id"]);
    }
    file_put_contents("json/" .$name.".json", json_encode($single_list));
}
file_put_contents("json/all.json", json_encode($music_infos));

echo json_encode($music_infos);

?>