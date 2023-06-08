let usuarioValido = false;
let usuarioIngresado = "";
let claveIngresada = "";

//este for verifica  y valida el usuario, se puede intentar hasta 3 veces
for (let intentos = 0; intentos < 3; intentos++) {
    let ingreseUsuario = prompt("Indique su nombre de usuario:");
    let ingresePass = prompt("Indique su clave:");

    for (let i = 0; i < usuarios.length; i++) {
        if (ingreseUsuario === usuarios[i].usuario && ingresePass === usuarios[i].pass) {
            usuarioValido = true;
            usuarioIngresado = ingreseUsuario;
            claveIngresada = ingresePass;
            break;
        }
    }

    if (usuarioValido) {
        console.log("Usuario válido. Acceso concedido.");
        
        //guardo en sessionstorage el nombre del usuario.
        sessionStorage.setItem("usuario", JSON.stringify(usuarioIngresado));
        //obtengo y muesro el nombre de usuario
        const nombreUsuarioElement = document.getElementById("verUsuario");
        const nombreUsuario = JSON.parse(sessionStorage.getItem("usuario"));
        nombreUsuarioElement.textContent = nombreUsuario;
        //mostramos todo por que es valido el usuario
        const botonesElement = document.getElementById("botones");
        botonesElement.style.display = "block";
        break;
        
    }

    else {
        alert("Usuario o contraseña incorrectos. vamos de nuevo...");
    }
    
}

if (!usuarioValido) {
    alert("estas frito.... afuera!!");
    document.body.innerHTML = "";
    // no muestro nada
}

//borron y cuenta nueva
function limpiarTabla() {
    const contenedorTabla = document.getElementById('tabla__contenedora');
    contenedorTabla.innerHTML = '';
}

function costoMunicion() {
    /*Para producir un cartucho se utiliza: 
    1 punta
    1 vaina
    1 fulminante
    3.6 grains de polvora
    en la variable cargasPosibles,  calculo la cantidad de recargas que permite un tarro de polvora
    para ello, conviertos lo gramos a grains, y luego los divido x la cantidad a usar por unidad
    con esta funcion puedo obtener el costo del cartucho para descontarlo de los ingresos si es que en la clase brinde municiones a los alumnos.
    */
    let cargasPosibles = 7006.26 / 3.6;
    let precioBala = 0;
    for (const valorBala of materiales) {
        if (valorBala.detalle === "Polvora") {
            let precioPolvora = valorBala.costo / cargasPosibles;
            precioBala = precioPolvora
        }
        else {
            let demasComponentes = (valorBala.costo / 1000);
            precioBala = precioBala + demasComponentes;
        }
    }
    return precioBala;
}

