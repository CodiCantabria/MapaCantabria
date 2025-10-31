let currentMap = "niños";
let dataCache = {};

const popup = document.getElementById("popup");
const svgMap = document.getElementById("svgMap");

const municipiosOtros = ["Santander", "Torrelavega", "Castro Urdiales", "Pielagos", "Camargo"];

const galPorMunicipio = {
  "Potes": "Liébana",
  "Tresviso": "Liébana",
  "Cabezon de Liebana": "Liébana",
  "Cillorigo de Liebana": "Liébana",
  "Pesaguero": "Liébana",
  "Vega de Liebana": "Liébana",
  "Camaleño": "Liébana",
  "Penarrubia": "Liébana",


  "Mancomunidad de Campoo-Cabuerniga": "Saja-Nansa",
  "Cabuerniga": "Saja-Nansa",
  "Comillas": "Saja-Nansa",
  "Ruiloba": "Saja-Nansa",
  "Udias": "Saja-Nansa",
  "Cabezon de la Sal": "Saja-Nansa",
  "Mazcuerras": "Saja-Nansa",
  "Alfoz de Lloredo": "Saja-Nansa",
  "Tudanca": "Saja-Nansa",
  "Herrerias": "Saja-Nansa",
  "Los Tojos": "Saja-Nansa",
  "Ruente": "Saja-Nansa",
  "Lamason": "Saja-Nansa",
  "Rionansa": "Saja-Nansa",
  "Polaciones": "Saja-Nansa",
  "Valdaliga": "Saja-Nansa",
  "Val de San Vicente": "Saja-Nansa",
  "San Vicente": "Saja-Nansa",

  "Cieza": "Campoo - Los Valles",
  "Campoo de Enmedio": "Campoo - Los Valles",
  "Campoo de Yuso": "Campoo - Los Valles",
  "Campoo de Suso": "Campoo - Los Valles",
  "Reinosa": "Campoo - Los Valles",
  "Molledo": "Campoo - Los Valles",
  "Molledo1": "Campoo - Los Valles",
  "Barcena de Pie de Concha": "Campoo - Los Valles",
  "Arenas de Iguna": "Campoo - Los Valles",
  "Anievas": "Campoo - Los Valles",
  "Pesquera": "Campoo - Los Valles",
  "Santiurde de Reinosa": "Campoo - Los Valles",
  "Valdeolea": "Campoo - Los Valles",
  "Valdeprado del Rio": "Campoo - Los Valles",
  "Valderredible": "Campoo - Los Valles",
  "San Miguel de Aguayo": "Campoo - Los Valles",
  "Rozas de Valdearroyo": "Campoo - Los Valles",

  "Vega de Pas": "Valles Pasiegos",
  "Puente Viesgo": "Valles Pasiegos",
  "Miera": "Valles Pasiegos",
  "Lierganes": "Valles Pasiegos",
  "Penagos": "Valles Pasiegos",
  "San Pedro del Romeral": "Valles Pasiegos",
  "San Roque de Riomiera": "Valles Pasiegos",
  "Selaya": "Valles Pasiegos",
  "Villacarriedo": "Valles Pasiegos",
  "Saro": "Valles Pasiegos",
  "Villafufre": "Valles Pasiegos",
  "Santa Maria de Cayon": "Valles Pasiegos",
  "Castañeda": "Valles Pasiegos",
  "Corvera de Toranzo": "Valles Pasiegos",
  "Santiurde de Toranzo": "Valles Pasiegos",
  "Luena": "Valles Pasiegos",

  "Ramales de la Victoria": "Asón Agüera Trasmiera",
  "Ribamontan al Monte": "Asón Agüera Trasmiera",
  "Entrambasaguas": "Asón Agüera Trasmiera",
  "Ruesga": "Asón Agüera Trasmiera",
  "Riotuerto": "Asón Agüera Trasmiera",
  "Rasines": "Asón Agüera Trasmiera",
  "Valle de Villaverde": "Asón Agüera Trasmiera",
  "Limpias": "Asón Agüera Trasmiera",
  "Soba": "Asón Agüera Trasmiera",
  "Ampuero": "Asón Agüera Trasmiera",
  "Guriezo": "Asón Agüera Trasmiera",
  "Liendo": "Asón Agüera Trasmiera",
  "Hazas de Cesto": "Asón Agüera Trasmiera",
  "Barcena de Cicero": "Asón Agüera Trasmiera",
  "Arredondo": "Asón Agüera Trasmiera",
  "Solorzano": "Asón Agüera Trasmiera",
  "Voto": "Asón Agüera Trasmiera",

  "Reocin": "Otros Municipios",
  "Cartes": "Otros Municipios",
  "Santillana del Mar":"Otros Municipios",
  "San Felices de Buelna": "Otros Municipios",
  "Los Corrales de Buelna": "Otros Municipios",
  "Miengo": "Otros Municipios",
  "Suances": "Otros Municipios",
  "Polanco": "Otros Municipios",
  "Bezana": "Otros Municipios",
  "Villaescusa": "Otros Municipios",
  "Astillero": "Otros Municipios",
  "Medio Cudeyo": "Otros Municipios",
  "Marina de Cudeyo": "Otros Municipios",
  "Ribamontán al Mar": "Otros Municipios",
  "Bareyo": "Otros Municipios",
  "Meruelo": "Otros Municipios",
  "Arnuero": "Otros Municipios",
  "Noja": "Otros Municipios",
  "Escalante": "Otros Municipios",
  "Argonos": "Otros Municipios",
  "Santona": "Otros Municipios",
  "Laredo": "Otros Municipios",
  "Colindres": "Otros Municipios",
};

