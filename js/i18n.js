(() => {
  "use strict";
  const translations = {
  "Inicio": "Home",
  "Capturas": "Screenshots",
  "Versiones": "Versions",
  "Cómo probar": "How to play",
  "Información": "Information",
  "Todo juramento tiene un precio.": "Every oath comes at a price.",
  "EN DESARROLLO": "IN DEVELOPMENT",
  "Próximamente": "Coming soon",
  "La próxima aventura está en camino.": "The next adventure is on its way.",
  "DESCARGAR ÚLTIMA VERSIÓN": "DOWNLOAD LATEST VERSION",
  "Aún no hay versiones publicadas": "No releases published yet",
  "Ver notas de la versión": "View release notes",
  "Capturas del juego": "Game screenshots",
  "Imágenes de SEALSWORN en desarrollo.": "Screenshots of SEALSWORN in development.",
  "Ver todas las capturas": "View all screenshots",
  "Captura ampliada": "Expanded screenshot",
  "Captura anterior": "Previous screenshot",
  "Captura siguiente": "Next screenshot",
  "Cerrar captura": "Close screenshot",
  "Versiones anteriores": "Previous versions",
  "Consulta el historial completo de versiones.": "Browse the full version history.",
  "Las versiones publicadas aparecerán aquí.": "Published versions will appear here.",
  "Ver todas las versiones": "View all versions",
  "Descarga el instalador de Windows (.exe) y sigue el asistente, o elige la versión portable (.zip) para descomprimirla y jugar sin instalar.": "Download the Windows installer (.exe) and follow the setup wizard, or choose the portable version (.zip) to extract and play without installing.",
  "Ver instrucciones →": "View instructions →",
  "Controles": "Controls",
  "Consulta los controles básicos y los atajos disponibles en la versión que estés probando.": "Check the basic controls and shortcuts available in the version you're playing.",
  "Ver controles →": "View controls →",
  "Errores conocidos": "Known issues",
  "Revisa los problemas detectados y las limitaciones actuales antes de empezar.": "Review known issues and current limitations before you start.",
  "Ver errores →": "View issues →",
  "Sobre el proyecto": "About the project",
  "SEALSWORN es un juego de acción y rol en 2D, desarrollado de forma independiente con MonoGame.": "SEALSWORN is an independently developed 2D action RPG built with MonoGame.",
  "Más información →": "Learn more →",
  "Cómo instalar y ejecutar SEALSWORN": "How to install and run SEALSWORN",
  "Desde la": "Starting with",
  "versión 0.21.8": "version 0.21.8",
  "puedes elegir entre una instalación guiada para Windows o una versión portable. Recomendamos el instalador para recibir futuras actualizaciones más fácilmente.": "you can choose a guided Windows installation or a portable version. We recommend the installer for easier future updates.",
  "Instalador de Windows (.exe)": "Windows installer (.exe)",
  "Recomendado": "Recommended",
  "En la última versión, pulsa": "For the latest release, click",
  "Descargar instalador (.exe)": "Download installer (.exe)",
  "Cuando termine la descarga, abre el archivo": "Once the download finishes, open the",
  "Sigue los pasos del asistente para instalar SEALSWORN. No necesitas permisos de administrador: se instala para tu usuario de Windows.": "Follow the setup wizard to install SEALSWORN. Administrator permissions are not required: the game installs for your Windows user account.",
  "Abre el juego desde el acceso directo creado por el instalador.": "Launch the game using the shortcut created by the installer.",
  "Cuando haya una nueva versión, el juego podrá avisarte y ofrecerte su descarga e instalación.": "When a new version is available, the game can notify you and offer to download and install it.",
  "Versión portable (.zip)": "Portable version (.zip)",
  "Pulsa": "Click",
  "Descargar versión portable (.zip)": "Download portable version (.zip)",
  "Extrae": "Extract",
  "todo el contenido": "all the contents",
  "del ZIP en una carpeta de tu elección; no ejecutes el juego directamente desde el archivo comprimido.": "of the ZIP into a folder of your choice; do not run the game directly from the archive.",
  "Abre la carpeta extraída y ejecuta el archivo": "Open the extracted folder and run the game's",
  "del juego": "file",
  "Esta opción permite jugar sin utilizar el asistente de instalación. Conserva juntos los archivos extraídos y consulta las notas de cada versión antes de actualizar manualmente.": "This option lets you play without the setup wizard. Keep the extracted files together and check each release's notes before updating manually.",
  "¿Windows bloquea el instalador o muestra una advertencia?": "Does Windows block the installer or show a warning?",
  "Como SEALSWORN es un proyecto independiente en desarrollo, Windows SmartScreen puede mostrar el aviso": "As SEALSWORN is an independent project in development, Windows SmartScreen may display the warning",
  "«Windows protegió su PC»": "“Windows protected your PC”",
  "al abrir el instalador o el ejecutable.": "when opening the installer or executable.",
  "Comprueba que has descargado el archivo desde": "Make sure you downloaded the file from",
  "esta web oficial de SEALSWORN": "this official SEALSWORN website",
  "utilizando sus botones de descarga. Los archivos se distribuyen a través de GitHub Releases.": "using its download buttons. Files are distributed through GitHub Releases.",
  "Si Windows muestra una advertencia de SmartScreen y confías en el archivo, pulsa": "If Windows shows a SmartScreen warning and you trust the file, click",
  "Más información": "More info",
  "Después, si aparece la opción, selecciona": "Then, if the option appears, select",
  "Ejecutar de todas formas": "Run anyway",
  "para continuar.": "to continue.",
  "Importante:": "Important:",
  "no desactives SmartScreen ni el antivirus para instalar el juego. Si el aviso indica que se ha detectado una amenaza o no puedes verificar el origen del archivo, no fuerces la ejecución y consulta la información oficial de esta web.": "do not disable SmartScreen or your antivirus to install the game. If the warning indicates a detected threat or you cannot verify the file's origin, do not force it to run; consult the official information on this website.",
  "Instalación de versiones anteriores a la 0.21.8": "Installing versions before 0.21.8",
  "Las versiones anteriores se distribuían como archivos ZIP, sin el nuevo asistente de instalación.": "Older versions were distributed as ZIP archives, without the new setup wizard.",
  "Descarga el": "Download the",
  "de la versión que quieras probar desde el historial de versiones.": "for the version you want to try from the version history.",
  "Extrae todo su contenido en una carpeta.": "Extract all its contents into a folder.",
  "Ejecuta": "Run",
  "(el nombre puede variar según la versión).": "(the filename may vary by version).",
  "Si aparece una advertencia de SmartScreen, comprueba primero que el archivo procede de las Releases oficiales y sigue las indicaciones de seguridad anteriores.": "If a SmartScreen warning appears, first verify that the file comes from an official release and follow the safety instructions above.",
  "SEALSWORN sigue en desarrollo. Puede haber errores o cambios importantes entre versiones. Si detectas un problema, indica la versión y qué estabas haciendo.": "SEALSWORN is still in development. Bugs and significant changes between versions are possible. If you encounter an issue, report the version and what you were doing.",
  "Compatibilidad y descarga": "Compatibility and downloads",
  "Disponible para Windows. El tamaño y las descargas de los archivos se muestran junto a sus opciones de descarga. Consulta las notas de cada versión para conocer posibles requisitos adicionales.": "Available for Windows. File sizes and download counts appear next to each download option. Check each release's notes for additional requirements.",
  "Se puede jugar con teclado y ratón o con mando (Xbox, PlayStation, Switch Pro o Steam Deck): el juego detecta el que estás usando y cambia los iconos al momento. Todos los controles se pueden cambiar en": "Play with keyboard and mouse or a controller (Xbox, PlayStation, Switch Pro or Steam Deck): the game detects your input and updates button icons instantly. All controls can be changed under",
  "Opciones → Controles": "Options → Controls",
  "y en el menú de pausa tienes la lista de los que llevas puestos. Abajo, los de por defecto.": "and the pause menu shows your current bindings. Default controls are listed below.",
  "Teclado y ratón": "Keyboard and mouse",
  "Tecla": "Key",
  "Acción": "Action",
  "Moverse": "Move",
  "Apuntar el arco y los hechizos": "Aim bow and spells",
  "Atacar con el arma equipada": "Attack with equipped weapon",
  "Habilidad activa del arma": "Active weapon skill",
  "Segunda habilidad": "Secondary skill",
  "Grito de guerra": "War cry",
  "Esquivar": "Dodge",
  "Cambiar de arma (espada, arco, grimorio)": "Switch weapon (sword, bow, grimoire)",
  "Huecos rápidos: poción de vida / maná": "Quick slots: health / mana potion",
  "Interactuar (cofres, tienda, objetos)": "Interact (chests, shop, objects)",
  "Inventario · Habilidades · Aliados · Mapa": "Inventory · Skills · Allies · Map",
  "Pausa": "Pause",
  "Guardado rápido": "Quick save",
  "Pantalla completa": "Fullscreen",
  "Mando": "Controller",
  "Stick izq.": "Left stick",
  "Stick der.": "Right stick",
  "Apuntar y mirar hacia un lado": "Aim and look around",
  "Atacar": "Attack",
  "Interactuar": "Interact",
  "Cambiar de arma": "Switch weapon",
  "Habilidades / Mapa": "Skills / Map",
  "Inventario": "Inventory",
  "Inventario, cofres y tienda": "Inventory, chests and shop",
  "Arrastrar:": "Drag:",
  "mover un objeto; soltarlo fuera de la ventana lo tira al suelo.": "move an item; dropping it outside the window discards it.",
  "Clic derecho:": "Right-click:",
  "usar o equipar.": "use or equip.",
  "Mayús + clic:": "Shift + click:",
  "pasar un objeto al otro lado (mochila ↔ cofre).": "move an item to the other side (bag ↔ chest).",
  "Arrastrar un consumible a un hueco": "Drag a consumable to a",
  "lo asigna.": "slot to assign it.",
  "Cofre:": "Chest:",
  "tomar todo (y el oro) ·": "take all (including gold) ·",
  "guardar todo.": "store all.",
  "Tienda:": "Shop:",
  "clic para comprar · clic derecho en tu mochila para vender al 40 %. Con Mayús, la pila entera.": "click to buy · right-click in your bag to sell at 40%. Hold Shift for the whole stack.",
  "Con mando, cada pantalla muestra abajo sus botones.": "On controller, each screen displays its button prompts at the bottom.",
  "Menús y libro": "Menus and book",
  "o": "or",
  "(cruceta o stick): mover la selección.": "(D-pad or stick): move selection.",
  "aceptar.": "confirm.",
  "volver atrás o cerrar.": "go back or close.",
  "(gatillos o botones superiores): pasar de pestaña en el libro (inventario, habilidades, aliados y mapa).": "(triggers or shoulder buttons): switch book tabs (inventory, skills, allies and map).",
  "Habilidades:": "Skills:",
  "clic en una habilidad para desbloquearla si cumples los requisitos.": "click a skill to unlock it if you meet the requirements.",
  "Errores y limitaciones de las versiones de prueba": "Known issues and limitations of test builds",
  "Estas versiones pueden contener errores o incompatibilidades entre partidas guardadas. Consulta las notas de cada publicación para ver las incidencias conocidas y comunica los problemas indicando la versión y los pasos para reproducirlos.": "These builds may contain bugs or save-game incompatibilities. Check each release's notes for known issues and report problems with the version and steps to reproduce them.",
  "SEALSWORN es un proyecto personal en desarrollo. Esta página sirve como punto de distribución para las versiones de prueba y como archivo de su evolución.": "SEALSWORN is a personal project in development. This website distributes test builds and documents the game's progress.",
  "En desarrollo": "In development",
  "Gracias por formar parte de esta aventura": "Thank you for being part of this adventure",
  "Todos los derechos reservados.": "All rights reserved.",
  "SEALSWORN es un desarrollo independiente. El contenido de esta web no puede reproducirse sin permiso.": "SEALSWORN is an independent game. Content from this website may not be reproduced without permission."
};
  const originals = new WeakMap();
  const attrOriginals = new WeakMap();
  const supported = ["es", "en"];
  const saved = (() => { try { return localStorage.getItem("sealsworn-language"); } catch (_) { return null; } })();
  let current = supported.includes(saved) ? saved : (/^es(?:-|$)/i.test(navigator.language || "") ? "es" : "en");
  let applying = false;
  const tr = (text) => current === "en" ? (translations[text] || text) : text;
  function apply(root = document.body) {
    if (!root || applying) return;
    applying = true;
    try {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        if (node.parentElement?.closest("script,style,pre,code,[data-no-translate]")) continue;
        if (!originals.has(node)) originals.set(node, node.nodeValue);
        const source = originals.get(node);
        const match = source.match(/^(\s*)([\s\S]*?)(\s*)$/);
        if (match) {
          const value = match[1] + tr(match[2]) + match[3];
          if (node.nodeValue !== value) node.nodeValue = value;
        }
      }
      const elements = [root, ...root.querySelectorAll("*")].filter(x => x.nodeType === 1);
      for (const el of elements) {
        let savedAttrs = attrOriginals.get(el);
        if (!savedAttrs) { savedAttrs = {}; attrOriginals.set(el, savedAttrs); }
        for (const attr of ["aria-label", "alt", "title", "placeholder"]) {
          if (!el.hasAttribute(attr)) continue;
          if (!(attr in savedAttrs)) savedAttrs[attr] = el.getAttribute(attr);
          const value = tr(savedAttrs[attr]);
          if (el.getAttribute(attr) !== value) el.setAttribute(attr, value);
        }
      }
    } finally { applying = false; }
  }
  function setLanguage(lang) {
    if (!supported.includes(lang)) return;
    current = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem("sealsworn-language", lang); } catch (_) {}
    document.querySelectorAll("[data-language]").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.language === lang));
    });
    apply();
    document.dispatchEvent(new CustomEvent("sealsworn:language", {detail:{language:lang}}));
  }
  window.SEALSWORN_I18N = {get language(){return current;}, t:tr, setLanguage, apply};
  function init() {
    document.querySelectorAll("[data-language]").forEach(b => b.addEventListener("click", () => setLanguage(b.dataset.language)));
    setLanguage(current);
    const observer = new MutationObserver(mutations => {
      if (applying) return;
      // Dynamic release cards, download links and gallery text.
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target.nodeType === 3) {
          const node = mutation.target;
          if (node.parentElement?.closest("[data-no-translate]")) continue;
          // Text changed by app.js: store the fresh Spanish original.
          if (current === "en" && !Object.values(translations).includes(node.nodeValue.trim())) originals.set(node,node.nodeValue);
        }
      }
      apply();
    });
    observer.observe(document.body, {subtree:true,childList:true,characterData:true});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();
