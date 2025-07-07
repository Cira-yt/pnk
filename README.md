# PNK Inmobiliaria - React App

Esta es la versión React de la aplicación web de ventas de propiedades PNK Inmobiliaria, adaptada desde el código PHP original.

## Características

- **Página principal**: Muestra todas las propiedades disponibles
- **Sistema de login**: Autenticación de usuarios
- **Registro de usuarios**: Formularios para propietarios y gestores
- **Filtros de búsqueda**: Por tipo de propiedad, región, provincia, comuna y sector
- **Diseño responsivo**: Adaptado para dispositivos móviles y desktop
- **Validaciones**: Formularios con validaciones en tiempo real

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Servidor web con PHP y MySQL (para el backend)

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd pnk-inmobiliaria-react
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar el backend**:
   - Asegúrate de que tu servidor PHP esté funcionando
   - Configura la base de datos MySQL según el archivo `penka.sql`
   - Ajusta la configuración de conexión en `setup/conexion.php`

4. **Configurar la URL del API**:
   - Crea un archivo `.env` en la raíz del proyecto:
   ```
   REACT_APP_API_URL=http://localhost
   ```
   - Ajusta la URL según tu configuración del servidor

5. **Iniciar la aplicación**:
   ```bash
   npm start
   ```

La aplicación se abrirá en `http://localhost:3000`

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.js       # Encabezado de la aplicación
│   ├── Footer.js       # Pie de página
│   ├── PropertyCard.js # Tarjeta de propiedad
│   └── FilterForm.js   # Formulario de filtros
├── pages/              # Páginas principales
│   ├── Home.js         # Página principal
│   ├── Login.js        # Página de login
│   ├── RegisterPropietario.js # Registro de propietarios
│   └── RegisterGestor.js      # Registro de gestores
├── context/            # Contextos de React
│   └── AuthContext.js  # Contexto de autenticación
├── services/           # Servicios de API
│   └── api.js         # Configuración de axios y endpoints
└── App.js             # Componente principal
```

## Funcionalidades

### Autenticación
- Login con email y contraseña
- Validación de credenciales
- Persistencia de sesión en localStorage

### Registro de Usuarios
- **Propietarios**: Registro con validación de RUT chileno, email, contraseña, etc.
- **Gestores**: Registro adicional con subida de certificado de antecedentes
- Validaciones en tiempo real con SweetAlert2

### Propiedades
- Visualización de propiedades en grid responsivo
- Filtros por tipo, ubicación y características
- Formateo de precios en pesos chilenos y UF

### Filtros
- Filtros dinámicos por región, provincia, comuna y sector
- Carga automática de opciones desde el backend

## Tecnologías Utilizadas

- **React 18**: Framework principal
- **React Router**: Navegación entre páginas
- **Axios**: Cliente HTTP para API
- **Bootstrap 5**: Framework CSS
- **Bootstrap Icons**: Iconografía
- **SweetAlert2**: Alertas y notificaciones
- **Context API**: Manejo de estado global

## Configuración del Backend

La aplicación React se comunica con el backend PHP existente. Asegúrate de que:

1. El servidor PHP esté funcionando en el puerto configurado
2. La base de datos MySQL esté configurada correctamente
3. Los archivos PHP del backend estén accesibles
4. CORS esté configurado para permitir peticiones desde React

## Scripts Disponibles

- `npm start`: Inicia la aplicación en modo desarrollo
- `npm build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expone la configuración de webpack (irreversible)

## Despliegue

Para desplegar la aplicación en producción:

1. Construye la aplicación:
   ```bash
   npm run build
   ```

2. Sube los archivos de la carpeta `build/` a tu servidor web

3. Configura el servidor para servir la aplicación React (SPA)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Para soporte técnico, contacta al equipo de desarrollo de PNK Inmobiliaria. 