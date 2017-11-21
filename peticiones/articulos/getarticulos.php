<?php
    require_once("../config.php");
    session_start();
    $nickname = $_SESSION['nickname'];      
    
    $arr = array();
    if($_SESSION['t_usuario'] == '0'){
        $sql="SELECT *  FROM articulo WHERE id_usuario = '$idUser' ";
    }else{
        $sql="SELECT articulo.*, usuario.nombre, usuario.apellido, enviar.fecha_envio FROM `articulo` 
              INNER JOIN `usuario` 
	          ON `articulo`.`id_usuario` = usuario.id_usuario
              INNER JOIN enviar
	          ON `articulo`.`id_art` = enviar.id_art ";
        
    }
    
    $resultado = $conex->query($sql);
    if($resultado->num_rows > 0){ 
        while($row = $resultado->fetch_assoc()) {
            $row["sesion_derechos_autor"]= mb_convert_encoding($row["sesion_derechos_autor"], "UTF-8", "HTML-ENTITIES");
            $row["version_agradecimiento_autores"]= mb_convert_encoding($row["version_agradecimiento_autores"], "UTF-8", "HTML-ENTITIES");
            $row["recuros_multimedia"]= mb_convert_encoding($row["recuros_multimedia"], "UTF-8", "HTML-ENTITIES");
            $row["referencias"]= mb_convert_encoding($row["referencias"], "UTF-8", "HTML-ENTITIES");
            $row["org_colaboradores"]= mb_convert_encoding($row["org_colaboradores"], "UTF-8", "HTML-ENTITIES");
            $row["idiomas"]= $row["idiomas"];
            $row["palabras_clave"]= mb_convert_encoding($row["palabras_clave"], "UTF-8", "HTML-ENTITIES");
            $row["referencias"]= mb_convert_encoding($row["referencias"], "UTF-8", "HTML-ENTITIES");
            $row["titulo"]= mb_convert_encoding($row["titulo"], "UTF-8", "HTML-ENTITIES");
            $row["resumen"]= mb_convert_encoding($row["resumen"], "UTF-8", "HTML-ENTITIES");
            $row["autores"]= mb_convert_encoding($row["autores"], "UTF-8", "HTML-ENTITIES");
            $row["version"]= $row["version"];
            $arr[]= $row;
        }
    }else{
        $arr["vacio"] = '0';
    }
    $close = mysqli_close($conex);
    
    
    
    header('Content-type: application/json; charset=utf-8');
    //La respuesta se manda como un json
    echo json_encode($arr);



?>