<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();
require_once 'setup/conexion.php';

// Permitir preflight OPTIONS
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Soportar JSON y x-www-form-urlencoded
    $input = file_get_contents('php://input');
    $data = [];
    if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false) {
        $data = json_decode($input, true);
    } else {
        $data = $_POST;
    }

    // Sanitizar y validar el correo electrónico
    $correo = filter_var($data['usuario'] ?? '', FILTER_SANITIZE_EMAIL);
    error_log("[LOGIN] Correo recibido: $correo");
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        error_log("[LOGIN] Correo inválido");
        echo json_encode(['success' => false, 'message' => 'Correo electrónico inválido']);
        exit;
    }

    // Sanitizar la contraseña
    $password = htmlspecialchars($data['password'] ?? '', ENT_QUOTES, 'UTF-8');
    error_log("[LOGIN] Password recibido: " . ($password ? '***' : '[VACÍO]'));

    // Buscar en usuarios
    $sql = "SELECT id, usuario, clave, tipo_usuario, estado FROM usuarios WHERE usuario = ? AND (estado = 1 OR estado = 'admin')";
    $stmt = $conexion->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $result = $stmt->get_result();
        error_log("[LOGIN] Usuarios encontrados: " . $result->num_rows);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Sin validación de contraseña
            $_SESSION['id'] = $row['id'];
            $_SESSION['usuario'] = $row['usuario'];
            $_SESSION['tipo_usuario'] = $row['tipo_usuario'];
            $_SESSION['tipo'] = $row['tipo_usuario'];
            $_SESSION['estado'] = $row['estado'];
            echo json_encode(['success' => true, 'message' => 'Login exitoso', 'tipo_usuario' => $row['tipo_usuario']]);
            exit;
        }
    }

    // Buscar en gestores
    $sql = "SELECT id, correo, password, estado FROM gestores WHERE correo = ? AND estado = 1";
    $stmt = $conexion->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $result = $stmt->get_result();
        error_log("[LOGIN] Gestores encontrados: " . $result->num_rows);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Sin validación de contraseña
            $_SESSION['id'] = $row['id'];
            $_SESSION['usuario'] = $row['correo'];
            $_SESSION['tipo_usuario'] = 'gestor';
            $_SESSION['tipo'] = 'gestor';
            $_SESSION['estado'] = $row['estado'];
            echo json_encode(['success' => true, 'message' => 'Login exitoso', 'tipo_usuario' => 'gestor']);
            exit;
        }
    }

    // Buscar en propietarios
    $sql = "SELECT id, correo, password FROM propietarios WHERE correo = ?";
    $stmt = $conexion->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $result = $stmt->get_result();
        error_log("[LOGIN] Propietarios encontrados: " . $result->num_rows);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Sin validación de contraseña
            $_SESSION['id'] = $row['id'];
            $_SESSION['usuario'] = $row['correo'];
            $_SESSION['tipo_usuario'] = 'propietario';
            $_SESSION['tipo'] = 'propietario';
            $_SESSION['estado'] = 'activo';
            echo json_encode(['success' => true, 'message' => 'Login exitoso', 'tipo_usuario' => 'propietario']);
            exit;
        }
    }

    error_log("[LOGIN] Usuario no encontrado en ninguna tabla");
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado o inactivo']);
    exit;
} else {
    header("Location: index.php");
    exit;
}
?>