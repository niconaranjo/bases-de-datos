<?php
    session_start();
    $postdata = file_get_contents("php://input");  
    $request = json_decode($postdata);
    $request = ( array ) $request;
    
    $register = $request["val"];
    $arr=[];
    if( $register == '0668ac44-c091-4396-b2c7-d1ab137d4794' ){
        if( isset($_SESSION['nombre'])){
            $arr["nombre"] = $_SESSION['nombre'];
            $arr['apellido'] = $_SESSION['apellido'];
            $arr["tipo_usuario"] = $_SESSION['t_usuario'];
          }else{
            $arr["err"] = '0';
          }           
        
    }else{
        $arr["err"] = '0';
    }
    
    header('Content-type: application/json; charset=utf-8');
    //La respuesta se manda como un json
    echo json_encode($arr);



?>