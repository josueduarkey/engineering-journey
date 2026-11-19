# Emprendimientos

Las fichas viven en `lib/ventures.ts` y se muestran antes de los proyectos
profesionales, en `/es/projects#emprendimientos` y `/en/projects#emprendimientos`.
Cada ficha tiene textos en español e inglés, tecnologías, enlace público y una
galería que reutiliza las tarjetas superpuestas de los proyectos profesionales.

## Revisión del 19 de noviembre de 2026

- **FocuMinds:** `focuminds`. Se revisaron el motor de planificación, los módulos
  académicos, la extracción de planes de evaluación y las dependencias.
- **Spotmi:** `spotmi-web`. Se revisaron el directorio, el explorador, la
  arquitectura de los paneles y las herramientas del asistente.
- **TelMoney:** `telmoney` y `telmoney-bot` forman una sola ficha. Se revisaron
  la web Astro, el backend FastAPI, la integración de WhatsApp y sus funciones
  financieras y de reportes.

Los textos evitan cifras de usuarios, resultados comerciales o métricas de
impacto que no se hayan confirmado.

## Capturas

Se tomaron del navegador en las webs públicas y se guardaron como JPEG en
`public/projects/ventures/`:

| Producto | Página principal | Segunda captura |
| --- | --- | --- |
| FocuMinds | `https://www.focuminds.com/` | `https://www.focuminds.com/#capacidad` |
| Spotmi | `https://spotmi.com.sv/es` | `https://spotmi.com.sv/es/explorar` |
| TelMoney | `https://telmoney.app/` | `https://telmoney.app/#hoy` |

Las capturas de simuladores corresponden a sus demos públicas. No se accedió
a paneles privados ni se usaron datos personales para generarlas.

Los logos se copiaron de los recursos de marca de cada repositorio a
`public/ventures/`. Para renovar las capturas, conservar los nombres actuales o
actualizar `gallery` en `lib/ventures.ts`, incluyendo `alt` y `caption` en ambos
idiomas.
