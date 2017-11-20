<?php
require_once("../config.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$request = ( array )$request;
$arr = array(
    'asignados' => [],
    'no_asignados' => []
);

    //Reciba variable id del articulo
    //$id_articulo = isset($request["id_articulo"]);
$id_articulo = 5;
    
    // SELECT `nickname`, `nombre`, `apellido`, `correo`, `idioma`, `int_revision`, `biografia`, `institucion` FROM `usuario` WHERE `nickname` IN (SELECT `nickname_revisor` FROM `asignar` WHERE ID_ART = 5) AND `tipo_usuario` = 1
    // SELECT `nickname`, `nombre`, `apellido`, `correo`, `idioma`, `int_revision`, `biografia`, `institucion` FROM `usuario` WHERE `nickname` NOT IN (SELECT `nickname_revisor` FROM `asignar` WHERE ID_ART = 5) AND `tipo_usuario` = 1

$sql = "SELECT `nickname`, `nombre`, `apellido`, `correo`, `idioma`, `int_revision`, `biografia`, `institucion` FROM `usuario` WHERE `nickname` IN (SELECT `nickname_revisor` FROM `asignar` WHERE ID_ART = $id_articulo) AND `tipo_usuario` = 1";
$resultado = $conex->query($sql);

if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        array_push($arr['asignados'], $row);
    }
}

$sql = "SELECT `nickname`, `nombre`, `apellido`, `correo`, `idioma`, `int_revision`, `biografia`, `institucion` FROM `usuario` WHERE `nickname` NOT IN (SELECT `nickname_revisor` FROM `asignar` WHERE ID_ART = $id_articulo) AND `tipo_usuario` = 1";
$resultado = $conex->query($sql);

if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        array_push($arr['no_asignados'], $row);
    }
}

$close = mysqli_close($conex);

header('Content-type: application/json; charset=utf-8');
    //La respuesta se manda como un json
echo json_encode($arr);
?>