window.TOTALES_CANTABRIA = window.TOTALES_CANTABRIA || {
  ninos: 4271,
  centros: 80,
  ayuntamientos: 22,
  serviciosSociales: 25,
  centrosEducativos: 32,
  asociaciones: 1
};

function showDefaultPopup() {
  const t = window.TOTALES_CANTABRIA || {};
  const val = (x) => (x ?? "—");
  popup.innerHTML = `
    <strong>Cantabria - Totales</strong><br/>
    Total niños: ${val(t.ninos)}<br/>
    Total centros: ${val(t.centros)}<br/>
    - Ayuntamientos: ${val(t.ayuntamientos)}<br/>
    - Servicios sociales: ${val(t.serviciosSociales)}<br/>
    - Centros educativos: ${val(t.centrosEducativos)}<br/>
    - Asociaciones: ${val(t.asociaciones)}
  `;
  popup.style.left = "100px";
  popup.style.top = "10px";
  popup.classList.remove("hidden");
}


document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentMap = btn.dataset.mapa;
    popup.classList.add("hidden");

    if (currentMap === "mancomunidades") {
      svgMap.setAttribute("data", "mancomunidades.svg");
    } else {
      svgMap.setAttribute("data", "cantabria.svg");
    }
    
  });
});

svgMap.addEventListener("load", () => {
  const svgDoc = svgMap.contentDocument;
  if (!svgDoc) {
    console.error("❌ No se pudo acceder al contenido del SVG.");
    return;
  }

  const zonas = svgDoc.querySelectorAll("path");
  zonas.forEach(path => {
    if (!path.id) return;

    path.style.cursor = "pointer";
    path.addEventListener("click", () => {
      const fill = path.getAttribute("fill") || path.style.fill;
      if (!fill || fill === "none" || fill === "#ffffff" || fill === "#fff") return;

      const nombre = path.id;

      const titleTag = path.querySelector("title");
      const displayName = titleTag ? titleTag.textContent.trim() : nombre;

      if (currentMap === "mancomunidades") {
        if (municipiosOtros.includes(nombre)) {
          fetchDataAndShowPopup(nombre, displayName);
        } else {
          const gal = galPorMunicipio[nombre];
          if (!gal) {
            popup.classList.add("hidden");
            return;
          }
          fetchDataAndShowPopup(gal, gal);
        }
      } else {
        fetchDataAndShowPopup(nombre, displayName);
      }
    });
  });

  const svgRoot = svgDoc.documentElement;
  svgRoot.addEventListener("click", (e) => {
    const clickedPath = e.target.closest("path");
    if (!clickedPath) showDefaultPopup();
  });

  showDefaultPopup();
});

document.addEventListener("click", (e) => {
  const wrapper = document.querySelector(".mapa-wrapper");
  if (!wrapper) return;
  if (!wrapper.contains(e.target)) showDefaultPopup();
});

function fetchDataAndShowPopup(lookupKey, displayName) {
  const jsonFile = currentMap === 'niños' ? 'ninos' :
                   currentMap === 'mancomunidades' ? 'gal_resumen' :
                   currentMap;

  if (dataCache[currentMap]) {
    const data = dataCache[currentMap];
    let info = data[lookupKey];

    if (!info && (currentMap === 'niños' || currentMap === 'centros')) {
      const gal = galPorMunicipio[lookupKey];
      if (gal && data[gal]) {
        info = data[gal];
        displayName = `${lookupKey} (en ${gal})`;
      }
    }

    showPopup(info, displayName);
  } else {
    fetch(`data/${jsonFile}.json`)
      .then(res => res.json())
      .then(data => {
        dataCache[currentMap] = data;
        let info = data[lookupKey];

        if (!info && (currentMap === 'niños' || currentMap === 'centros')) {
          const gal = galPorMunicipio[lookupKey];
          if (gal && data[gal]) {
            info = data[gal];
            displayName = `${lookupKey} (en ${gal})`;
          }
        }

        showPopup(info, displayName);
      })
      .catch(err => console.error("❌ Error al cargar JSON:", err));
  }
}

function showPopup(info, name) {
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
  popup.style.left = "100px";
  popup.style.top = "10px";
  popup.classList.remove("hidden");
}

