# Proyecto Tower — web de distribución

Web estática en español para testers. Lee las GitHub Releases mediante la API pública de GitHub; no requiere servidor, dependencias ni token. El repositorio con el código privado del juego permanece separado.

## Antes de publicar

1. Abre `config.js`.
2. Sustituye `owner` por tu usuario u organización de GitHub y `repo` por el nombre del repositorio **público** que contendrá las Releases del juego.
3. Ajusta controles, instrucciones y problemas conocidos con datos reales.
4. No pongas tokens ni información privada en `config.js`.

La página elige como descarga principal la Release publicada más reciente, incluyendo versiones preliminares porque `allowPrereleaseAsLatest` está activado. Ponlo en `false` para que la descarga principal ignore las preliminares. El historial sigue mostrando ambas. Se enlaza el primer archivo `.zip` adjunto a cada Release; si no hay ZIP, se muestra el enlace a la Release.

## Probar localmente

Puedes abrir `index.html` para revisar el diseño. Para que la petición a GitHub funcione de forma fiable, publica en GitHub Pages o inicia un servidor local sencillo desde esta carpeta, por ejemplo `py -m http.server 8000`, y visita `http://localhost:8000`.

## Publicar con GitHub Pages

1. Crea en GitHub un repositorio **público** llamado `Tower-Web`.
2. Sube el contenido de esta carpeta a la raíz del repositorio (debe quedar `index.html` en la raíz).
3. En **Settings → Pages**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/ (root)`, y guarda.
4. GitHub mostrará la dirección de Pages, normalmente `https://TU-USUARIO.github.io/Tower-Web/`.

## Repositorio de descargas y Releases

1. Crea otro repositorio público, por ejemplo `Tower-Downloads`. No subas aquí el código fuente de Tower.
2. En ese repositorio crea una Release por cada versión real que ya tengas. Usa una etiqueta única y ordenable, por ejemplo el formato `vX.Y.Z` solo si coincide con tu esquema real. No hace falta inventar versiones.
3. Adjunta el ZIP ejecutable preparado para distribuir a esa Release (arrastra el ZIP a **Attach binaries by dropping them here** en la página de borrador).
4. Escribe el título y las notas reales; publica la Release.
5. Copia el propietario y nombre exactos de `Tower-Downloads` a `owner` y `repo` en `config.js` de `Tower-Web`, y sube el cambio.

La página consulta `https://api.github.com/repos/OWNER/REPO/releases` y se actualiza al cargar. El repositorio de descargas debe ser público para que tanto la API como los ZIP sean accesibles a los testers sin iniciar sesión. GitHub limita las peticiones anónimas de API; para esta web de baja frecuencia normalmente basta. No se usa token en navegador.

## Preparar cada ZIP

Incluye todos los archivos que el juego necesite para ejecutarse: ejecutable, bibliotecas/datos y una nota de instalación si hace falta. Comprueba que el ZIP contiene una carpeta fácil de reconocer y que el juego inicia después de extraerlo en otro directorio. Adjunta el ZIP como asset de la Release; no lo guardes dentro del repositorio web.

## Archivos

- `index.html`: contenido y estructura.
- `styles.css`: diseño adaptable a móvil y escritorio.
- `app.js`: consulta Releases y muestra notas/descargas.
- `config.js`: repositorio público y textos personalizables.
