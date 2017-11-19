<?php

header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set('America/Bogota');
require_once("../config.php");
require_once("../login/funciones.php");
session_start();

function files($upload){
    $images= [];
   
    if(isset($_FILES)){
        
        for($i = 0; $i< count($_FILES); $i++){
            $index = "images".$i;
            if(isset($_FILES[$index])){
                $tmp_image = $_FILES[$index]['tmp_name'];
                $image = date("d-m-y-H-i") ."-". normalizar($_FILES[$index]['name']);
                if($upload === true){
                    move_uploaded_file($tmp_image, "../../articulos/recursos/".$image);
                } 
                $images [] = $image;
            }
            
        }
    }
    return $images;
}

$idUser = $_SESSION['id_usuario']; 


$location = "../../articulos/";
$tmp_file_a = $_FILES['file_a']['tmp_name'];
$file_a = date("d-m-y-H-i-s") ."-". normalizar($_FILES['file_a']['name']);


$tmp_file_b = $_FILES['file_b']['tmp_name'];
$file_b =  date("d-m-y-H-i-s") ."-". normalizar($_FILES['file_b']['name']);


$tmp_file_c = $_FILES['file_c']['tmp_name'];
$file_c = date("d-m-y-H-i-s") ."-". normalizar($_FILES['file_c']['name']);

$date = date("Y:m:d H:i:s");

$titulo=mb_convert_encoding($_POST["titulo"], "UTF-8", "HTML-ENTITIES");
$resumen=$_POST["resumen"];
$autores=$_POST["autores"];
$referencias=$_POST["referencias"];
//$recursos= $_POST["recursos"];
$idioma =  $_POST["idioma"];
$organc=$_POST["organc"];
$clave=$_POST["clave"];
$articulo = $file_a;
$ses_der=$file_b;
$agradec=$file_c;

$images = [];
$images = (array) files($var = false);
$image='';
for($i = 0; $i< count($images); $i++){
    if($i == count($images)-1){
        $image .= $images[$i];        
    }else{
        $image .= $images[$i].", ";        
    }
}

if(isset($_FILES)){
    $sql = "INSERT INTO `articulo` (`id_art`, `id_usuario`, `sesion_derechos_autor`, `version_agradecimiento_autores`, `recuros_multimedia`, `referencias`, `org_colaboradores`, `idiomas`, `palabras_clave`, `titulo`, `resumen`, `autores`, `version`) VALUES (NULL, '$idUser', '$ses_der', '$agradec', '$image', '$referencias', '$organc', '$idioma', '$clave', '$titulo', '$resumen', '$autores', '$articulo') ";
    
    if ($conex->query($sql) === TRUE) {
        
        move_uploaded_file($tmp_file_a, "../../articulos/documentos/".$file_a);
        move_uploaded_file($tmp_file_b, "../../articulos/documentos/".$file_b);
        move_uploaded_file($tmp_file_c, "../../articulos/documentos/".$file_c);
        $images = (array) files($var = true);


        $sql2 = "SELECT id_art FROM articulo WHERE articulo.version = '$articulo' ";
        $resultado = $conex->query($sql2);
        if($resultado->num_rows > 0){ 
            while($row = $resultado->fetch_assoc()) {
                $id = $row['id_art'];
                $nick =  $_SESSION['user'];
                $sql3 = "INSERT INTO `enviar` (`id_art`, `nickname`, `fecha_envio`) VALUES ('$id', '$nick', '$date') ";
                if ($conex->query($sql3) === TRUE) {
                    //GOOD
                }
            }
        }
        $valor= 1;
        $arr = array('valor' => $valor);
        


    }else{
        $valor= 0;
        $arr = array('valor' => $valor);
    }

}else{
    $valor= 2;
    $arr = array('valor' => $valor);
}


$close = mysqli_close($conex);

header('Content-type: application/json; charset=utf-8');

echo json_encode($arr);

?>