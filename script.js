// =======================
// Configuración General
// =======================

let fotoCargada = null;
let idxMarco = 0;

let fotoCfg = {
    x: 60,
    y: 315,
    w: 270,
    h: 310
};
let marcoCfg = {
    x: 60,
    y: 315,
    w: 270,
    h: 310
};

const marcosDisponibles = [
    "assets/m0.png",
    "assets/m1.png",
    "assets/m2.png",
    "assets/m3.png",
    "assets/m4.png",
    "assets/m5.png",
    "assets/m6.png",
    "assets/m7.png",
    "assets/m8.png",
    "assets/m9.png",
    "assets/m10.png",
    "assets/m11.png"
];

// ========== Selección de elementos =============
const fuenteTitulosInput = document.getElementById('fuenteTitulos');
const fuenteInput = document.getElementById('fuente');
const nombreInput = document.getElementById('nombre');
const colorNombre = document.getElementById('colorNombre');
const sizeNombre = document.getElementById('sizeNombre');
const negritaNombre = document.getElementById('negritaNombre');
const mensajeInput = document.getElementById('mensaje');
const colorMensaje = document.getElementById('colorMensaje');
const negritaMensaje = document.getElementById('negritaMensaje');
const cursivaMensaje = document.getElementById('cursivaMensaje');
const mensajeNormal = document.getElementById('mensajeNormal');
const mensajeCentro = document.getElementById('mensajeCentro');
const mensajeJustificar = document.getElementById('mensajeJustificar');
const fechaInput = document.getElementById('fecha');
const colorFecha = document.getElementById('colorFecha');
const negritaFecha = document.getElementById('negritaFecha');
const cursivaFecha = document.getElementById('cursivaFecha');

const fotoInput = document.getElementById('fotoEmpleado');
const fotoPreview = document.getElementById('foto-preview');
const btnMarcoPrev = document.getElementById('marcoPrevio');
const btnMarcoNext = document.getElementById('marcoSiguiente');

// Sliders para foto y marco
const fotoX = document.getElementById('fotoX');
const fotoY = document.getElementById('fotoY');
const fotoW = document.getElementById('fotoW');
const fotoH = document.getElementById('fotoH');
const marcoX = document.getElementById('marcoX');
const marcoY = document.getElementById('marcoY');
const marcoW = document.getElementById('marcoW');
const marcoH = document.getElementById('marcoH');

// Sliders de posición para textos
const nombreX = document.getElementById('nombreX');
const nombreY = document.getElementById('nombreY');
const mensajeX = document.getElementById('mensajeX');
const mensajeY = document.getElementById('mensajeY');
const fechaX = document.getElementById('fechaX');
const fechaY = document.getElementById('fechaY');

// ========== Encabezados triples =============
const titulos = [
    {
        input: document.getElementById('titulo1'),
        color: document.getElementById('colorTitulo1'),
        borde: document.getElementById('bordeTitulo1'),
        size: document.getElementById('sizeTitulo1'),
        bold: document.getElementById('boldTitulo1'),
        x: document.getElementById('titulo1X'),
        y: document.getElementById('titulo1Y'),
        fuente: fuenteTitulosInput,
        vista: document.getElementById('titulo1Vista')
    },
    {
        input: document.getElementById('titulo2'),
        color: document.getElementById('colorTitulo2'),
        borde: document.getElementById('bordeTitulo2'),
        size: document.getElementById('sizeTitulo2'),
        bold: document.getElementById('boldTitulo2'),
        x: document.getElementById('titulo2X'),
        y: document.getElementById('titulo2Y'),
        fuente: fuenteTitulosInput,
        vista: document.getElementById('titulo2Vista')
    },
    {
        input: document.getElementById('titulo3'),
        color: document.getElementById('colorTitulo3'),
        borde: document.getElementById('bordeTitulo3'),
        size: document.getElementById('sizeTitulo3'),
        bold: document.getElementById('boldTitulo3'),
        x: document.getElementById('titulo3X'),
        y: document.getElementById('titulo3Y'),
        fuente: fuenteTitulosInput,
        vista: document.getElementById('titulo3Vista')
    }
];

