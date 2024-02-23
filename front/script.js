// Obtener todos los autores
function obtenerAutores() {
    fetch('http://localhost:5281/api/Autores')
        .then(response => response.json())
        .then(data => {
            renderizarAutores(data);
        })
        .catch(error => console.error('Error al obtener los Autores:', error));
}


// Obtener todos los artículos
function obtenerArticulos() {
    fetch('http://localhost:5281/api/Articulos')
        .then(response => response.json())
        .then(data => {
            renderizarArticulos(data);
        })
        .catch(error => console.error('Error al obtener los artículos:', error));
}


// Agregar un nuevo artículo
function agregarArticulo(titulo, contenido, autor) {
    const articulo = {
        titulo,
        contenido,
        autor,
    };
    fetch('http://localhost:5281/api/Articulos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(articulo),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Artículo agregado:', data);
            obtenerArticulos();
        })
        .catch(error => console.error('Error al agregar artículo:', error));
}


// Editar un artículo existente
function updateArticulo(id, titulo, contenido, autor) {
    const articulo = {
        id,
        titulo,
        contenido,
        autor
    };
    fetch(`http://localhost:5281/api/Articulos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(articulo),
    })
    .then(data => {
        console.log('Artículo actualizado:', data);
        obtenerArticulos();
    })
    .catch(error => console.error('Error al actualizar artículo:', error));
}


// Carga en el formulario los datos para el update
function editarArticulo(id, titulo, contenido, autor) {
    document.getElementById('form-title').innerText = 'Editar Artículo';
    document.querySelector('.container input[type="text"]').value = titulo;
    document.querySelector('.container textarea').value = contenido;
    document.getElementById('indice').value = id;
    let selectAutor = document.querySelector('.container select');
    selectAutor.value = autor;
}


// Maneja ambas logicas del formulario (agregar o editar)
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('indice').value;
    const titulo = this.querySelector('[aria-label="Username"]').value;
    const contenido = this.querySelector('[aria-label="With textarea"]').value;
    const autor = this.querySelector('select').value;
    if (id) {
        console.log(id)
        updateArticulo(id, titulo, contenido, autor)
    } else {
        agregarArticulo(titulo, contenido, autor)
    }
});


// Eliminar un artículo
function eliminarArticulo(id) {
    fetch(`http://localhost:5281/api/Articulos/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log('Artículo eliminado');
                obtenerArticulos();
            }
        })
        .catch(error => console.error('Error al eliminar artículo:', error));
}

// Recibe los datos cuando se hace click en el boton Editar
document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('click', function(e) {
        if(e.target && e.target.classList.contains('editarBtn')) {
            const id = e.target.getAttribute('data-id');
            const titulo = e.target.getAttribute('data-titulo');
            const contenido = e.target.getAttribute('data-contenido');
            const autor = e.target.getAttribute('data-autor');
            editarArticulo(id, titulo, contenido, autor);
        }
    });
});

function renderizarArticulos(articulos) {
    const tbody = document.querySelector('.table tbody'); // Selecciona el cuerpo de la tabla
    tbody.innerHTML = ''; // Limpiar el cuerpo de la tabla actual

    articulos.forEach((articulo) => {
        const fila = document.createElement('tr'); // Crea una nueva fila para el artículo
        fila.innerHTML = `<th scope="row">${articulo.titulo}</th>
                          <td>${articulo.contenido}</td>
                          <td>${articulo.autor}</td>
                          <td>${articulo.fecha}</td>
                          <td>
                            <button class="btn btn-info editarBtn" data-id="${articulo.id}" data-titulo="${articulo.titulo}" data-contenido="${articulo.contenido}" data-autor="${articulo.autor}">Editar</button>

                            <button class="btn btn-danger" onclick="eliminarArticulo(${articulo.id})">Eliminar</button>
                          </td>`;
        tbody.appendChild(fila);
    });
}


function renderizarAutores(autores) {
    const select = document.querySelector('.form-select');
    // Limpia las opciones actuales, excepto la primera que es 'Autor'
    while (select.children.length > 1) {
        select.removeChild(select.lastChild);
    }

    // Agrega cada autor como una opción en el <select>
    autores.forEach(autor => {
        const opcion = document.createElement('option');
        opcion.value = autor.id;
        opcion.textContent = `${autor.nombre} ${autor.apellido}`;
        select.appendChild(opcion);
    });
}


// Inicializar la aplicación obteniendo los artículos al cargar
obtenerArticulos();
obtenerAutores()