document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    const selectCargo = document.getElementById("cargo");
    const tablaRegistros = document.getElementById("tablaRegistros");

    // Función para cargar los registros desde el backend y mostrarlos en la tabla
    function cargarRegistros() {
        axios.get("http://127.0.0.1:8080/empleados")
            .then(function (response) {
                const registros = response.data;
                mostrarRegistros(registros);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // Función para mostrar los registros en la tabla
function mostrarRegistros(registros) {
    let tablaHTML = "";
    registros.forEach(function (registro) {
        // Creamos una etiqueta img con el src como la cadena Base64
        let imagenHTML = `<img src="data:image/jpeg;base64,${registro.foto}" alt="Foto del empleado" style="width: 40px; height: 40px;">`;
        tablaHTML += `
            <tr>
                <td>${registro.id}</td>
                <td>${registro.nombre}</td>
                <td>${registro.cedula}</td>
                <td>${imagenHTML}</td>
                <td>${registro.cargo.nombre}</td>
                <td>
                    <button class="btn btn-primary btn-sm editar" data-id="${registro.id}">Editar</button>
                    <button class="btn btn-danger btn-sm eliminar" data-id="${registro.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });
    tablaRegistros.innerHTML = tablaHTML;
    agregarEventosEditar();
    agregarEventosEliminar();
}

    // Función para agregar eventos de clic a los botones de editar
    function agregarEventosEditar() {
        const botonesEditar = document.querySelectorAll(".editar");
        botonesEditar.forEach(boton => {
            boton.addEventListener("click", function () {
                const idRegistro = boton.getAttribute("data-id");
                editarRegistro(idRegistro);
            });
        });
    }

    // Función para agregar eventos de clic a los botones de eliminar
    function agregarEventosEliminar() {
        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", function () {
                const idRegistro = boton.getAttribute("data-id");
                eliminarRegistro(idRegistro);
            });
        });
    }

    // Función para eliminar un registro
    function eliminarRegistro(idRegistro) {
        axios.delete(`http://127.0.0.1:8080/eliminar/${idRegistro}`)
            .then(function (response) {
                console.log(response.data);
                alert("Registro eliminado correctamente");
                cargarRegistros();
            })
            .catch(function (error) {
                console.error(error);
                alert("Error al eliminar el registro");
            });
    }

    // Función para editar un registro
    function editarRegistro(idRegistro) {
        // Mostrar el modal de edición
        $('#modalEditar').modal('show');

        // Cargar los cargos en el select del modal de edición
        axios.get("http://127.0.0.1:8080/cargo")
            .then(function (response) {
                const cargos = response.data;
                const selectCargoEditar = document.getElementById("cargoEditar");
                selectCargoEditar.innerHTML = "";
                cargos.forEach(cargo => {
                    const option = document.createElement("option");
                    option.text = cargo.nombre;
                    option.value = cargo.idCargo;
                    selectCargoEditar.appendChild(option);
                });
            })
            .catch(function (error) {
                console.error(error);
            });

        // Al hacer clic en "Guardar Cambios" en el modal de edición
        document.getElementById("btnGuardarEditar").addEventListener("click", function () {
            const nombreEditado = document.getElementById("nombreEditar").value;
            const cedulaEditada = document.getElementById("cedulaEditar").value;
            const fotoEditada = document.getElementById("fotoEditar").files[0];
            const idCargoEditada = document.getElementById("cargoEditar").value;
        
            // Crear un objeto FileReader para leer el contenido de la imagen como una cadena base64
            const reader = new FileReader();
            reader.onload = function (event) {
                const fotoBase64 = event.target.result.split(',')[1]; // Obtener la parte base64 de la URL
                const payload = {
                    nombre: nombreEditado,
                    cedula: cedulaEditada,
                    foto: fotoBase64, // Guardar la imagen en formato base64
                    cargo: {
                        idCargo: idCargoEditada
                    }
                };
        
                // Realizar una solicitud PUT al backend Java
                axios.put(`http://127.0.0.1:8080/editar/${idRegistro}`, payload, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    alert("Registro editado correctamente");
                    $('#modalEditar').modal('hide');
                    cargarRegistros();
                })
                .catch(function (error) {
                    console.error(error);
                    alert("Error al editar el registro");
                });
            };
            reader.readAsDataURL(fotoEditada); // Leer el contenido de la imagen como una cadena base64
        });
    }

    // Función para cargar los cargos desde el backend y llenar el select
    function cargarCargos() {
        axios.get("http://127.0.0.1:8080/cargo")
            .then(function (response) {
                const cargos = response.data;
                cargos.forEach(cargo => {
                    const option = document.createElement("option");
                    option.text = cargo.nombre;
                    option.value = cargo.idCargo;
                    selectCargo.appendChild(option);
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const nombre = document.getElementById("nombre").value;
        const cedula = document.getElementById("cedula").value;
        const foto = document.getElementById("foto").files[0];
        const idCargo = selectCargo.value;
    
        // Lee el contenido de la imagen como una cadena base64
        const reader = new FileReader();
        reader.readAsDataURL(foto);
        reader.onload = function () {
            let fotoBase64 = reader.result;
            // Dividir la cadena en dos partes usando la coma como delimitador
            const base64Parts = fotoBase64.split(",");
            // Tomar la segunda parte que contiene solo los datos codificados de la imagen
            fotoBase64 = base64Parts[1];
            console.log(fotoBase64);    
    
            // Crea el payload con la imagen en formato base64
            const payload = {
                nombre: nombre,
                cedula: cedula,
                foto: fotoBase64,
                cargo: {
                    idCargo: idCargo
                }
            };
    
            // Realiza una solicitud POST al backend Java
            axios.post("http://127.0.0.1:8080/crear", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                console.log(response.data);
                alert("Registro guardado correctamente");
                formulario.reset();
                cargarRegistros();
            })
            .catch(function (error) {
                console.error(error);
                alert("Error al guardar el registro");
            });
        };
    });
    

    // Llama a las funciones para cargar los cargos y los registros al cargar la página
    cargarCargos();
    cargarRegistros();
});
