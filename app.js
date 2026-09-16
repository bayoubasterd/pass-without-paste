(async function initializeTesterPortal() {
  "use strict";

  const disableLink = (element, label) => {
    element.textContent = label;
    element.setAttribute("aria-disabled", "true");
    element.removeAttribute("target");
    element.removeAttribute("rel");
    element.href = "#";
  };

  const enableLink = (element, label, url) => {
    element.textContent = label;
    element.removeAttribute("aria-disabled");
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  };

  try {
    const response = await fetch("version.json", { cache: "no-store", credentials: "omit" });
    if (!response.ok) throw new Error("Version notice unavailable");
    const release = await response.json();

    document.getElementById("current-version").textContent = `Version ${release.currentVersion}`;
    document.getElementById("release-state").textContent = release.channel || "Alpha";
    if (release.message) document.getElementById("release-message").textContent = release.message;

    const downloadLink = document.getElementById("download-link");
    if (release.downloadUrl) {
      enableLink(downloadLink, `Download ${release.currentVersion}`, release.downloadUrl);
      document.getElementById("download-note").textContent = release.checksum
        ? `SHA-256: ${release.checksum}`
        : "Use only the download linked from this page.";
    } else {
      disableLink(downloadLink, "Download not yet open");
    }

    const reportLink = document.getElementById("report-link");
    if (release.reportUrl) enableLink(reportLink, "Report your findings", release.reportUrl);
    else disableLink(reportLink, "Reporting not yet open");
  } catch (_) {
    document.getElementById("current-version").textContent = "Version notice unavailable";
    document.getElementById("release-message").textContent = "Please use the version supplied with your invitation and check back later.";
  }

  for (const link of document.querySelectorAll('a[aria-disabled="true"]')) {
    link.addEventListener("click", (event) => event.preventDefault());
  }
})();
