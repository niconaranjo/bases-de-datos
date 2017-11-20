<?php
date_default_timezone_set('America/Bogota');
require_once("../config.php");
session_start();
$nicknameCurrentUser = $_SESSION['nickname'];

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$request = ( array )$request;
$request_array = [];
$sql_array = [];
$date = date("Y:m:d H:i:s");

foreach ($request as &$row) {
    $row_decode = json_decode(json_encode($row), true);

    $request_array[] = $row_decode;
}
unset($row);

if (empty($request)) {
    $arr['valor'] = '0';
} else {
    $id_art = $request_array[0]['id_art'];

    $sql = "SELECT `nickname_revisor`, `ID_ART` FROM `asignar` WHERE `ID_ART` = $id_art";
    $resultado = $conex->query($sql);

    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $aux_array['nickname'] = utf8_encode($row['nickname_revisor']);
            $aux_array['id_art'] = utf8_encode($row['ID_ART']);
            $sql_array[] = $aux_array;
        }
        if ($request_array === $sql_array) {
            $arr['valor'] = '0';
        } else {
            foreach ($request_array as &$row) {
                $nickname = $row['nickname'];
                $exist = false;
                foreach ($sql_array as &$rowSQL) {
                    if ($row['nickname'] === $rowSQL['nickname']) {
                        $exist = true;
                        break;
                    }
                }
                unset($rowSQL);
                if (!$exist) {
                    $sql = "INSERT INTO `asignar` VALUES ('$nicknameCurrentUser', '$nickname', $id_art, '$date')";
                    if ($conex->query($sql) === TRUE) {
                        $arr['valor'] = '1';
                    } else {
                        $arr['valor'] = '0';
                    }
                }
            }
            unset($row);
            foreach ($sql_array as &$rowSQL) {
                $nickname = $rowSQL['nickname'];
                $exist = false;
                foreach ($request_array as &$row) {
                    if ($row['nickname'] === $rowSQL['nickname']) {
                        $exist = true;
                        break;
                    }
                }
                unset($row);
                if (!$exist) {
                    echo $nickname;
                    $sql = "DELETE FROM `asignar` WHERE `nickname_revisor` = '$nickname' AND `ID_ART` = $id_art";
                    if ($conex->query($sql) === TRUE) {
                        $arr['valor'] = '1';
                    } else {
                        $arr['valor'] = '0';
                    }
                }
            }
            unset($rowSQL);
        }
    } else {
        foreach ($request_array as &$row) {
            $nickname = $row['nickname'];
            $sql = "INSERT INTO `asignar` VALUES ('$nicknameCurrentUser', '$nickname', $id_art, '$date')";
            if ($conex->query($sql) === TRUE) {
                $arr['valor'] = '1';
            } else {
                $arr['valor'] = '0';
            }
        }
        unset($row);
    }
}


print_r($request_array);

print_r($sql_array);

header('Content-type: application/json; charset=utf-8');
        //La respuesta se manda como un json
echo json_encode($arr);

$close = mysqli_close($conex);

?>