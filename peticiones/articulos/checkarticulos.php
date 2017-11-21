<?php
    require_once("../config.php");
    session_start();
    $nickname = $_SESSION['nickname'];  

    $arr = array();
    $sql = "SELECT articulo.*, 
                usuario.nombre, 
                usuario.apellido,
                usuario.idioma,
                usuario.biografia,
                usuario.pais,
                usuario.institucion,
                usuario.correo
            FROM `articulo` 
            INNER JOIN usuario 
                ON articulo.id_usuario = usuario.id_usuario
            WHERE articulo.id_art 
                IN (SELECT ID_ART from asignar WHERE asignar.nickname_revisor = 'JSON')";
    
    $resultado = $conex->query($sql);
    if($resultado->num_rows > 0){ 
        while($row = $resultado->fetch_assoc()) {
           
            $arr[]= array_map("utf8_encode", $row);
        }
    }else{
        $arr["vacio"] = '0';
    }

    $close = mysqli_close($conex);
    header('Content-type: application/json; charset=utf-8');
    //La respuesta se manda como un json
    echo json_encode($arr);

?>