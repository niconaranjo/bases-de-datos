<?php

    date_default_timezone_set('America/Bogota');
    require_once("../config.php");
    require_once("../login/funciones.php");
    session_start();

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $request = ( array ) $request;
    print_r($request);
    $art =  $request[0];
    $idUser = $_SESSION['id_usuario'];  


    $date = date("Y:m:d H:i:s");
    //echo date("d") +15;
    //echo $datem;
    if($art){
        $sql = "INSERT INTO `revisar` (`Id_art`, `nickname_revisor`, `id_form`, `fecha_revision`, `fecha_aceptacion`, `fecha_limite`, `est_aceptado`) VALUES ('2', '$idUser', '', '', '$date', '2017-11-21', '')";
        
            if ($conex->query($sql) === TRUE) {
                
                
        
        
            }else{
                $valor= 0;
                $arr = array('valor' => $valor);
            }
    }
    



?>