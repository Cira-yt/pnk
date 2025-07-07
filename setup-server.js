const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta build
app.use(express.static(path.join(__dirname, 'build')));

// Configurar CORS para permitir peticiones desde React
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Proxy para las peticiones a la API PHP
app.use('/api', (req, res) => {
  // Aquí puedes configurar un proxy hacia tu servidor PHP
  // Por ejemplo, usando http-proxy-middleware
  res.json({ message: 'API endpoint placeholder' });
});

// Para cualquier otra ruta, servir la aplicación React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Aplicación disponible en http://localhost:${PORT}`);
}); 