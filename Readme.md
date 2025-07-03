# 🚀 Proyecto Node.js con Knex.js y MySQL

Este proyecto usa [Knex.js](https://knexjs.org/) como *query builder* y sistema de migraciones para trabajar con bases de datos MySQL en un entorno Node.js sin TypeScript.

---

## 📦 Requisitos

- Node.js y npm
- MySQL instalado y corriendo
- Una base de datos creada (vacía o no)


## Clonar repositorio

```
    git clone https://github.com/valenuser/node-knex-migration
```
## Instalar dependencias

```
   npm install
```
---
## 📚 Documentación oficial

👉 https://knexjs.org/guide/migrations.html

---

## 📚 Comandos útiles de Knex.js

Este archivo resume los comandos más importantes que puedes utilizar con [Knex.js](https://knexjs.org/) para manejar tu base de datos MySQL en un proyecto Node.js.

## 🛠️ Inicialización

### Crear archivo de configuración inicial (`knexfile.js`):

```bash
npx knex init
```
Esto crea un archivo knexfile.js donde defines la configuración para tu base de datos.
Ejemplo de knexfile:
```
    module.exports = {
        development: {
          client: 'mysql2',
          connection: {
            host: '',  
            port:'',    
            user: '',           
            password:'',  
            database:''
          },
          migrations: {
            directory: './db/migrations',
          },
          seeds: {
            directory: './db/seeds',
          },
        },
      };
```

# 📦 Migraciones con Knex.js

Las **migraciones** en Knex.js permiten versionar la estructura de tu base de datos. Son especialmente útiles para mantener el control de los cambios a lo largo del desarrollo, trabajar en equipo y desplegar en producción con seguridad.

---

## 🧱 ¿Qué es una migración?

Una migración es un archivo que describe cómo **crear** o **modificar** tablas, columnas, índices u otras estructuras dentro de la base de datos.

---

## 🚀 Comandos de migración

### Crear una nueva migración

```bash
npx knex migrate:make nombre_migracion

```
📁 Esto genera un archivo en la carpeta /migrations (por defecto).

## 📌 El nombre debe ser descriptivo, como:

```
npx knex migrate:make create_users_table
```
## Ejecutar migraciones pendientes
```
npx knex migrate:latest
```

🛠 Ejecuta todas las migraciones que no se han aplicado aún.


## Revertir la última migración
```
npx knex migrate:rollback
```
↩ Deshace el último cambio realizado en una migración.

## Revertir todas las migraciones
```
npx knex migrate:rollback --all
```
🧨 Elimina todo el esquema de la base de datos si fue creado con migraciones.


## Ver el estado de las migraciones
```
npx knex migrate:status
```
👀 Muestra qué migraciones han sido aplicadas y cuáles no.


---
## Ejemplo de una migración

```
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true); // created_at y updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```
