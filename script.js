// --- 1. ENCONTRAR TODOS LOS ELEMENTOS DEL DOM ---
const botonIdeas = document.getElementById('boton-ideas');
const inputTema = document.getElementById('input-tema');
const selectorFormato = document.getElementById('selector-formato');
const resultadoTitulos = document.getElementById('resultado-titulos');
const resultadoMiniaturas = document.getElementById('resultado-miniaturas');
const botonGuionFinal = document.getElementById('boton-guion-final');
const resultadoGuionFinal = document.getElementById('resultado-guion-final');


// --- 2. FUNCIÓN PARA EL PRIMER BOTÓN (GENERAR IDEAS) ---
async function generarContenido() {
    console.log('Botón de ideas presionado.');
    resultadoTitulos.innerHTML = 'Generando ideas... 🧠';
    resultadoMiniaturas.innerHTML = 'Contactando a la cocina en Render...';
    
    const tema = inputTema.value;
    const formato = selectorFormato.value;

    try {
        // ¡LA URL COMPLETA Y CORRECTA!
        const url = 'https://script-maker-backend.onrender.com/generate-ideas';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: tema, format: formato })
        });
        
        if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
        
        const data = await response.json();
        
        resultadoTitulos.innerHTML = "— " + data.titulos.join('<br><br>— ');
        resultadoMiniaturas.innerHTML = "— " + data.miniaturas.map(item => item.descripcion).join('<br><br>— ');
        
    } catch (error) {
        console.error('Error generando ideas:', error);
        resultadoTitulos.innerHTML = 'Error al conectar con la IA.';
        resultadoMiniaturas.innerHTML = 'Asegúrate de que el backend en Render esté activo y refresca la página.';
    }
}


// --- 3. FUNCIÓN PARA EL SEGUNDO BOTÓN (GENERAR GUION FINAL) ---
async function generarGuionFinal() {
    console.log('Botón de guion final presionado.');
    resultadoGuionFinal.innerHTML = 'Escribiendo el guion final... 📝';

    const tema = inputTema.value;
    const formato = selectorFormato.value;

    try {
        // ¡LA URL COMPLETA Y CORRECTA TAMBIÉN AQUÍ!
        const url = 'https://script-maker-backend.onrender.com/generate-final-script';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topic: tema,
                format: formato,
            })
        });

        if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
        
        const data = await response.json();
        
        const guionHtml = data.guion.replace(/\n/g, '<br>');
        resultadoGuionFinal.innerHTML = guionHtml;

    } catch (error) {
        console.error('Error generando el guion final:', error);
        resultadoGuionFinal.textContent = 'Error al generar el guion final.';
    }
}


// --- 4. CONECTAR LAS FUNCIONES A LOS BOTONES ---
botonIdeas.addEventListener('click', generarContenido);
botonGuionFinal.addEventListener('click', generarGuionFinal);
