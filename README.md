# Server Application

## Descripción
Esta es una aplicación para gestionar tareas. La aplicación está dockerizada y contiene un archivo `Dockerfile` y un archivo `docker-compose.yml` para facilitar su despliegue y gestión.

## Instalación

1. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

2. Clona el repositorio en tu máquina local.

3. Navega a la carpeta `server`:
    ```bash
    cd server
    ```

4. Construye y levanta la aplicación usando Docker Compose:
    ```bash
    docker-compose up -d --build
    ```

## Endpoints

Una vez que la aplicación ha iniciado, puedes acceder a los siguientes endpoints:

### Autenticación

- **Registrarse**
    - **URL:** `http://localhost:3000/auth/signup`
    - **Método:** POST
    - **Body:**
      ```json
      {
          "email": "",
          "password": ""
      }
      ```

- **Autenticarse**
    - **URL:** `http://localhost:3000/auth/signin`
    - **Método:** POST
    - **Body:**
      ```json
      {
          "email": "",
          "password": ""
      }
      ```

### Tareas

- **Crear una tarea**
    - **URL:** `http://localhost:3000/todo/create`
    - **Método:** POST
    - **Headers:** 
      - `Authorization: Bearer <token>`
    - **Body:**
      ```json
      {
          "userId": "",
          "title": "",
          "description": "",
          "status": ""
      }
      ```

- **Obtener todas las tareas**
    - **URL:** `http://localhost:3000/todo/findAll`
    - **Método:** POST
    - **Headers:** 
      - `Authorization: Bearer <token>`
    - **Body:**
      ```json
      {
          "userId": ""
      }
      ```

- **Obtener una tarea por ID**
    - **URL:** `http://localhost:3000/todo/findById`
    - **Método:** POST
    - **Headers:** 
      - `Authorization: Bearer <token>`
    - **Body:**
      ```json
      {
          "_id": "",
          "userId": ""
      }
      ```

- **Obtener tareas pendientes**
    - **URL:** `http://localhost:3000/todo/findAll/pendings`
    - **Método:** POST
    - **Headers:** 
      - `Authorization: Bearer <token>`
    - **Body:**
      ```json
      {
          "userId": ""
      }
      ```

- **Obtener tareas completadas**
    - **URL:** `http://localhost:3000/todo/findAll/completes`
    - **Método:** POST
    - **Headers:** 
      - `Authorization: Bearer <token>`
    - **Body:**
      ```json
      {
          "userId": ""
      }
      ```

- **Actualizar una tarea**
    - **URL:** `http://localhost:3000/todo/update`
    - **Método:** PUT
    - **Headers:** 
      - `Authorization: Bearer <token>`
    - **Body:**
      ```json
      {
          "_id": "",
          "userId": "",
          "title": "",
          "description": "",
          "status": ""
      }
      ```

- **Eliminar una tarea**
    - **URL:** `http://localhost:3000/todo/delete`
    - **Método:** DELETE
    - **Headers:** 
      - `Authorization: Bearer <token>`
    - **Body:**
      ```json
      {
          "_id": "",
          "userId": ""
      }
      ```

- **Eliminar todas las tareas completadas**
    - **URL:** `http://localhost:3000/todo/delete/completes`
    - **Método:** DELETE
    - **Headers:** 
      - `Authorization: Bearer <token>`
    - **Body:**
      ```json
      {
          "userId": ""
      }
      ```

## Autenticación

Todos los endpoints, excepto los de registro y autenticación, requieren que se envíe un Bearer Token en el header de la solicitud. El token se genera cuando el usuario se registra o inicia sesión.

## Desmontar la Aplicación

Para desmontar la aplicación y eliminar los volúmenes creados, ejecuta el siguiente comando:
```bash
docker-compose down --volumes