/*esta funcion,  calcula si el saldo es positivo o negativo, lo informa, y 
ademas, muestra un listado completo de los movimientos registrados. */
function saldoBilletera() {
    limpiarTabla();
    let billetera = 0;
    let valorCartucho = costoMunicion();

    //lee el array desde el localStorage
    let cajaEnStoraje = localStorage.getItem('caja');
    if (cajaEnStoraje) {
        cajaEnStoraje = JSON.parse(cajaEnStoraje);

        for (const calculin of cajaEnStoraje) {
            if (calculin.egresoIngreso) {
                let resta = calculin.importe;
                billetera = billetera - resta;
            } else {
                let suma = calculin.importe;
                billetera = billetera + suma - calculin.disparosEfectuados * valorCartucho;
            }
        }

        const contenedorTabla = document.getElementById('tabla__contenedora');
        contenedorTabla.innerHTML = '';

        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('negrita');
        if (billetera >= 0) {
            mensajeDiv.textContent = 'Venimos bien!! SEGUI ASI!';
            mensajeDiv.style.color = 'purple';
        } else {
            mensajeDiv.textContent = 'No podes gastar!! NO HAY PLATA! !';
            mensajeDiv.style.color = 'orange';
        }
        contenedorTabla.appendChild(mensajeDiv);

        const saldoDiv = document.createElement('div');
        saldoDiv.classList.add('negrita');
        if (billetera >= 0) {
            saldoDiv.textContent = `El Saldo actual de la caja es: $${billetera.toFixed(2)}`;
            saldoDiv.style.color = 'green';
        } else {
            saldoDiv.textContent = `Para atrás... vas a tener que trabajar más, tu saldo es negativo: -$${Math.abs(billetera).toFixed(2)}`;
            saldoDiv.style.color = 'red';
        }
        contenedorTabla.appendChild(saldoDiv);

        const tablaMovimientos = document.createElement('table');
        tablaMovimientos.classList.add('tablaMovimientos');
        const cabecera = tablaMovimientos.createTHead();
        const filaCabecera = cabecera.insertRow();

        //le damos color a la cosa y la dejamos bonita.
        filaCabecera.style.fontWeight = "bold";
        filaCabecera.style.backgroundColor = "yellow";

        const cabeceraId = filaCabecera.insertCell();
        const cabeceraDescripcion = filaCabecera.insertCell();
        const cabeceraImporte = filaCabecera.insertCell();
        const cabeceraEgresoIngreso = filaCabecera.insertCell();
        const cabeceraDisparosEfectuados = filaCabecera.insertCell();
        cabeceraId.textContent = 'ID';
        cabeceraDescripcion.textContent = 'Descripción';
        cabeceraImporte.textContent = 'Importe';
        cabeceraEgresoIngreso.textContent = 'Movimiento';
        cabeceraDisparosEfectuados.textContent = 'Disparos Efectuados';

        const cuerpoTabla = tablaMovimientos.createTBody();
        for (const movimiento of cajaEnStoraje) {
            const filaMovimiento = cuerpoTabla.insertRow();
            const celdaId = filaMovimiento.insertCell();
            const celdaDescripcion = filaMovimiento.insertCell();
            const celdaImporte = filaMovimiento.insertCell();
            const celdaEgresoIngreso = filaMovimiento.insertCell();
            const celdaDisparosEfectuados = filaMovimiento.insertCell();
            celdaId.textContent = movimiento.id;
            celdaDescripcion.textContent = movimiento.descripcion;
            celdaImporte.textContent =`$${movimiento.importe}` ;
            celdaEgresoIngreso.textContent = movimiento.egresoIngreso ? 'Egreso' : 'Ingreso';
            celdaDisparosEfectuados.textContent = movimiento.disparosEfectuados;
        }

        contenedorTabla.appendChild(tablaMovimientos);

        Toastify({
            text: 'Consulta de Saldo Exitosa',
            className: 'info',
            duration: 6000,
            gravity: 'bottom',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #00b09b, #96c93d)',
            },
        }).showToast();
    }
}


function mostrarLista() {
    limpiarTabla();
    const tabla = document.createElement('table');

    //encabezado de la tabla
    const encabezados = ['ID', 'Descripción', 'Valor x 1000', 'Unidades disponibles'];
    const encabezadosRow = document.createElement('tr');
    encabezados.forEach(encabezado => {
        const th = document.createElement('th');
        th.textContent = encabezado;
        encabezadosRow.appendChild(th);
    });
    tabla.appendChild(encabezadosRow);

    //   obtengo losmateriales del LocalStorage
    let materiales = localStorage.getItem('materiales');
    if (materiales) {
        materiales = JSON.parse(materiales);
        materiales.forEach(material => {
            const fila = document.createElement('tr');
            const idCell = document.createElement('td');
            idCell.textContent = material.id;
            const detalleCell = document.createElement('td');
            detalleCell.textContent = material.detalle;
            const costoCell = document.createElement('td');
            costoCell.textContent = `$${material.costo}`;
            const cantidadCell = document.createElement('td');
            cantidadCell.textContent = material.cantidad;

            fila.appendChild(idCell);
            fila.appendChild(detalleCell);
            fila.appendChild(costoCell);
            fila.appendChild(cantidadCell);

            tabla.appendChild(fila);
        });
    }

    // mosstro la tabla
    const contenedorTabla = document.getElementById('tabla__contenedora');
    contenedorTabla.appendChild(tabla);

    // agrego opciin de editar o agregar nuevos materiales
    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar o Agregar Materiales';
    editarBtn.addEventListener('click', editarMateriales);
    contenedorTabla.appendChild(editarBtn);

    Toastify({
        text: 'Listados de Materiales',
        className: 'info',
        duration: 6000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
        },
    }).showToast();
}

