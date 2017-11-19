<?php
    require_once("../config.php");
    session_start();
    $idUser = $_SESSION['id_usuario'];    
    
    $postdata = file_get_contents("php://input");  
    $request = json_decode($postdata);
    $request = ( array ) $request;
    $arr = [];
    //Reciba variable id del articulo
    //muestra revisores del articulo dado filtrar por el id de articulo  

    //si el id del articulo es vacio muestra todos los revisores
    // $arr[]= $row;
    
    $close = mysqli_close($conex);
    
    
    
    header('Content-type: application/json; charset=utf-8');
    //La respuesta se manda como un json
    echo json_encode($arr);



?>