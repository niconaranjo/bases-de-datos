<?php
   header('Content-Type: text/html; charset=UTF-8');
   
   //Conección con base de datos
   require_once("funciones.php");
   require_once("../config.php");

  //Llegan variables de usuario
  $postdata = file_get_contents("php://input");  
  $request = json_decode($postdata);
  $request = ( array ) $request;

  $user = strtoupper($request["user"]);
  $pass = $request["pass"];
  /*
  $user = isset($_POST["user"]) ? $_POST["user"]:'0';
  $pass = isset($_POST["pass"]) ? $_POST["pass"]:'0';

  */

  //Se evita inyeccion de sql se pregunta si tiene espacios lo que se manda
  if(preg_match('/\s/',$user) || preg_match('/\s/',$pass)){
    $arr['valor'] = '0';
  }else{    
    $bol = False;
    //Se hace la consulta para verificar si existe el usuario
    $sql="SELECT id_usuario, nombre, apellido, password, tipo_usuario  FROM usuario WHERE nickname = '$user' ";
    $resultado = $conex->query($sql);
    //se revisa que la consuta arroje algo
    if($resultado->num_rows == 0){
      // no se encuentra coincidencias de nickname en db
      $arr['valor'] = '0';
    }else{

      $row = $resultado->fetch_assoc();


      $pasn = Database::uncrypt($pass, $row["password"]);
      if( $pasn == true ){
        //Se inicia sesión de php para guardar variables globales
        session_start();

        //Se crean variables globales
        $_SESSION['id_usuario'] = $row["id_usuario"];
        $_SESSION['user'] = $user;
        $_SESSION['pass'] = $pass;
        $_SESSION['nombre'] = ucfirst(strtolower($row["nombre"]));
        $_SESSION['apellido'] = ucfirst(strtolower($row["apellido"]));
		    $_SESSION['t_usuario'] = $row["tipo_usuario"];
		  
        $bol = True;
        $arr = $row;
        $arr['password'] = '';
        $arr['valor'] = '1';        
        $arr['t_usuario'] = $row["tipo_usuario"];

      }else{
        //Booleano que se recibe manda para ajax decir que no se encontró datos
        $arr['valor'] = '0';
        $bol = False;
      }
    }
  }
  
  //cerrar conexión con DB
  $close = mysqli_close($conex);
  header('Content-type: application/json; charset=utf-8');
  //La respuesta se manda como un json
  echo json_encode($arr);
  



?>
