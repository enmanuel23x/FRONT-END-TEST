# Prueba FRONT-END

#### v-1.0.0

## Configuración y Despliegue.

Aspectos a considerar:

- Se describe el proceso de instalación y despliegue para la aplicación.
- Seguirlo paso a paso debería garantizar la correcta instalación y posterior despliegue o puesta en funcionamiento de los servicios. 

### 1. Prerrequisitos.

**Se deben tener configurados los siguientes entornos:**

- NodeJS

### 2.Instalación y configuración.

#### Instalación/ejecución
- Si el contenedor tiene acceso a git:
  1. Clonar el repositorio con `git`.
  2. Acceder a la carpeta donde se haya descargado todo el código fuente del servicio desde la consola de comando.
  4. Ejecutar `npm install` para instalar todas las dependencias necesarias del servicio.
  5. Ejecutar `npm start` esto levantar la aplicacion.

#### Configuraciones
Editar el archivo `config.js` que se encuentran en la ruta `<<root>>/src/config`.

**`config.js`**

```bash
const api = "http://localhost:2000"
const data = {
    apiURL: api+"/v1"
}
module.exports = data


```
**Importante: Solo alterar estos valores de ser necesario**
  - `api` es la direccion base donde esta alojado el servidor del servicio REST **defaulf: "http://localhost:2000", [servicio REST](http://localhost:2000)**.
  - `apiURL` parametro requerido al realizar la conexión al servicio REST **(no alterar este parametro)**.
 
#### Recomendaciones
 - *(Se recomienda leer mas en EL README.md en el repositorio **[servicio REST](http://localhost:2001)**.)*.
 - *(Se recomienda leer mas en EL README.md en el repositorio **[servicio SOAP](http://localhost:2001)**.)*.

