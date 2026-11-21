(() => {
    const cfg = window.TOWER_CONFIG || {};
    const repo = cfg.GITHUB_REPO || "";
    const $ = id => document.getElementById(id);

    // Configurar marked (Markdown → HTML)
    if (typeof marked !== "undefined") {
        marked.setOptions({
            breaks: true,
            gfm: true
        });
    }

    function renderMarkdown(text) {
        if (!text || !text.trim()) {
            return "<p>Esta versión no incluye notas de publicación.</p>";
        }
        if (typeof marked !== "undefined") {
            const html = marked.parse(text);
            return typeof DOMPurify !== "undefined"
                ? DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
                : "<pre style='white-space:pre-wrap'>" + esc(text) + "</pre>";
        }
        // Fallback si no carga marked: texto plano escapado
        return "<pre style='white-space:pre-wrap'>" + esc(text) + "</pre>";
    }

    // Detectar la fase de desarrollo de la Release.
    function phase(t) {
        t = (t || "").toLowerCase();

        if (t.includes("pre-alpha") || t.includes("prealpha"))
            return "PRE-ALPHA";

        if (t.includes("alpha"))
            return "ALPHA";

        if (t.includes("beta"))
            return "BETA";

        if (t.includes("stable") || t.includes("estable"))
            return "ESTABLE";

        return "VERSIÓN";
    }

    // Preferir el tag real: conserva sufijos como 0.20.4e.
    function version(r) {
        const tag = (r.tag_name || "").trim();
        if (tag) return /^v/i.test(tag) ? tag : "v" + tag;
        const match = (r.name || "").match(/v?\d+\.\d+(?:\.\d+)*(?:[a-z]+)?/i);
        return match ? (match[0].startsWith("v") ? match[0] : "v" + match[0]) : "—";
    }

    // Ordenar números y sufijos: 0.20.4e > 0.20.4d > 0.20.4.
    function compareVersions(a, b) {
        const parse = r => {
            const match = version(r).match(/v?(\d+(?:\.\d+)*)([a-z]*)/i);
            return match ? { parts: match[1].split(".").map(Number), suffix: match[2].toLowerCase() }
                         : { parts: [], suffix: "" };
        };
        const va = parse(a), vb = parse(b);
        for (let i = 0; i < Math.max(va.parts.length, vb.parts.length); i++) {
            const delta = (vb.parts[i] || 0) - (va.parts[i] || 0);
            if (delta) return delta;
        }
        const suffixOrder = vb.suffix.localeCompare(va.suffix, "en");
        if (suffixOrder) return suffixOrder;
        return new Date(b.published_at || b.created_at) -
               new Date(a.published_at || a.created_at);
    }

    // Mostrar únicamente el nombre descriptivo, sin fase ni versión duplicada.
    function title(r) {
        let name = (r.name || "").trim();
        name = name.replace(/^(?:pre[- ]?alpha|alpha|beta|stable|estable|release|versi[oó]n)\b\s*[:—–-]?\s*/i, "");
        const tag = (r.tag_name || "").replace(/^v/i, "");
        if (tag) name = name.replace(new RegExp("^v?" + tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?=\\s|$|[-—–:])", "i"), "").trim();
        name = name.replace(/^v?\d+\.\d+(?:\.\d+)*(?:[a-z]+)?\s*[:—–-]?\s*/i, "");
        name = name.replace(/^[:—–-]\s*/, "").trim();
        return name || "Novedades de SEALSWORN";
    }

    // Formatear fecha.
    function date(d) {
        return d
            ? new Intl.DateTimeFormat("es-ES").format(new Date(d))
            : "";
    }

    // Escapar caracteres HTML.
    function esc(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c]));
    }

    // Mostrar la última Release.
    function setLatest(r) {
        $("latest-phase").textContent = phase(r.name);
        $("latest-version").textContent = version(r);

        $("latest-title").textContent =
            title(r) || "Versión de pruebas de SEALSWORN";

        $("latest-date").textContent =
            "Publicado el " + date(r.published_at || r.created_at);

        let a = r.assets && r.assets[0];

        $("latest-size").textContent = a
            ? "~ " + Math.round(a.size / 1048576) + " MB"
            : "";

        let link = document.createElement("a");

        link.id = "latest-download";
        link.className = "download-button";
        link.href = a ? a.browser_download_url : r.html_url;
        link.target = "_blank";
        link.rel = "noopener";

        link.innerHTML =
            "<span>↓</span> DESCARGAR ÚLTIMA VERSIÓN";

        $("latest-download").replaceWith(link);

        // Notas de la versión (Markdown) — <details> empieza cerrado
        const notesWrap = $("latest-notes");
        const notesBody = $("notes-body");

        if (r.body && r.body.trim()) {
            notesWrap.hidden = false;
            notesWrap.open = false;
            notesBody.innerHTML = renderMarkdown(r.body);
        } else {
            notesWrap.hidden = true;
            notesWrap.open = false;
            notesBody.innerHTML = "";
        }
    }

    // Mostrar las versiones anteriores.
    function list(rs) {
        let root = $("release-list");
        let older = rs.slice(1);
        let showAll = $("show-all-releases");
        let expanded = false;
        const renderRows = () => {
            root.replaceChildren();
            const visible = expanded ? older : older.slice(0, 5);
            visible.forEach(r => appendReleaseRow(root, r));
            showAll.hidden = older.length <= 5;
            showAll.textContent = expanded ? "Ver menos versiones" : "Ver todas las versiones";
            showAll.setAttribute("aria-expanded", String(expanded));
        };
        showAll.onclick = () => { expanded = !expanded; renderRows(); };
        if (older.length) { renderRows(); return; }

        if (!older.length) {
            root.innerHTML =
                '<div class="empty-state">Todavía no hay versiones anteriores.</div>';
            return;
        }

        root.innerHTML = "";

    }

    function appendReleaseRow(root, r) {
            let row = document.createElement("article");
            row.className = "release-row";

            let b = document.createElement("button");

            b.className = "release-summary";
            b.type = "button";
            b.setAttribute("aria-expanded", "false");

            b.innerHTML = `
                <span class="phase-pill">${phase(r.name)}</span>
                <span class="release-number">${version(r)}</span>
                <span class="release-description">
                    ${esc(title(r) || "Versión de SEALSWORN")}
                </span>
                <span class="release-date">
                    Publicado el ${date(r.published_at || r.created_at)}
                </span>
                <span class="chevron">⌄</span>
            `;

            let d = document.createElement("div");
            d.className = "release-details";

            let md = document.createElement("div");
            md.className = "markdown-body";
            md.innerHTML = renderMarkdown(r.body);
            d.append(md);

            let assets = document.createElement("div");
            assets.className = "asset-links";

            (r.assets || []).forEach(a => {
                let x = document.createElement("a");

                x.href = a.browser_download_url;
                x.target = "_blank";
                x.rel = "noopener";
                x.textContent = "↓ " + a.name;

                assets.append(x);
            });

            if (!r.assets || !r.assets.length) {
                let x = document.createElement("a");

                x.href = r.html_url;
                x.target = "_blank";
                x.rel = "noopener";
                x.textContent = "Ver publicación en GitHub";

                assets.append(x);
            }

            d.append(assets);

            b.addEventListener("click", () => {
                let open = row.classList.toggle("open");
                b.setAttribute("aria-expanded", String(open));
            });

            row.append(b, d);
            root.append(row);
    }

    // Cargar Releases desde GitHub.
    async function init() {
        $("github-link").href =
            repo && !repo.includes("TU_USUARIO")
                ? "https://github.com/" + repo
                : "https://github.com";

        if (!repo || repo.includes("TU_USUARIO")) {
            $("load-error").hidden = false;

            $("load-error").textContent =
                "Configura GITHUB_REPO en js/config.js para conectar las Releases.";

            return;
        }

        try {
            let res = await fetch(
                "https://api.github.com/repos/" + repo + "/releases?per_page=100"
            );

            if (!res.ok) {
                throw Error(res.status);
            }

            let rs = await res.json();

            // Filtrar versiones preliminares si están desactivadas.
            if (!cfg.SHOW_PRERELEASES) {
                rs = rs.filter(r => !r.prerelease);
            }

            // Eliminar borradores.
            rs = rs.filter(r => !r.draft);

            // ORDENAR NUMÉRICAMENTE DE MAYOR A MENOR.
            rs.sort(compareVersions);

            if (!rs.length) {
                $("load-error").hidden = false;

                $("load-error").textContent =
                    "Todavía no hay Releases publicadas en este repositorio.";

                return;
            }

            // La primera versión será siempre la más reciente numéricamente.
            setLatest(rs[0]);

            // El resto aparecerá en el historial.
            list(rs);

        } catch (e) {
            $("load-error").hidden = false;

            $("load-error").replaceChildren(
                document.createTextNode("No se han podido cargar las versiones. "),
                Object.assign(document.createElement("a"), {
                    href: "https://github.com/ManubeX/Tower-Downloads/releases",
                    textContent: "Consultar las descargas en GitHub",
                    target: "_blank", rel: "noopener"
                })
            );

            console.error(e);
        }
    }

    // Mostrar la galería solo cuando las miniaturas existan en el servidor.
    function initGallery() {
        const gallery = document.getElementById("capturas");
        const viewer = document.getElementById("shot-viewer");
        const viewerImg = document.getElementById("shot-viewer-img");
        if (!gallery || !viewer || !viewerImg) return;
        const shots = [...gallery.querySelectorAll(".shot")];
        // Precargar miniaturas: las imágenes lazy dentro de una sección oculta
        // no se descargan automáticamente en algunos navegadores.
        Promise.all(shots.map(shot => new Promise(resolve => {
            const img = shot.querySelector("img");
            const probe = new Image();
            probe.onload = () => resolve(true);
            probe.onerror = () => { shot.hidden = true; resolve(false); };
            probe.src = img.getAttribute("src");
            shot.addEventListener("click", () => {
                viewerImg.src = shot.dataset.full;
                viewerImg.alt = img.alt;
                viewer.showModal();
            });
        }))).then(results => {
            gallery.hidden = !results.some(Boolean);
        });
        viewer.querySelector(".shot-viewer-close").addEventListener("click", () => viewer.close());
        viewer.addEventListener("click", event => { if (event.target === viewer) viewer.close(); });
    }

    initGallery();
    init();
})();
