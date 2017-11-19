<?php
$username="root";  /*root*/
$password="";//Natsu2017
$servername="localhost"; /*localhost*/
$dbname="class_db";

$conex= new mysqli($servername,$username,$password,$dbname);


if($conex->connect_errno){
    //echo 'Error';
    die("Connection failed: " . $conex->connect_error);
}



?>
