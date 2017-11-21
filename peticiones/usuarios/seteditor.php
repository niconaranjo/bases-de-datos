<?php

    require_once("../config.php");
    session_start();
    $idUser = $_SESSION['id_usuario'];

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $request = ( array ) $request;

    

    $nickname = $request[0]->nickname;
    $sql = "UPDATE `usuario` SET `tipo_usuario` = '2' WHERE `usuario`.`nickname` = '$nickname'";
    if ($conex->query($sql) === TRUE) {
        $arr['valor'] = '1';
    } else {
        $arr['valor'] = '0';
    }


?>