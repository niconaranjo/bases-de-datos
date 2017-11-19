<?php
    session_start();
    $_SESSION = array();
    session_destroy();
    $arr["err"] = '1';
    header('Content-type: application/json; charset=utf-8');
    //La respuesta se manda como un json
    echo json_encode($arr);



?>