// ========== EVENTOS PARA SLIDERS DE FOTO Y MARCO ==========
[fotoX, fotoY, fotoW, fotoH].forEach(el => el.oninput = function () {
    fotoCfg.x = parseInt(fotoX.value);
    fotoCfg.y = parseInt(fotoY.value);
    fotoCfg.w = parseInt(fotoW.value);
    fotoCfg.h = parseInt(fotoH.value);
    dibujarPreviewFotoConMarco();
});
[marcoX, marcoY, marcoW, marcoH].forEach(el => el.oninput = function () {
    marcoCfg.x = parseInt(marcoX.value);
    marcoCfg.y = parseInt(marcoY.value);
    marcoCfg.w = parseInt(marcoW.value);
    marcoCfg.h = parseInt(marcoH.value);
    dibujarPreviewFotoConMarco();
});

// ========== EVENTOS PARA SLIDERS DE TEXTO (Mover nombre, mensaje, fecha) ==========
[nombreX, nombreY, mensajeX, mensajeY, fechaX, fechaY].forEach(el => el.oninput = updateVista);

// ================== EVENTOS BOTONES MARCO ==================
btnMarcoPrev.onclick = function () {
    idxMarco = (idxMarco - 1 + marcosDisponibles.length) % marcosDisponibles.length;
    dibujarPreviewFotoConMarco();
};
btnMarcoNext.onclick = function () {
    idxMarco = (idxMarco + 1) % marcosDisponibles.length;
    dibujarPreviewFotoConMarco();
};

// ================== CARGA FOTO ==================
fotoInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
        const img = new window.Image();
        img.onload = function () {
            fotoCargada = img;

            fotoCfg.x = 0;
            fotoCfg.y = 0;
            fotoCfg.w = marcoCfg.w;
            fotoCfg.h = marcoCfg.h;

            fotoX.value = fotoCfg.x;
            fotoY.value = fotoCfg.y;
            fotoW.value = fotoCfg.w;
            fotoH.value = fotoCfg.h;

            dibujarPreviewFotoConMarco();
        }
        img.src = ev.target.result;
    }
    reader.readAsDataURL(file);
});

// ================== PREVIEW FOTO+MARCO ==================
function dibujarPreviewFotoConMarco() {
    fotoPreview.width = marcoCfg.w;
    fotoPreview.height = marcoCfg.h;
    const ctx = fotoPreview.getContext('2d');
    ctx.clearRect(0, 0, fotoPreview.width, fotoPreview.height);

    if (fotoCargada) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, marcoCfg.w, marcoCfg.h);
        ctx.clip();
        ctx.drawImage(
            fotoCargada,
            0, 0, fotoCargada.width, fotoCargada.height,
            fotoCfg.x, fotoCfg.y, fotoCfg.w, fotoCfg.h
        );
        ctx.restore();
    }

    const marcoImg = new window.Image();
    marcoImg.onload = function () {
        ctx.drawImage(marcoImg, 0, 0, marcoCfg.w, marcoCfg.h);
    };
    marcoImg.src = marcosDisponibles[idxMarco];

    const marcoDiv = document.querySelector('.foto-marco');
    marcoDiv.style.left = marcoCfg.x + "px";
    marcoDiv.style.top = marcoCfg.y + "px";
    marcoDiv.style.width = marcoCfg.w + "px";
    marcoDiv.style.height = marcoCfg.h + "px";
}