function editarMateriales() {
    // Limpiar la tabla
    limpiarTabla();

    // Crear el formulario de edición/agregado de materiales
    const formulario = document.createElement('form');
    formulario.id = 'formulario__materiales';
    formulario.innerHTML = `
    <div id="formulario">
        <div class="grupoFrm">
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" required>
        </div>

        <div class="grupoFrm">
            <label for="detalle">Descripcion:</label>
            <input type="text" id="detalle" name="detalle" required>
        </div>

        <div class="grupoFrm">
            <label for="costo">Valor x 1000:</label>
            <input type="number" id="costo" name="costo" required>
        </div>

        <div class="grupoFrm">
            <label for="cantidad">Unidades disponibles:</label>
            <input type="number" id="cantidad" name="cantidad" required>
        </div>

        <div>
            <button type="submit" id="guardarBtn">Guardar</button>
            <button type="button" id="cancelarBtn">Cancelar</button>
        </div>
    </div>    
    `;

    // Mostrar el formulario
    const contenedorTabla = document.getElementById('tabla__contenedora');
    contenedorTabla.appendChild(formulario);
    Toastify({
        text: 'si va a editar un materia, recuerde usar el ID correcto',
        className: 'info',
        duration: 15000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, red, orange)',
        },
    }).showToast();

    // ejecuto submit del form
    formulario.addEventListener('submit', guardarMaterial);

    // sale cancelar
    const cancelarBtn = document.getElementById('cancelarBtn');
    cancelarBtn.addEventListener('click', mostrarLista);
}

function guardarMaterial(event) {
    // pausa
    event.preventDefault(); 

    const id = parseInt(document.getElementById('id').value);
    const detalle = document.getElementById('detalle').value;
    const costo = parseInt(document.getElementById('costo').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    // traer materiales del localStorage
    let materiales = localStorage.getItem('materiales');
    if (materiales) {
        materiales = JSON.parse(materiales);
    } else {
        materiales = [];
    }

    // validar por id
    const index = materiales.findIndex((material) => material.id == id);

    if (index !== -1) {
        // si ya existe, actualiza datos
        materiales[index].detalle = detalle;
        materiales[index].costo = costo;
        materiales[index].cantidad = cantidad;
    } else {
        //no existe,lo agrega al array
        const nuevoMaterial = {
            id: id,
            detalle: detalle,
            costo: costo,
            cantidad: cantidad
        };
        materiales.push(nuevoMaterial);
    }

    // guarda en localsorage
    localStorage.setItem('materiales', JSON.stringify(materiales));

    console.log('Material guardado');
    Toastify({
        text: 'Guardado con Exito!!',
        className: 'info',
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
        },
    }).showToast();
    mostrarLista();
}

function limpiarTabla() {
    const contenedorTabla = document.getElementById('tabla__contenedora');
    contenedorTabla.innerHTML = '';
}

const tablaContainer = document.getElementById('tabla__contenedora');
const ingresarOperacionBtn = document.getElementById('ingresarOperacion');

ingresarOperacionBtn.addEventListener('click', mostrarFormulario);

