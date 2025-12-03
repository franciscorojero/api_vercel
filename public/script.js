const resultado = document.getElementById("resultado");

// Función asíncrona para obtener libros desde Open Library
async function obtenerLibros() {
    try {
        resultado.innerHTML = "Cargando libros...";
        const respuesta = await fetch(`http://localhost:3000/api/libros`);
        const libros = await respuesta.json();

        resultado.innerHTML = `<h2>Resultados para libros</h2>`;
        libros.forEach((libro) => {
            resultado.innerHTML += `
            <p>
              <strong>Título:</strong> ${libro.titulo}<br>
              <strong>Autor:</strong> ${libro.precio}<br>
            </p>
            <hr>
          `;
        });
    } catch (error) {
        resultado.innerHTML = "Error al obtener los datos del API.";
        console.error(error);
    }
}
async function obtenerAutores() {
    try {
        resultado.innerHTML = "Cargando autores...";
        const respuesta = await fetch(`http://localhost:3000/api/autores`);
        const autores = await respuesta.json();

        resultado.innerHTML = `<h2>Resultados para autores</h2>`;
        autores.forEach((autor) => {
            resultado.innerHTML += `
            <p>
              <strong>Nombre:</strong> ${autor.nombre}<br>
              <strong>Apellido:</strong> ${autor.paterno}<br>
              <strong>Correo:</strong> ${autor.correo}<br>
            </p>
            <hr>
          `;
        });
    } catch (error) {
        resultado.innerHTML = "Error al obtener los datos del API.";
        console.error(error);
    }
}

// Asignar funciones a los botones
document
    .getElementById("libros")
    .addEventListener("click", () => obtenerLibros());
document
    .getElementById("autores")
    .addEventListener("click", () => obtenerAutores());