// ========== SLIDERS Y INPUTS DE TEXTO GENERAL ==========
[
    fuenteInput, nombreInput, colorNombre, sizeNombre, negritaNombre,
    mensajeInput, colorMensaje, negritaMensaje, cursivaMensaje,
    mensajeNormal, mensajeCentro, mensajeJustificar,
    fechaInput, colorFecha, negritaFecha, cursivaFecha,
    fuenteTitulosInput
].forEach(el => el.addEventListener('input', updateVista));

fuenteInput.addEventListener('change', updateVista);
fuenteTitulosInput.addEventListener('change', updateVista);

titulos.forEach(t => {
    [t.input, t.color, t.borde, t.size, t.bold, t.x, t.y, t.fuente].forEach(e => {
        e.addEventListener('input', updateVista);
    });
});

// ========== ACTUALIZA TEXTO EN LA PLANTILLA ==========
function updateVista() {
    // Títulos triples
    titulos.forEach(t => {
        t.vista.textContent = t.input.value;
        t.vista.style.color = t.color.value;
        t.vista.style.fontSize = t.size.value + 'px';
        t.vista.style.fontWeight = t.bold.checked ? "bold" : "normal";
        t.vista.style.left = t.x.value + 'px';
        t.vista.style.top = t.y.value + 'px';
        t.vista.style.textShadow = `1px 1px 2px #fff, 0 0 6px ${t.borde.value}`;
        t.vista.style.webkitTextStroke = `2px ${t.borde.value}`;
        t.vista.style.fontFamily = t.fuente.value;
        t.vista.style.position = 'absolute';
    });

    // Nombre
    let nombreVista = document.getElementById('nombreVista');
    nombreVista.textContent = nombreInput.value;
    nombreVista.style.color = colorNombre.value;
    nombreVista.style.fontSize = sizeNombre.value + 'px';
    nombreVista.style.fontWeight = negritaNombre.checked ? "bold" : "normal";
    nombreVista.style.fontStyle = "normal";
    nombreVista.style.left = nombreX.value + 'px';
    nombreVista.style.top = nombreY.value + 'px';
    nombreVista.style.fontFamily = fuenteInput.value;

    // Mensaje
    let mensajeVista = document.getElementById('mensajeVista');
    mensajeVista.textContent = mensajeInput.value;
    mensajeVista.style.left = mensajeX.value + 'px';
    mensajeVista.style.top = mensajeY.value + 'px';
    mensajeVista.style.fontWeight = negritaMensaje.checked ? "bold" : "normal";
    mensajeVista.style.fontStyle = cursivaMensaje.checked ? "italic" : "normal";
    mensajeVista.style.fontFamily = fuenteInput.value;
    mensajeVista.style.color = colorMensaje.value;
    if (mensajeCentro.checked) mensajeVista.style.textAlign = 'center';
    else if (mensajeJustificar.checked) mensajeVista.style.textAlign = 'justify';
    else mensajeVista.style.textAlign = 'left';

    // Fecha
    let fechaVista = document.getElementById('fechaVista');
    fechaVista.textContent = fechaInput.value;
    fechaVista.style.left = fechaX.value + 'px';
    fechaVista.style.top = fechaY.value + 'px';
    fechaVista.style.textAlign = 'left';
    fechaVista.style.fontWeight = negritaFecha.checked ? "bold" : "normal";
    fechaVista.style.fontStyle = cursivaFecha.checked ? "italic" : "normal";
    fechaVista.style.color = colorFecha.value;
    fechaVista.style.fontFamily = fuenteInput.value;

    dibujarPreviewFotoConMarco();
}

