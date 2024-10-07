
# Test

Proyecto de prueba, que funciona como un pequeño almacen, cuenta con logeo con 2 roles, 2 subtipos de usuarios, catalogos y transacciones.

## Environment Variables

Para correr el proyecto debes tener un archivo .env con las Variables de ejemplo del archivo .env.example

`NODE_ENV`

`APP_NAME`

`APP_ENV`

`APP_KEY`

`APP_DEBUG`

`JWT_SECRET`

`API_URL`

`API_VERSION`

`PORT`

`DB_CONNECTION`

`DB_HOST`

`DB_PORT`

`DB_DATABASE`

`DB_USERNAME`

`DB_PASSWORD`

`TEST_PASSWORD`


## Modo Local

1.- Debes crear una base de datos MySQL vacía
```bash
  create database mydatabase;
```

2.- Copia el archivo de ejemplo .env y actualizar los accesos de la base de datos que creaste antes
```bash
  cp .env.example .env
```

3.- Instalar dependencias
```bash
  npm install
```

4.- Correr migraciones para crear las tablas correspondientes
```bash
  npm run migrations:run
```

5.- Correr seeders para crear información base en las tablas correspondientes
```bash
  npm run seeders:run
```

6.- Generar build de la app
```bash
  npm run build
```

7.- Ejecutar app
```bash
  npm run start
```


## Modo Contenedor

1.- Copia el archivo de ejemplo .env y actualizar los accesos de la base de datos de acuerdo al archivo docker-compose.yml
```bash
  cp .env.example .env
```

2.- Instalar dependencias
```bash
  npm install
```

3.- Generar build de la app
```bash
  npm run build
```

4.- Correr el comando para crear los contenedores de la base de datos y la app
```bash
  docker-compose up --build
```
5.- Visualizar que ambos contenedores esten arriva
```bash
  docker ps
```

6.- Entrar al contenedor de la app
```bash
  docker exec -it IDconteiner bash
```

7.- Dentro del contenedor correr las migraciones para crear las tablas correspondientes
```bash
  npm run migrations:run
```

8.- Dentro del contenedor correr los seeders para crear información base en las tablas correspondientes
```bash
  npm run seeders:run
```

## Comentarios de los Ejercicicos

### Parte 1: Diseño de Base de Datos
El diagrama ER y el script SQL estan adjuntados en la carpeta "deliverables".
- Usuarios - users

    Con los seeders se crea un usuario "admin" inicial con este podemos crear la información de "companies", "type_companies", "roles", "type_dealing", "categories" y "users".

    Se pueden crear usuarios de 2 tipos "admin" y "user" este ultimo es para las empresas.

- Roles - roles

    Los roles solo son informativos, el usuario "admin" es el unico que puede consumir ese servicio.

- Categorias - categories

    Es un catálogo simple para clasificar los productos

- Tipo de transacción - type_dealing

    Es un catálogo simple para clasificar las transacciones, por ahora solo deje en seeders la de "Compra/Venta".

- Tipo de Empresa - type_companies

    Es un catálogo simple para clasificar las empresas

- Empresas y Proveedores - companies

    Para estas tablas considere dejar una sola "companies" ya que no vi muchas diferencia en la información entre ellas, por lo mismo cree una tabla que sirve como bandera "type_companies", esto con el fin de diferenciar a nivel roles y permisos a las "company" y "provider".

    El tipo de empresa "provider" solo tienen acceso a la parte de "products" y "dealings"

    El tipo de empresa "company" solo tienen acceso a un servicio de "products" y todos los servicios "dealings".

- Productos - product

    Los productos solo pueden ser creados por usuarios de empresas que sean de tipo "provider"

- Transacciones - dealings

    Aqui se guardan los movimientos de un usuario hacia ciertos productos, tiene una tabla auxiliar "details_dealings" para guardar de forma optima el detalle de la transacción.

### Parte 2: Creación del Backend
La colección de postman está adjuntada en la carpeta "deliverables".

La app cuenta con autenticación, diferencia entre roles de usuarios y entre empresas.


### Parte 3: Evaluación de Código
El script de la DB y el algoritmo de php estan "deliverables".

La tabla se normalizo de forma correcta se dividio en 6 tablas principales para el almacenamiento de información de los empleados y otras 8 tablas secundarias para evitar duplicidad de información.

### Parte 4: Dockerización de un Servicio REST
Se crearon los archivos Dockerfile y docker-compose.yml para volver contenedor la app y base de datos. los pasos de despliegue estan en la sección de "Modo Contenedor" en la parte de arriba.

### Parte 5: Despliegue en la Nube
No puede llevar acabo esta parte.

### Extras
La autenticación y autorización se realizo de manera correcta.


## Authors

- [@gelo1002](https://www.github.com/gelo1002)