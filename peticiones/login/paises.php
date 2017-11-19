<?php
    header('Content-Type: text/html; charset=UTF-8');
    //Conección con base de datos
    require_once("funciones.php");
    require_once("../config.php");
    
    $arr = array();
    $sql="SELECT * FROM paises ORDER BY Codigo ASC";
    $resultado = $conex->query($sql);
    if($resultado->num_rows > 0){ 
        while($row = $resultado->fetch_assoc()) {
            $row["codigo"]= mb_convert_encoding($row["Codigo"], "UTF-8", "HTML-ENTITIES");
            $row["pais"]= mb_convert_encoding($row["Pais"], "UTF-8", "HTML-ENTITIES");
            $arr[]= $row;
        }
    }
    $close = mysqli_close($conex);
    
    header('Content-type: application/json; charset=utf-8');
    
    echo json_encode($arr);
    //
?>