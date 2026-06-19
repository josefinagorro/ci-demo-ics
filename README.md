# EntornoCI/CD

Proyecto realizado para el **2do parcial** de la materia **Ingenieria y Calidad de Software**, de **4to ano de Ingenieria en Sistemas**.

El objetivo del trabajo fue aplicar conceptos de **CI/CD** en un proyecto simple, automatizando pruebas, validaciones, build y despliegue.

## Sobre el proyecto

La aplicacion es una calculadora de entradas para conciertos. Permite elegir el tipo de entrada y calcular el precio total segun la cantidad seleccionada.

El proyecto incluye:

- Frontend simple en HTML, CSS y JavaScript.
- Backend con Node.js, Express y TypeScript.
- API para calcular precios de entradas.
- Tests unitarios y de integracion.
- Pipeline de CI/CD con GitHub Actions.
- Despliegue en Vercel.

## Tecnologias

- Node.js
- Express
- TypeScript
- Jest
- GitHub Actions
- Vercel

## Como ejecutar

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Ejecutar tests:

```bash
npm test
```

Compilar el proyecto:

```bash
npm run build
```

## CI/CD

El pipeline de GitHub Actions se encuentra en:

```text
.github/workflows/ci.yml
```

El flujo automatiza:

- Validacion de artefactos del proyecto.
- Instalacion de dependencias.
- Ejecucion de tests.
- Build del proyecto.
- Despliegue en Vercel.
- Envio de feedback por email con el resultado del pipeline.

## Deploy

https://ci-demo-ics.vercel.app/
