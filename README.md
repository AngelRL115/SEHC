
# Servicio Especializado Honda Control

Este proyecto es para control interno del taller de luis Especializado en Honda


## Dependencias

Ejecutar el siguiente comando para instalar todas las Dependencias de desarrollo

```bash
  npm install
```
## Prisma ORM para utilizar la base de datos con el backend

Ejecutar el siguiente comando para obtener los ultimos cambios relacionados con la estructura de la base datos

```bash
  npx primsa db pull
```

despues ejecuta el siguiente comando para generar el cliente que nos permitira interactual con nuestra base de datos atravez del backend

```bash
  npx prisma generate
```

**Nota:** Si realizas alguna modificacion a la base datos, es necesario eliminar la carpeta node_modules y volver a ejecutar los comando de prisma, ya que hace un modelado temporal y el cliente necesita actualizarse con el nueco modelado temporal.