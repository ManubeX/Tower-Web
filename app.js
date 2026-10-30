(() => {
  "use strict";
  const cfg = window.TOWER_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const validRepo = cfg.owner && cfg.repo && !["CAMBIA-ESTO", "", undefined].includes(cfg.owner) && !["CAMBIA-ESTO", "", undefined].includes(cfg.repo);
  const repoUrl = validRepo ? `https://github.com/${encodeURIComponent(cfg.owner)}/${encodeURIComponent(cfg.repo)}` : "";
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const dateText = (date) => date ? new Intl.DateTimeFormat("es-ES", { year: "numeric", month: "short", day: "numeric" }).format(new Date(date)) : "Fecha no indicada";
  const assetZip = (release) => (release.assets || []).find((a) => a.name.toLowerCase().endsWith(".zip"));
  const md = (text) => escapeHtml(text || "").replace(/\r?\n/g, "<br>").replace(/`([^`]+)`/g, "<code>$1</code>");
  function setLink(id, href) { const el = $(id); if (el && href) el.href = href; }
  function renderInfo() {
    $("channel-label").textContent = cfg.channelLabel || "VERSIONES PARA TESTERS";
    $("install-note").textContent = cfg.installNote || "Extrae el ZIP antes de iniciar el juego.";
    $("footer-year").textContent = new Date().getFullYear();
    $("controls-list").innerHTML = (cfg.controls || []).map((x) => `<div class="key-row"><kbd>${escapeHtml(x.key)}</kbd><span>${escapeHtml(x.action)}</span></div>`).join("") || "<p>Añade los controles en config.js.</p>";
    $("issues-list").innerHTML = (cfg.knownIssues || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("") || "<li>Sin problemas conocidos indicados.</li>";
    if (repoUrl) { setLink("repo-link", `${repoUrl}/releases`); setLink("all-releases", `${repoUrl}/releases`); setLink("feedback-link", `${repoUrl}/issues/new`); }
  }
  function renderRelease(release, isLatest) {
    const zip = assetZip(release);
    const tag = release.tag_name || "Versión sin etiqueta";
    const badge = release.prerelease ? "PRELIMINAR" : (isLatest ? "ÚLTIMA VERSIÓN" : "VERSIÓN");
    const download = zip ? `<a class="release-download" href="${escapeHtml(zip.browser_download_url)}" target="_blank" rel="noreferrer">Descargar ZIP <span>↓</span></a>` : `<a class="release-download" href="${escapeHtml(release.html_url)}" target="_blank" rel="noreferrer">Ver archivos <span>↗</span></a>`;
    return `<article class="release-card ${isLatest ? "is-latest" : ""}"><div class="release-top"><div><span class="release-badge">${badge}</span><h3>${escapeHtml(release.name || tag)}</h3><p class="release-date">${escapeHtml(tag)} <span>·</span> ${dateText(release.published_at)}</p></div>${download}</div><div class="release-notes">${md(release.body || "Sin notas para esta versión.")}</div></article>`;
  }
  async function loadReleases() {
    if (!validRepo) {
      $("latest-meta").textContent = "Configura el repositorio público en config.js";
      $("release-list").innerHTML = '<div class="empty-card"><strong>Falta conectar las Releases.</strong><p>Abre <code>config.js</code> y completa <code>owner</code> y <code>repo</code> con los datos del repositorio público.</p></div>';
      return;
    }
    try {
      const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(cfg.owner)}/${encodeURIComponent(cfg.repo)}/releases?per_page=100`, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) throw new Error(response.status === 404 ? "No se encontró el repositorio o no es público." : `GitHub respondió ${response.status}.`);
      const releases = (await response.json()).filter((r) => !r.draft);
      if (!releases.length) {
        $("latest-meta").textContent = "Todavía no hay versiones publicadas";
        $("release-list").innerHTML = '<div class="empty-card"><strong>Aún no hay Releases.</strong><p>Cuando publiques la primera versión, aparecerá aquí automáticamente.</p></div>';
        return;
      }
      const latest = releases.find((r) => cfg.allowPrereleaseAsLatest || !r.prerelease) || releases[0];
      const zip = assetZip(latest);
      $("latest-meta").textContent = `${latest.tag_name || latest.name} · ${dateText(latest.published_at)}${zip ? ` · ${Math.max(1, (zip.size / 1048576)).toFixed(1)} MB` : " · ZIP pendiente"}`;
      if (zip) { const button = $("latest-download"); button.href = zip.browser_download_url; button.target = "_blank"; button.rel = "noreferrer"; button.classList.remove("disabled"); button.removeAttribute("aria-disabled"); }
      else { $("latest-meta").textContent += " · Abre la Release para descargar"; }
      $("release-list").innerHTML = releases.map((r) => renderRelease(r, r.id === latest.id)).join("");
    } catch (error) {
      $("latest-meta").textContent = "No se pudieron cargar las versiones";
      $("release-list").innerHTML = `<div class="empty-card"><strong>No se pudo conectar con GitHub.</strong><p>${escapeHtml(error.message)} Comprueba los datos de config.js y vuelve a intentarlo.</p></div>`;
    }
  }
  renderInfo();
  loadReleases();
})();
