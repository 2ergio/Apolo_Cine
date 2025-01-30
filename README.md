# Cine Apolo - App de Reservas

Aplicación para realizar reservas de cine con funcionalidades como login, registro, y un rol de administrador para gestionar las reservas.

## Tecnologías utilizadas

- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: React, Axios

## Funcionalidades

- **Login**: Los usuarios pueden iniciar sesión en la aplicación.
- **Registro**: Los usuarios pueden crear una cuenta.
- **Reservas**: Los usuarios pueden realizar reservas para las películas.
- **Admin**: Los administradores pueden ver todas las reservas realizadas.

## Paquetes utilizados

### Backend

- `express`
- `bcryptjs`
- `jsonwebtoken`
- `dotenv`
- `cors`
- `pg`

### Frontend

- `axios`
- `react-router-dom`

## Guía de instalación

### Requisitos previos

Antes de comenzar con la instalación, asegúrate de tener instalados los siguientes programas:

- **Node.js**: Para ejecutar el backend y el frontend.
- **PostgreSQL**: Para gestionar la base de datos.
- **Git**: Para clonar el repositorio.

> **Nota**: Asegúrate de tener PostgreSQL funcionando correctamente en tu máquina.

### Clonar el repositorio

Para clonar el repositorio, abre una terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/2ergio/Apolo_Cine
```
# Backend

1. **Instalar las dependencias del backend**:

   Abre una terminal, entra en la carpeta del backend e instala las dependencias con el siguiente comando:
```bash
cd Backend
    npm install
```

2. **Crea el archivo .env:**

Dentro de la carpeta del backend, crea un archivo .env con la siguiente estructura:
```bash
DATABASE_URL=<tu_conexion_postgreSQL> 
TOKEN_SECRET=<tu_clave_secreta>
```
Reemplaza <tu_conexion_Posgre> con la direccion de tu base de datos postgreSQL.

Reemplaza <tu_clave_secreta> con una clave secreta que utilizarás para la autenticación (puedes generar una al azar).

3. **Inicia el servidor:** 

Una vez configurado el archivo .env, corre el siguiente comando para iniciar el servidor:
```bash
npm start
```
El servidor de backend debería iniciarse en el puerto predeterminado (3000), puede ser modificado en el index.js.

# Frontend
Abre otra terminal y entra a la carpeta del frontend e instala las dependencias:
```bash
cd cine_frontend
npm install
```

- **Inicia la aplicación frontend:**

    Una vez que las dependencias estén instaladas, corre el siguiente comando para iniciar el servidor de desarrollo de React:

    ```bash
    npm start
    ```

    La aplicación frontend debería abrirse automáticamente en tu navegador en el puerto 3000 o el puerto configurado.

---

# Notas importantes
- El backend y el frontend deben correr en puertos diferentes, por lo que revisa que no haya conflictos.