function mostrarFrmOperacion() {
    // frm para alta de operacion, ingre o ogreso
    const formulario = document.createElement('form');
    formulario.id = 'formulario';
    formulario.innerHTML = `
    <div id="formulario">
        <div class="grupoFrm">
            <label for="egresoIngreso">Seleccione:</label>
        <div>
            <input type="radio" id="egreso" name="egresoIngreso" value="1" required>
            <label for="egreso">Egreso</label>
        </div>
        <div>
            <input type="radio" id="ingreso" name="egresoIngreso" value="" required>
            <label for="ingreso">Ingreso</label>
        </div>
        </div>

        <div class="grupoFrm">
            <label for="descripcion">descripcion:</label>
            <input type="text" id="descripcion" name="descripcion" required>
        </div>

        <div class="grupoFrm">
            <label for="importe">Importe:</label>
            <input type="number" id="importe" name="importe" required>
        </div>

        <div class="grupoFrm">
            <label for="disparosEfectuados">Disparos efectuados:</label>
            <input type="number" id="disparosEfectuados" name="disparosEfectuados" required>
        </div>

        <div>
            <button type="submit" id="guardarBtn">Guardar</button>
            <button type="button" id="cancelarBtn">Cancelar</button>
        </div>
    </div>`;

    tablaContainer.innerHTML = '';
    tablaContainer.appendChild(formulario);

    Toastify({
        text: 'Ingrese su operacion!!',
        className: 'info',
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, blue, orange)',
        },
    }).showToast();

    // manda que si
    formulario.addEventListener('submit', guardarOperacion);

    // sale que no
    const cancelarBtn = document.getElementById('cancelarBtn');
    cancelarBtn.addEventListener('click', resetFrm);
}

function guardarOperacion(event) {
    //pausa
    event.preventDefault(); 

    const egresoIngreso = document.querySelector('input[name="egresoIngreso"]:checked').value;
    const descripcion = document.getElementById('descripcion').value;
    const importe = parseInt(document.getElementById('importe').value);
    const disparosEfectuados = parseInt(document.getElementById('disparosEfectuados').value);

    if (disparosEfectuados > 0) {
        // Tengo que eliminar stock... (suprimir)
        usoCartuchos(disparosEfectuados);
    } else {
        // Nada... sigo
    }

    let cajaEnStoraje = localStorage.getItem('caja');

    if (cajaEnStoraje) {
        cajaEnStoraje = JSON.parse(cajaEnStoraje);
    } else {
        cajaEnStoraje = [];
    }

    let lastId = 0;
    for (const movimiento of cajaEnStoraje) {
        if (movimiento.id > lastId) {
            lastId = movimiento.id;
        }
    }

    const newId = lastId + 1;

    const ingresoMovimiento = {
        id: newId,
        descripcion: descripcion,
        importe: importe,
        egresoIngreso: egresoIngreso,
        disparosEfectuados: disparosEfectuados
    };

    cajaEnStoraje.push(ingresoMovimiento);
    localStorage.setItem('caja', JSON.stringify(cajaEnStoraje));

    Toastify({
        text: 'Guardado con Exito!!',
        className: 'info',
        duration: 4000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
        },
    }).showToast();

    resetFrm();
}

function resetFrm() {
    // reseteo los datos del frm
    document.getElementById('egreso').checked = false;
    document.getElementById('ingreso').checked = false;
    document.getElementById('descripcion').value = '';
    document.getElementById('importe').value = '';
    document.getElementById('disparosEfectuados').value = '';
}


//aca calculo si hay o no hay material suficiente para realizar las operaciones segun los cartuchos usados
function usoCartuchos(can) {
    let indexPol = 0;
    let grainsUsados = 3.6;
    let polvoraExistente = materiales[indexPol].cantidad - (grainsUsados * can);
    if (polvoraExistente < 0) {
        alert("No hay suficiente polvora");
    }
    else {
        materiales[indexPol].cantidad = polvoraExistente;
    }
    for (let baja = 1; baja < materiales.length; baja++) {
        let unidadesRestantes = materiales[baja].cantidad - (1 * can);
        if (unidadesRestantes < 0) {
            alert(`no hay suficiente ${materiales[baja].detalle}`);
        }
        else {
            materiales[baja].cantidad = unidadesRestantes
        }
    }
    //mostrarLista();
}

