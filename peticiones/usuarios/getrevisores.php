<?php
    require_once("../config.php");
    session_start();
    $idUser = $_SESSION['id_usuario'];

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $request = ( array ) $request;
    
    
    
    
    if(!$request ){
        $sql = "SELECT `nickname`, `nombre`, `apellido`, `correo`, `idioma`, `int_revision`, `biografia`, `institucion` FROM `usuario` WHERE `tipo_usuario` = 1";
        $resultado = $conex->query($sql);
    
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                $arr['no_asignados'][] = array_map("utf8_encode", $row);
            }
        }
    }else{
        $id_articulo = $request["id_art"];

        $sql = "SELECT `nickname`, `nombre`, `apellido`, `correo`, `idioma`, `int_revision`, `biografia`, `institucion` FROM `usuario` WHERE `nickname` IN (SELECT `nickname_revisor` FROM `asignar` WHERE ID_ART = $id_articulo) AND `tipo_usuario` = 1";
        $resultado = $conex->query($sql);
    
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                $arr['asignados'][] = array_map("utf8_encode", $row);
            }
        }
    
        $sql = "SELECT `nickname`, `nombre`, `apellido`, `correo`, `idioma`, `int_revision`, `biografia`, `institucion` FROM `usuario` WHERE `nickname` NOT IN (SELECT `nickname_revisor` FROM `asignar` WHERE ID_ART = $id_articulo) AND `tipo_usuario` = 1";
        $resultado = $conex->query($sql);
    
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                $arr['no_asignados'][] = array_map("utf8_encode", $row);
            }
        }
    }
    

    header('Content-type: application/json; charset=utf-8');
        //La respuesta se manda como un json
    echo json_encode($arr);

    $close = mysqli_close($conex);
?>