// ========== GENERA IMAGEN FINAL ==============
// ========== MODAL PARA EXPORTAR Y DESCARGAR ==========
function mostrarDialogoExportar(callback) {
    let modal = document.createElement('div');
    modal.style.position = "fixed";
    modal.style.left = 0; modal.style.top = 0;
    modal.style.right = 0; modal.style.bottom = 0;
    modal.style.background = "rgba(0,0,0,.4)";
    modal.style.zIndex = 9999;
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.innerHTML = `
    <div style="background:#fff;padding:28px 40px 28px 40px; border-radius:18px; box-shadow:0 8px 44px #0004;min-width:320px;max-width:95vw;">
      <h2 style="margin-bottom:18px;font-size:1.2em;">Export Image</h2>
      <div style="margin-bottom:18px;">
        <label><input type="radio" name="fmt" value="png" checked> PNG</label>
        <label style="margin-left:22px;"><input type="radio" name="fmt" value="jpeg"> JPEG</label>
      </div>
      <div id="pngopts" style="margin-bottom:18px;">
        <label><input type="checkbox" id="transparentOpt"> Transparent Background</label>
      </div>
      <div id="jpegopts" style="margin-bottom:18px; display:none;">
        <label>Quality:
            <select id="jpegQuality">
                <option value="0.6">Low</option>
                <option value="0.85" selected>Medium</option>
                <option value="1">High</option>
            </select>
        </label>
      </div>
      <div style="text-align:right;">
        <button id="btnCancel" style="margin-right:14px;">Cancel</button>
        <button id="btnExport" style="background:#154c79;color:#fff;padding:6px 20px;border:none;border-radius:5px;font-weight:bold;">Save</button>
      </div>
    </div>
    `;
    document.body.appendChild(modal);

    // Mostrar/ocultar opciones según formato
    modal.querySelectorAll('input[name="fmt"]').forEach(radio => {
        radio.onchange = () => {
            modal.querySelector('#pngopts').style.display = (radio.value === 'png' && radio.checked) ? "block" : "none";
            modal.querySelector('#jpegopts').style.display = (radio.value === 'jpeg' && radio.checked) ? "block" : "none";
        };
    });

    // Botón Cancelar
    modal.querySelector('#btnCancel').onclick = () => {
        document.body.removeChild(modal);
    };

    // Botón Guardar
    modal.querySelector('#btnExport').onclick = () => {
        let formato = modal.querySelector('input[name="fmt"]:checked').value;
        let transparente = modal.querySelector('#transparentOpt')?.checked ?? false;
        let calidad = 1;
        if (formato === "jpeg") {
            calidad = parseFloat(modal.querySelector('#jpegQuality').value);
        }
        document.body.removeChild(modal);
        callback(formato, transparente, calidad);
    };
}

// ========== GENERA Y DESCARGA IMAGEN FINAL ==========
document.getElementById('generarImg').onclick = function () {
    mostrarDialogoExportar((formato, transparente) => {
        exportarImagenFinal(formato, transparente);
    });
};

// ==== Envuelve texto exactamente igual al preview ====
function wrapText(ctx, text, x, y, maxWidth, lineHeight, align = "left") {
    const originalAlign = ctx.textAlign;
    let words = text.split(' ');
    let lines = [];
    let line = '';
    for (let n = 0; n < words.length; n++) {
        let testLine = line + (line ? ' ' : '') + words[n];
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n];
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    for (let i = 0; i < lines.length; i++) {
        let tx = x;
        if (align === "center") {
            tx = x + maxWidth / 2;
            ctx.textAlign = "center";
        } else if (align === "left") {
            ctx.textAlign = "left";
        }
        ctx.fillText(lines[i], tx, y + i * lineHeight);
    }
    ctx.textAlign = originalAlign; // Restaurar
}

// ========== GENERA Y DESCARGA IMAGEN FINAL ==========