//funcion para saludar alumnos en sus cumples
function cumplesAlumnos() {
    limpiarTabla();
    const tablaContainer = document.getElementById("tabla__contenedora");
    const fechaActual = new Date();
    const alumnos = JSON.parse(localStorage.getItem("alumnos"));

    const cumpleHoy = alumnos.filter(alumno => {
        const fechaNacParts = alumno.fechaNac.split("/");
        const diaNac = parseInt(fechaNacParts[0]);
        const mesNac = parseInt(fechaNacParts[1]) - 1;
        const anoNac = parseInt(fechaNacParts[2]);
        const fechaNac = new Date(anoNac, mesNac, diaNac);

        return (
            fechaNac.getDate() === fechaActual.getDate() &&
            fechaNac.getMonth() === fechaActual.getMonth()
        );
    });

    if (cumpleHoy.length > 0) {
        const tabla = document.createElement("table");
        tabla.innerHTML = `
        <caption class="negrita">Hoy cumple los años:</caption>
        <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Años a festejar</th>
        </tr>
        `;

        cumpleHoy.forEach(alumno => {
            const edad = calcularEdad(alumno.fechaNac, fechaActual);

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${edad}</td>
            `;

            tabla.appendChild(fila);
        });

        tablaContainer.appendChild(tabla);
    } 
    else {
        const div = document.createElement("div");
        div.classList.add("negrita");
        div.textContent = "Hoy no hay festejos.. ";
        tablaContainer.appendChild(div);
        Toastify({
            text: 'NO HAY CUMPLES HOY',
            className: 'info',
            duration: 8000,
            gravity: 'bottom',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, red, orange)',
            },
        }).showToast();
    }
}

function calcularEdad(fechaNacimiento, fechaActual) {
    const fechaNacParts = fechaNacimiento.split("/");
    const diaNac = parseInt(fechaNacParts[0]);
    const mesNac = parseInt(fechaNacParts[1]) - 1;
    const anoNac = parseInt(fechaNacParts[2]);
    const fechaNac = new Date(anoNac, mesNac, diaNac);

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (fechaNac.getMonth() > fechaActual.getMonth() ||
        (fechaNac.getMonth() === fechaActual.getMonth() &&
            fechaNac.getDate() > fechaActual.getDate())){ 
                edad--;
    }
    Toastify({
        text: 'CUMPLES!! WII! ',
        className: 'info',
        duration: 8000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, red, blue)',
        },
    }).showToast();
    return edad;
    
}

// muestra la tabla de alumnos
function actualizarAlumnos() {
    limpiarTabla();
    const tablaContainer = document.getElementById("tabla__contenedora");
    const alumnos = JSON.parse(localStorage.getItem("alumnos"));

    const tabla = document.createElement("table");
    tabla.innerHTML = `
        <caption class="negrita">Listado de Alumnos</caption>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Fecha de Nacimiento</th>
                <th>Acciones</th>
            </tr>`;

    alumnos.forEach(alumno => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.DNI}</td>
            <td>${alumno.telefono}</td>
            <td>${alumno.fechaNac}</td>
            <td>
                <button onclick="editarAlumno(${alumno.id})">Editar</button>
            </td>`;

        tabla.appendChild(fila);
    });

    tablaContainer.appendChild(tabla);

    const altaAlumnoBtn = document.createElement("button");
    altaAlumnoBtn.textContent = "Dar de Alta Nuevo Alumno";
    altaAlumnoBtn.addEventListener("click", mostrarFormulario);
    tablaContainer.appendChild(altaAlumnoBtn);
}

// traigo el form para dar de alta alumnos
function mostrarFormulario() {
    limpiarTabla();
    const tablaContainer = document.getElementById("tabla__contenedora");

    const formulario = document.createElement("form");
    formulario.innerHTML = `
        <h2>Formulario de Alta de Alumno</h2>
        <div id="formulario">
                <div class="grupoFrm">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" required>
                </div>
                <div class="grupoFrm">
                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" required>
                </div>
                <div class="grupoFrm">
                    <label for="dni">DNI:</label>
                    <input type="text" id="dni" required>
                </div>
                <div class="grupoFrm">
                    <label for="telefono">Teléfono:</label>
                    <input type="text" id="telefono" required>
                </div>
                <div class="grupoFrm">
                    <label for="fechaNac">Fecha de Nacimiento:</label>
                    <input type="text" id="fechaNac" required>
                </div>
                <div>
                    <button type="submit">Guardar</button>
                    <button type="button" onclick="cancelarFormulario()">Cancelar</button>
                </div>
        </div>`;

    formulario.addEventListener("submit", guardarAlumno);

    tablaContainer.appendChild(formulario);
}

// guardo los datos del alumno
function guardarAlumno(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const fechaNac = document.getElementById("fechaNac").value;

    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const id = alumnos.length > 0 ? alumnos[alumnos.length - 1].id + 1 : 1;

    const nuevoAlumno = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        DNI: dni,
        telefono: telefono,
        fechaNac: fechaNac
    };

    alumnos.push(nuevoAlumno);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));

    actualizarAlumnos();
}

