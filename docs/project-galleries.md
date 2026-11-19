# Capturas de proyectos profesionales

Guarda las imágenes en `public/projects/<empresa>/` y agrégalas a `gallery` en la entrada correspondiente de `lib/experience.ts`:

```ts
gallery: [
  {
    src: "/projects/impresos-multiples/nexo-rechazos.webp",
    alt: {
      es: "Módulo de rechazos y reclamos de NEXO",
      en: "NEXO rejection and claims module",
    },
    caption: { es: "Registro de incidencias", en: "Incident reporting" },
  },
],
```

`caption` es opcional. No agregues una entrada hasta que exista su archivo de imagen.

- Sin imágenes: aparece una tarjeta reservada para futuras capturas.
- Una imagen: se muestra una tarjeta, sin controles innecesarios.
- Dos imágenes: se superponen dos tarjetas.
- Tres o más: se muestran tres capas y los controles recorren todas las imágenes.

Se puede avanzar haciendo clic en la captura, usando las flechas de navegación o las teclas de dirección con la captura enfocada.
