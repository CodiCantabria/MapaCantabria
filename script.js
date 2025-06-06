let currentMap = "niños";
let dataCache = {};

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentMap = btn.dataset.mapa;
    document.getElementById("popup").classList.add("hidden");
  });
});

const popup = document.getElementById("popup");
const svgMap = document.getElementById("svgMap");

svgMap.addEventListener("load", () => {
  const svgDoc = svgMap.contentDocument;
  if (!svgDoc) {
    console.error("❌ No se pudo acceder al contenido del SVG.");
    return;
  }

  const municipios = svgDoc.querySelectorAll("path");
  municipios.forEach(path => {
    if (!path.id) return;

    path.style.cursor = "pointer";
    path.addEventListener("click", () => {
      const municipioBox = path.getBoundingClientRect();
      const mapBox = svgMap.getBoundingClientRect();

      const x = municipioBox.left + municipioBox.width / 2 - mapBox.left;
      const y = municipioBox.top + municipioBox.height / 2 - mapBox.top;

      fetchDataAndShowPopup(path.id, x, y);
    });
  });
});

function fetchDataAndShowPopup(name, x, y) {
  const jsonFile = currentMap === 'niños' ? 'ninos' : currentMap;

  if (dataCache[currentMap]) {
    showPopup(dataCache[currentMap][name], name, x, y);
  } else {
    fetch(`data/${jsonFile}.json`)
      .then(res => res.json())
      .then(data => {
        dataCache[currentMap] = data;
        showPopup(data[name], name, x, y);
      })
      .catch(err => console.error("❌ Error al cargar JSON:", err));
  }
}

function showPopup(info, name, x, y) {
  if (!info) {
    popup.classList.add("hidden");
    return;
  }

  let html = `<strong>${name}</strong><br/>`;
  if (Array.isArray(info)) {
    html += info.map(item => `- ${item.tipo}: ${item.niños} NIÑOS`).join("<br/>");
  } else if (typeof info === "object") {
    html += Object.entries(info).map(([k, v]) => `${k}: ${v}`).join("<br/>");
  } else {
    html += info;
  }

  popup.innerHTML = html;

  const svgRect = svgMap.getBoundingClientRect();
  const popupWidth = 250;
  const popupHeight = popup.offsetHeight || 100;

  const leftSpace = x - popupWidth - 20;
  const rightSpace = svgRect.width - (x + popupWidth + 20);

  let posX, posY;

  if (rightSpace > 0) {
    posX = x + 20;
  } else if (leftSpace > 0) {
    posX = x - popupWidth - 20;
  } else {
    posX = x - popupWidth / 2;
  }

  posX = Math.max(10, Math.min(svgRect.width - popupWidth - 10, posX));
  posY = y - popupHeight / 2;
  posY = Math.max(10, Math.min(svgRect.height - popupHeight - 10, posY));

  popup.style.left = `${posX}px`;
  popup.style.top = `${posY}px`;
  popup.classList.remove("hidden");
}
