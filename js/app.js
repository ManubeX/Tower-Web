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
            return marked.parse(text);
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

    // Obtener el número de versión.
    function version(r) {
        let m = ((r.name || "") + " " + (r.tag_name || ""))
            .match(/(?:v)?(\d+\.\d+(?:\.\d+)?)/);

        return m ? m[1] : (r.tag_name || "—");
    }

    // Comparar versiones numéricamente.
    // Ejemplo: 0.10.50 > 0.8.6
    function compareVersions(a, b) {
        const parse = r => {
            return version(r)
                .split(".")
                .map(n => parseInt(n, 10) || 0);
        };

        const va = parse(a);
        const vb = parse(b);

        for (let i = 0; i < Math.max(va.length, vb.length); i++) {
            const na = va[i] || 0;
            const nb = vb[i] || 0;

            if (na !== nb) {
                return nb - na;
            }
        }

        // Si tienen el mismo número, ordenar por fecha.
        return new Date(b.published_at || b.created_at) -
               new Date(a.published_at || a.created_at);
    }

    // Obtener el título sin la fase de desarrollo.
    function title(r) {
        return (r.name || r.tag_name || "Nueva versión")
            .replace(/^(pre[- ]?alpha|alpha|beta|release)\s*/i, "")
            .trim();
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
            title(r) || "Versión de pruebas de TOWER";

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

        if (!older.length) {
            root.innerHTML =
                '<div class="empty-state">Todavía no hay versiones anteriores.</div>';
            return;
        }

        root.innerHTML = "";

        older.forEach(r => {
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
                    ${esc(title(r) || "Versión de TOWER")}
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
        });
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

            $("load-error").textContent =
                "No se han podido cargar las versiones. Comprueba que el repositorio sea público.";

            console.error(e);
        }
    }

    init();
})();
