<?php
session_start();
session_destroy(); // Destruir la sesión

header("Location: index.php"); // Redirigir al usuario a la página de inicio de sesión

?>