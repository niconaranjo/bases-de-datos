<?php
date_default_timezone_set('America/Bogota');
require_once("../config.php");
require_once("../login/funciones.php");
session_start();
$nickname = $_SESSION['nickname'];


$location = "../../articulos/";
$tmp_file_a = $_FILES['file_a']['tmp_name'];
$revisado = date("d-m-y-H-i-s") . "-" . normalizar($_FILES['file_a']['name']);


$tmp_file_b = $_FILES['file_b']['tmp_name'];
$formulario = date("d-m-y-H-i-s") . "-" . normalizar($_FILES['file_b']['name']);

$date = date("Y:m:d H:i:s");

$est_aceptado = $_POST["aprobado"];
$id_art = $_POST["id_art"];


$sql = "INSERT INTO `formulario` (`id_form`, `art_revisado`, `link`) VALUES (NULL, '$revisado', '$formulario'); ";

if ($conex->query($sql) === TRUE) {

    move_uploaded_file($tmp_file_a, "../../revisiones/documentos/" . $revisado);
    move_uploaded_file($tmp_file_b, "../../formulario/documentos/" . $formulario);


    $sql2 = "SELECT id_form FROM formulario WHERE art_revisado = '$revisado' ";
    $resultado = $conex->query($sql2);
    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $id_form = $row["id_form"];
            $sql3 = "UPDATE `revisar` SET `fecha_revision` = '$date', `est_aceptado` = '$est_aceptado' WHERE `id_form` = '$id_form'";
            if($conex->query($sql3)) {

            }
            else {
                $valor = 0;
            }
        }
    }
    $valor = 1;
    $arr = array('valor' => $valor);



} else {
    $valor = 0;
    $arr = array('valor' => $valor);
}


?>