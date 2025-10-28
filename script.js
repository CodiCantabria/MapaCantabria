let currentMap = "niños";           
let dataCache  = {};                

const popup  = document.getElementById("popup");
const svgMap = document.getElementById("svgMap");


window.TOTALES_CANTABRIA = window.TOTALES_CANTABRIA || {
  ninos: 4.394,     
  centros: 76    
};


const municipiosOtros = ["Santander", "Torrelavega", "Castro Urdiales", "Pielagos", "Camargo"];

const galPorMunicipio = {
  "Potes": "Grupo de Acción Local Liébana",
  "Tresviso": "Grupo de Acción Local Liébana",
  "Cabezon de Liebana": "Grupo de Acción Local Liébana",
  "Cillorigo de Liebana": "Grupo de Acción Local Liébana",
  "Pesaguero": "Grupo de Acción Local Liébana",
  "Vega de Liebana": "Grupo de Acción Local Liébana",
  "Camaleño": "Grupo de Acción Local Liébana",

  "Mancomunidad de Campoo-Cabuerniga": "Saja-Nansa Asociación de Desarrollo Rural",
  "Cabuerniga": "Saja-Nansa Asociación de Desarrollo Rural",
  "Penarrubia": "Saja-Nansa Asociación de Desarrollo Rural",
  "Comillas": "Saja-Nansa Asociación de Desarrollo Rural",
  "Ruiloba": "Saja-Nansa Asociación de Desarrollo Rural",
  "Udias": "Saja-Nansa Asociación de Desarrollo Rural",
  "Cabezon de la Sal": "Saja-Nansa Asociación de Desarrollo Rural",
  "Mazcuerras": "Saja-Nansa Asociación de Desarrollo Rural",
  "Alfoz de Lloredo": "Saja-Nansa Asociación de Desarrollo Rural",
  "Tudanca": "Saja-Nansa Asociación de Desarrollo Rural",
  "Herrerias": "Saja-Nansa Asociación de Desarrollo Rural",
  "Los Tojos": "Saja-Nansa Asociación de Desarrollo Rural",
  "Ruente": "Saja-Nansa Asociación de Desarrollo Rural",
  "Lamason": "Saja-Nansa Asociación de Desarrollo Rural",
  "Rionansa": "Saja-Nansa Asociación de Desarrollo Rural",
  "Polaciones": "Saja-Nansa Asociación de Desarrollo Rural",
  "Valdaliga": "Saja-Nansa Asociación de Desarrollo Rural",
  "Val de San Vicente": "Saja-Nansa Asociación de Desarrollo Rural",
  "San Vicente": "Saja-Nansa Asociación de Desarrollo Rural",

  "Cieza": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Campoo de Enmedio": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Campoo de Yuso": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Campoo de Suso": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Reinosa": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Molledo": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Molledo1": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Barcena de Pie de Concha": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Arenas de Iguna": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Anievas": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Pesquera": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Santiurde de Reinosa": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Valdeolea": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Valdeprado del Rio": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Valderredible": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "San Miguel de Aguayo": "Asociación Desarrollo Territorial Campoo - Los Valles",
  "Rozas de Valdearroyo": "Asociación Desarrollo Territorial Campoo - Los Valles",

  "Vega de Pas": "Valles Pasiegos Grupo de Acción Local",
  "Puente Viesgo": "Valles Pasiegos Grupo de Acción Local",
  "Miera": "Valles Pasiegos Grupo de Acción Local",
  "Lierganes": "Valles Pasiegos Grupo de Acción Local",
  "Penagos": "Valles Pasiegos Grupo de Acción Local",
  "San Pedro del Romeral": "Valles Pasiegos Grupo de Acción Local",
  "San Roque de Riomiera": "Valles Pasiegos Grupo de Acción Local",
  "Selaya": "Valles Pasiegos Grupo de Acción Local",
  "Villacarriedo": "Valles Pasiegos Grupo de Acción Local",
  "Saro": "Valles Pasiegos Grupo de Acción Local",
  "Villafufre": "Valles Pasiegos Grupo de Acción Local",
  "Santa Maria de Cayon": "Valles Pasiegos Grupo de Acción Local",
  "Castañeda": "Valles Pasiegos Grupo de Acción Local",
  "Corvera de Toranzo": "Valles Pasiegos Grupo de Acción Local",
  "Santiurde de Toranzo": "Valles Pasiegos Grupo de Acción Local",
  "Luena": "Valles Pasiegos Grupo de Acción Local",

  "Ramales de la Victoria": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Ribamontan al Monte": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Entrambasaguas": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Ruesga": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Riotuerto": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Rasines": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Valle de Villaverde": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Limpias": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Soba": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Ampuero": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Guriezo": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Liendo": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Hazas de Cesto": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Barcena de Cicero": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Arredondo": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Solorzano": "Grupo de Acción Local Asón - Agüera - Trasmiera",
  "Voto": "Grupo de Acción Local Asón - Agüera - Trasmiera",

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


document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentMap = btn.dataset.mapa;

    if (currentMap === "mancomunidades") {
      svgMap.setAttribute("data", "mancomunidades.svg");
    } else {
      svgMap.setAttribute("data", "cantabria.svg");
    }

    showDefaultPopup();
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

    path.addEventListener("click", (ev) => {
      ev.stopPropagation(); 

      
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

// Click fuera del área del mapa => Totales
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
    html += info.map(item => {
      const n = (typeof item?.niños === "number" ? item.niños :
                (typeof item?.ninos === "number" ? item.ninos : 0));
      const tipo = (item?.tipo ?? 'Total');
      return `- ${tipo}: ${n} NIÑOS`;
    }).join("<br/>");
  } else if (typeof info === "object") {
    html += Object.entries(info).map(([k, v]) => `${k}: ${v}`).join("<br/>");
  } else {
    html += info;
  }

  popup.innerHTML = html;

  // MISMA POSICIÓN QUE EL RESTO DE POPUPS
  popup.style.right = "";
  popup.style.left  = "100px";
  popup.style.top   = "10px";

  popup.classList.remove("hidden");
}

function showDefaultPopup(){
  const t = window.TOTALES_CANTABRIA || {};
  const val = (x)=> (x ?? "—");
  popup.innerHTML = `
    <strong>Cantabria - Totales</strong><br/>
    Nº de niños: ${val(t.ninos)}<br/>
    Nº de centros: ${val(t.centros)}
  `;
  // MISMA POSICIÓN QUE LOS POPUPS DE MUNICIPIO
  popup.style.right = "";
  popup.style.left  = "100px";
  popup.style.top   = "10px";
  popup.classList.remove("hidden");
}
