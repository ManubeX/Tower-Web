/* Personaliza estos datos antes de publicar. El repositorio de descargas debe ser PÚBLICO.
   No introduzcas tokens, contraseñas ni datos privados en este archivo. */
window.TOWER_CONFIG = {
  gameName: "Proyecto Tower",
  // Escribe el propietario y el nombre del repositorio público donde crearás las Releases.
  // Ejemplo de formato (solo formato, no es un dato real): owner: "tu-usuario", repo: "Tower-Downloads"
  owner: "ManubeX",
  repo: "Tower-Downloads",
  // Opcional: elige si el botón principal admite versiones preliminares (prereleases).
  allowPrereleaseAsLatest: true,
  channelLabel: "VERSIONES PARA TESTERS",
  // Completa con la información real de tu juego.
  installNote: "Si Windows muestra un aviso de seguridad, confirma solo si reconoces que descargaste el archivo desde esta página y confías en su origen.",
  controls: [
    { key: "W A S D", action: "Moverse" },
    { key: "Ratón", action: "Apuntar / interactuar" },
    { key: "ESC", action: "Pausa / menú" }
  ],
  knownIssues: ["Añade aquí los problemas conocidos de la versión actual."]
};
