
# Servicio Especializado Honda Control

Este proyecto es para control interno del taller de luis Especializado en Honda


## Dependencias

Ejecutar el siguiente comando para instalar todas las Dependencias de desarrollo

```bash
  npm install
```
## Prisma ORM para utilizar la base de datos con el backend

Ejecutar el siguiente comando para obtener los ultimos cambios relacionados con la estructura de la base datos
(Asegurate primero de haber corrido el archivo sql con las queries de creacion de la base de datos)

```bash
  npx primsa db pull
```

despues ejecuta el siguiente comando para generar el cliente que nos permitira interactual con nuestra base de datos atravez del backend

```bash
  npx prisma generate
```
**Nota:** Si realizas alguna modificacion a la base datos, es necesario eliminar la carpeta node_modules y volver a ejecutar los comando de prisma, ya que hace un modelado temporal y el cliente necesita actualizarse con el nueco modelado temporal.

## Actualizacion sobre las actualizaciones de la base de datos con el schema de prisma ORM
En lugar de utilizar los 2 comando mencionados arriba, solo utiliza el comando (solo funciona en windows)

```bash
  npm run clean
```

Este comando hara una limpieza completa del proyecto y ademas hara todo lo necesario para actualizar el schema de prisma y volver a generar el cliente de prisma necesario para poder interactual con la base de datos.

## Documentacion para utilizar los endpoints

Para poder visualizar la documentacion de los endpoints necesitas acceder desde el navegador a [http:localhost:3000/api-docs](http:localhost:3000/api-docs/)