<?php
  header('Content-Type: text/html; charset=UTF-8');
  //Conección con base de datos
  require_once("funciones.php");
  require_once("../config.php");
  
  //Llegan variables de usuario
  $postdata = file_get_contents("php://input");  
  $request = json_decode($postdata);
  $request = ( array ) $request;
  
  $nombre = strtoupper(isset($request["nombre"]) ? $request["nombre"]:'0');
  $apellido = strtoupper(isset($request["apel"]) ? $request["apel"]:'0');
  $nickname = strtoupper(isset($request["nickname"]) ? $request["nickname"]:'0');
  $password = isset($request["pass"]) ? $request["pass"]:'0';
  $genero = isset($request["genero"]) ? $request["genero"]:'0';
  $correo = strtoupper(isset($request["correo"]) ? $request["correo"]:'0');
  $pais = isset($request["pais"]) ? $request["pais"]:'0';
  $idioma =  isset($request["idioma"]) ? $request["idioma"]:'0';
  $idioma = implode(",", $idioma);
  $institucion =  strtoupper(isset($request["institucion"]) ? $request["institucion"]:'0');
  $telefono =  isset($request["tel"]) ? $request["tel"]:'0';
  $t_usuario = isset($request["tipouser"]) ? $request["tipouser"]:'0';
  $revision = strtoupper(isset($request["intereses"]) ? $request["intereses"]:'');
  $biografia = isset($request["bio"]) ? $request["bio"]:'0';

  //$password = Database::crypt( $password);
 
  /*$nombre = isset($_POST["nombre"]) ? $_POST["nombre"]:'0';
  $apellido = isset($_POST["apellido"]) ? $_POST["apellido"]:'0';
  $nickname = isset($_POST["nickname"]) ? $_POST["nickname"]:'0';
  $password = isset($_POST["password"]) ? $_POST["password"]:'0';
  $genero = isset($_POST["genero"]) ? $_POST["genero"]:'0';
  $correo = isset($_POST["correo"]) ? $_POST["correo"]:'0';
  $pais = isset($_POST["pais"]) ? $_POST["pais"]:'0';
  $idioma = isset($_POST["idioma"]) ? $_POST["idioma"]:'0';
  $idioma = implode(",", $idioma);
  $institucion = isset($_POST["institucion"]) ? $_POST["institucion"]:'0';
  $telefono = isset($_POST["telefono"]) ? $_POST["telefono"]:'0';
  $t_usuario = isset($_POST["t_usuario"]) ? $_POST["t_usuario"]:'0';
  $biografia = isset($_POST["biografia"]) ? $_POST["biografia"]:'0';*/

  //verificacion no se ve despues
   /*
  echo $nombre . ' ' . $apellido . ' ' . $nickname . ' ' . $password . ' ' . $genero ;
  echo $correo . ' ' . $pais . ' ' . $idioma . ' ' . $institucion . ' ' . $telefono ;
  echo $t_usuario . ' ' . $biografia;

  */


  
 
  //Verifico que tenga información
  if($nombre == '' || $apellido == '' || $nickname == '' || $password == '' || $genero == '' || $correo == '' || $pais == '' || $idioma == '' || $t_usuario  == '' ||  $biografia== ''){
    //Este valor es el que se comunica con ajax para mostrar info en el html
    $arr['valor'] = '0';
  }else{
    //Se hace el ingreso de los datos a la DB
    $sql = "INSERT INTO `usuario` (`nickname`, `password`, `nombre`, `apellido`, `genero`, `correo`, `telefono`, `pais`, `institucion`, `idioma`, `tipo_usuario`, `int_revision`, `biografia`) VALUES ('$nickname', '$password', '$nombre','$apellido', '$genero', '$correo', '$telefono', '$pais', '$institucion', '$idioma', '$t_usuario' , ' $revision', '$biografia') ";
    if ($conex->query($sql) === TRUE) {
      $arr['valor'] = '1';
    } else {
        $arr['valor'] = '0';
      echo "Error updating record: " . $conex->error;
    }
  }

  $close = mysqli_close($conex);
	header('Content-type: application/json; charset=uft-8');
  echo json_encode($arr);
  







?>
