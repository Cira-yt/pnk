<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'penka';
$username = 'test';
$password = '12345';

// Función para conectar usando mysqli_connect (para compatibilidad con config.php)
function conectar() 
{
    global $host, $username, $password, $dbname;
    $con = mysqli_connect($host, $username, $password, $dbname);
    if (!$con) {
        http_response_code(500);
        header('Content-Type: application/json');
        die(json_encode(["error" => "Error de conexión: " . mysqli_connect_error()]));
    }
    mysqli_set_charset($con, "utf8");
    return $con;
}

try {
    // Crear conexión usando mysqli (para compatibilidad con conexion.php)
    $conexion = new mysqli($host, $username, $password, $dbname);

    // Verificar conexión
    if ($conexion->connect_error) {
        http_response_code(500);
        header('Content-Type: application/json');
        die(json_encode(["error" => "Error de conexión: " . $conexion->connect_error]));
    }

    // Establecer el conjunto de caracteres
    $conexion->set_charset("utf8");
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    die(json_encode(["error" => "Error de conexión: " . $e->getMessage()]));
}
?>