function exportarImagenFinal(formato, transparente, calidad) {
    const width = 920, height = 730;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Fondo
    if (formato === "png" && transparente) {
        ctx.clearRect(0, 0, width, height);
    } else {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
    }
    const fondo = document.getElementById('imgFondo');
    ctx.drawImage(fondo, 0, 0, width, height);

    // Dibuja la foto
    if (fotoCargada) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(marcoCfg.x, marcoCfg.y, marcoCfg.w, marcoCfg.h);
        ctx.clip();
        ctx.drawImage(
            fotoCargada,
            0, 0, fotoCargada.width, fotoCargada.height,
            marcoCfg.x + fotoCfg.x,
            marcoCfg.y + fotoCfg.y,
            fotoCfg.w,
            fotoCfg.h
        );
        ctx.restore();
    }
    // Marco PNG sobre la foto
    let imgMarco = new window.Image();
    imgMarco.onload = function () {
        ctx.drawImage(imgMarco, marcoCfg.x, marcoCfg.y, marcoCfg.w, marcoCfg.h);

        // Títulos triples
        titulos.forEach(t => {
            ctx.save();
            ctx.font = `${t.bold.checked ? 'bold' : 'normal'} ${t.size.value}px ${t.fuente.value}`;
            ctx.fillStyle = t.color.value;
            ctx.strokeStyle = t.borde.value;
            ctx.lineWidth = 3;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.strokeText(t.input.value, parseInt(t.x.value), parseInt(t.y.value));
            ctx.fillText(t.input.value, parseInt(t.x.value), parseInt(t.y.value));
            ctx.restore();
        });

        // Nombre
        let nombreXv = parseInt(nombreX.value), nombreYv = parseInt(nombreY.value);
        let nombreSize = parseInt(sizeNombre.value);
        let nombreColor = colorNombre.value;
        let nombreWeight = negritaNombre.checked ? 'bold' : 'normal';
        ctx.font = `${nombreWeight} ${nombreSize}px ${fuenteInput.value}`;
        ctx.fillStyle = nombreColor;
        ctx.textAlign = "left";
        ctx.textBaseline = 'top';
        ctx.fillText(nombreInput.value, nombreXv, nombreYv);

        // MENSAJE: exactamente igual al preview
        let mensajeXv = parseInt(mensajeX.value), mensajeYv = parseInt(mensajeY.value);
        let mensajeColor = colorMensaje.value;
        let mensajeWeight = negritaMensaje.checked ? 'bold' : 'normal';
        let mensajeStyle = cursivaMensaje.checked ? 'italic' : 'normal';
        let mensajeAlign = mensajeCentro.checked ? 'center' : 'left';
        ctx.font = `${mensajeStyle} ${mensajeWeight} 20px ${fuenteInput.value}`;
        ctx.fillStyle = mensajeColor;
        ctx.textBaseline = 'top';
        // Aquí el truco: usamos el ancho REAL del preview
        let previewMensaje = document.getElementById('mensajeVista');
        let anchoMensaje = previewMensaje.offsetWidth || 470;
        let altoLinea = 24;
        wrapText(ctx, mensajeInput.value, mensajeXv, mensajeYv, anchoMensaje, altoLinea, mensajeAlign);

        // Fecha
        let fechaXv = parseInt(fechaX.value), fechaYv = parseInt(fechaY.value);
        let fechaWeight = negritaFecha.checked ? 'bold' : 'normal';
        let fechaStyle = cursivaFecha.checked ? 'italic' : 'normal';
        ctx.font = `${fechaStyle} ${fechaWeight} 20px ${fuenteInput.value}`;
        ctx.fillStyle = colorFecha.value;
        ctx.textAlign = "left";
        ctx.textBaseline = 'top';
        ctx.fillText(fechaInput.value, fechaXv, fechaYv);

        // Descargar imagen
        let mimeType = (formato === "png") ? "image/png" : "image/jpeg";
        let nombreArchivo = `UCC__${Date.now()}.${formato}`;
        let calidadFinal = (formato === "jpeg") ? calidad : undefined;
        canvas.toBlob(blob => {
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.style.display = "none";
            a.href = url;
            a.download = nombreArchivo;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 100);
        }, mimeType, calidadFinal);
    };
    imgMarco.crossOrigin = "anonymous";
    imgMarco.src = marcosDisponibles[idxMarco];
}

// --------- INICIALIZA
updateVista();