// cancelo 
function cancelarFormulario() {
    actualizarAlumnos();
}

// habilito para editar el alumno
function editarAlumno(id) {
    limpiarTabla();
    const tablaContainer = document.getElementById("tabla__contenedora");
    const alumnos = JSON.parse(localStorage.getItem("alumnos"));
    const alumno = alumnos.find(alumno => alumno.id === id);

    const formulario = document.createElement("form");
    formulario.innerHTML = `
        <h2>Editar Datos del Alumno</h2>
        <div id="formulario">
                <div class="grupoFrm">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" value="${alumno.nombre}" required>
                </div>
                <div class="grupoFrm">
                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" value="${alumno.apellido}" required>
                </div>
                <div class="grupoFrm">
                    <label for="dni">DNI:</label>
                    <input type="text" id="dni" value="${alumno.DNI}" required>
                </div>
                <div class="grupoFrm">
                    <label for="telefono">Telefono:</label>
                    <input type="text" id="telefono" value="${alumno.telefono}" required>
                </div>
                <div class="grupoFrm">
                    <label for="fechaNac">Fecha de Nacimiento:</label>
                    <input type="text" id="fechaNac" value="${alumno.fechaNac}" required>
                </div>
            
                <div>    
                    <button type="submit">Guardar</button>
                    <button type="button" onclick="cancelarFormulario()">Cancelar</button>
                </div>
        </div>`;

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const dni = document.getElementById("dni").value;
        const telefono = document.getElementById("telefono").value;
        const fechaNac = document.getElementById("fechaNac").value;

        alumno.nombre = nombre;
        alumno.apellido = apellido;
        alumno.DNI = dni;
        alumno.telefono = telefono;
        alumno.fechaNac = fechaNac;

        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        actualizarAlumnos();
    });

    tablaContainer.appendChild(formulario);
}

//activo o desactivo el modo oscuro.
const modoOscuro = document.getElementById('modoOscuro');
const body = document.body;
modoOscuro.addEventListener('change', function () {
    if (this.checked) {
        body.classList.add('modo__oscuro');
    }
    else {
        body.classList.remove('modo__oscuro');
    }
});

//cambio el aspecto visual del clima

const checkboxClima = document.getElementById('cambiaClima');
const imprimeClima = document.querySelector('#clima');

checkboxClima.addEventListener('change', function() {
    if (this.checked) {
    imprimeClima.classList.add('clima');
    } 
    else{
        imprimeClima.classList.remove('clima');
    }
});




let boton = document.getElementById("botonBilletera");
let boton2 = document.getElementById("actualizarAlumnos");
let boton3 = document.getElementById("mostrarLista");
let boton4 = document.getElementById("ingresarOperacion");
let boton5 = document.getElementById("cumplesAlumnos");

boton.addEventListener("click", () => saldoBilletera());
boton2.addEventListener("click", () => actualizarAlumnos());
boton3.addEventListener("click", () => mostrarLista());
boton4.addEventListener("click", () => mostrarFrmOperacion());
boton5.addEventListener("click", () => cumplesAlumnos(alumnos));