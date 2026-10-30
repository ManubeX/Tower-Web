# Proyecto Tower — Web de distribución

Web estática azul oscuro para testers. Incluye protagonista, descarga destacada, historial plegable y secciones de instalación, controles y errores.

## Publicar
1. Crea un repositorio público `Tower-Web` y sube el contenido de esta carpeta a su raíz.
2. Edita `js/config.js` y comprueba que `js/config.js` contiene `ManubeX/Tower-Web` y cámbialo si finalmente usas otro nombre de repositorio.
3. En GitHub: Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.
4. Crea las Releases en este mismo repositorio y adjunta el ZIP de cada build.

## Formato recomendado para cada Release
- Tag: `v0.1.0`
- Título: `Pre-Alpha 0.1.0 — Primera versión jugable`
- Descripción: novedades, cambios y errores conocidos.
- Asset: ZIP distribuible de Windows.
- Marca `Set as a pre-release` si corresponde.

La web consulta las Releases públicas automáticamente. La más reciente aparece destacada y las anteriores se pueden desplegar. Mantén tu repositorio principal `Tower` privado; publica aquí solo la web y los ZIP que quieras distribuir.
