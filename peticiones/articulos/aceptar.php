<?php

    date_default_timezone_set('America/Bogota');
    require_once("../config.php");
    require_once("../login/funciones.php");
    session_start();
    $idUser = $_SESSION['id_usuario'];  


    $date = date("Y:m:d H:i:s");
    $datem = $date + 15;
    echo $datem;
    /*$sql = "INSERT INTO `revisar` (`Id_art`, `nickname_revisor`, `id_form`, `fecha_revision`, `fecha_aceptacion`, `fecha_limite`, `est_aceptado`) VALUES ('2', '$idUser', '', ' ', '$date', '2017-11-21', '0');";

    if ($conex->query($sql) === TRUE) {
        
        


    }else{
        $valor= 0;
        $arr = array('valor' => $valor);
    }
}
*/

?>