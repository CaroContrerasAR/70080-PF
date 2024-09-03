# Proyecto Final Backend I
Este proyecto configura un servidor para trabajar con MongoDB como sistema de persistencia, y utiliza Handlebars como motor de plantillas para la generación de vistas. Además, implementa endpoints para la gestión de productos y carritos, con soporte para filtros, paginación, y ordenamientos. También se ha agregado la funcionalidad para manejar carritos de compras de manera profesional.

## Tecnologías utilizadas
- Node.js: Entorno de ejecución de JavaScript en el servidor.
- Express.js: Framework web para Node.js.
- Handlebars: Motor de plantillas para la generación de vistas dinámicas.
- MongoDB: Base de datos NoSQL para la persistencia de datos.
- Mongoose: ODM para modelar datos en MongoDB.
- Mongoose-Paginate-V2: complemento de Mongoose que proporciona opciones configurables para la paginación de datos en MongoDB.
- Socket.IO: Biblioteca que permite la comunicación bidireccional en tiempo real entre cliente y servidor(de PE2).
- File System: Utilizado para almacenar y gestionar los datos de los productos en archivos JSON (de PE2).

## Instalacion
1. Clona el repositorio: git clone https://github.com/CaroContrerasAR/70080-PF.git
2. Navega al directorio del proyecto: cd 70080-PF
3. Instala dependencias: npm install
4. Configura la base de datos MongoDB:
Asegúrate de tener MongoDB instalado y en ejecución. Configura la conexión a MongoDB en el archivo de configuración del proyecto.

## Uso
1. inicia el servidor: npm run dev
2. Accede a las vistas:
    . Lista de productos JSON: http://localhost:8080/api/products
    . Lista de carritos JSON con Populate: http://localhost:8080/api/carts
    . otras pruebas:    http://localhost:8080/api/products?limit=3&page=2
                                http://localhost:8080/api/products?limit=3&page=2&sort=desc
                                http://localhost:8080/api/products?query=Ca2
    . Lista de productos con Paginación: http://localhost:8080/products
    . Lista de un carrito por Id: http://localhost:8080/carts/66cb395cca1e704691c337cd
    . Lista de productos: http://localhost:8080/home (PE2)
    . Productos en tiempo real: http://localhost:8080/realtimeproducts (PE2)

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más información.
