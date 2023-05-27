// declaro un array de usuarios.  y los valido hasta 3 veces.. si hay conicidencia pasa, si no, afuera.
const usuarios = [
    { usuario: "1", pass: "1" },
    { usuario: "walter", pass: "1" },
    { usuario: "usuario2", pass: "1234" },
    { usuario: "usuario3", pass: "1234" },
    { usuario: "usuario4", pass: "1234" },
];

let usuarioValido = false;
let usuarioIngresado = "";
let claveIngresada = "";

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
        alert("Usuario válido. Acceso concedido.");
        //guardo en sessionstorage el nombre del usuario.
        sessionStorage.setItem("usuario", JSON.stringify(usuarioIngresado));

        // obtengo y muesro el nombre de usuario
        const nombreUsuarioElement = document.getElementById("verUsuario");
        const nombreUsuario = JSON.parse(sessionStorage.getItem("usuario"));
        nombreUsuarioElement.textContent = nombreUsuario;

        // mostramos todo por que es valido
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

//  borron y cuenta nueva
function limpiarTabla() {
    const contenedorTabla = document.getElementById('tabla__contenedora');
    contenedorTabla.innerHTML = ''; 
}

//tengo un array de alumnos para saber los cumples y saludarlos
const alumnos = [
    { id: 1, nombre: "Juan", apellido: "sarasa", fechaNac: "28/05/1973" },
    { id: 2, nombre: "Roque", apellido: "sarasa", fechaNac: "26/05/1954" },
    { id: 3, nombre: "pepe", apellido: "sarasa", fechaNac: "05/10/1990" },
    { id: 4, nombre: "Pedro", apellido: "sarasa", fechaNac: "28/05/1894" }
];


//array de materiales para la construccion de cartuchos
const materiales = [
    { id: 1, detalle: "Polvora", costo: 40000, cantidad: 7006.26},
    { id: 2, detalle: "Fulminantes", costo: 18250, cantidad: 3000},
    { id: 3, detalle: "Puntas", costo: 41000, cantidad: 1500},
    { id: 4, detalle: "Vainas", costo: 20000, cantidad: 25000},
];

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
    for(const valorBala of materiales){
        if(valorBala.detalle === "Polvora"){
            let precioPolvora = valorBala.costo / cargasPosibles;
            precioBala = precioPolvora
        }
        else{
            let demasComponentes = (valorBala.costo / 1000);
            precioBala = precioBala + demasComponentes;
        }
}
    return precioBala;
}

/* array de operaciones comerciales*/
const caja = [
    { id: 1, descripcion: "instruccion a 2 guardias de brinks", importe: 12000, egresoIngreso: false, disparosEfectuados: 0},
    { id: 2, descripcion: "instruccion a civiles", importe: 50000, egresoIngreso: false, disparosEfectuados: 120},
    { id: 3, descripcion: "instruccion a 1 personal policial", importe: 10000, egresoIngreso: false, disparosEfectuados: 0},
    { id: 4, descripcion: "Compra de cinta papel", importe: 350, egresoIngreso: true, disparosEfectuados: 0},
];

/*en esta funcion se genera un caos mental..
pero calcula cuando dinero hay en "la caja"...
separa la polvora por que esta no se puede calcular por unidad como el resto de los insumos

*/
function saldoBilletera() {
    limpiarTabla()
    let billetera = 0;
    let valorCartucho = costoMunicion();

    for (const calculator of caja) {
        if (calculator.egresoIngreso) {
            let resta = calculator.importe;
            billetera = billetera - resta;
        } else {
            let suma = calculator.importe;
            billetera = billetera + suma - (calculator.disparosEfectuados * valorCartucho);
        }
    }

    const contenedorTabla = document.getElementById('tabla__contenedora');
    const saldoDiv = document.createElement('div');
    saldoDiv.classList.add('negrita');

    if (billetera >= 0) {
        saldoDiv.textContent = `El Saldo actual de la caja es: $${billetera.toFixed(2)}`;
    } else {
        saldoDiv.textContent = `Para atrás... vas a tener que trabajar más, tu saldo es negativo: -$${Math.abs(billetera).toFixed(2)}`;
    }
    contenedorTabla.appendChild(saldoDiv);
}

//muestro a la lista de materiales en stock
function mostrarLista() {
    limpiarTabla()
    const tabla = document.createElement('table');

    // Crear encabezados de la tabla
    const encabezados = ['ID', 'Descripción', 'Valor x 1000', 'Unidades disponibles'];
    const encabezadosRow = document.createElement('tr');
    encabezados.forEach(encabezado => {
        const th = document.createElement('th');
        th.textContent = encabezado;
        encabezadosRow.appendChild(th);
    });
    tabla.appendChild(encabezadosRow);


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

    // muestro la tabla
    const contenedorTabla = document.getElementById('tabla__contenedora');
    contenedorTabla.appendChild(tabla);
}

//esta funcion permite ingresos y egresos de dinero, ademas de bajar el stock si es necesario
function ingresarOperacion(){
    //NO HAY VALIDACIONES (por ahora), POR FAVOR INGRESAR CORRECTAMENTE LO SOLICITADO. GRACIAS
    let egresoIngreso = prompt("Si es un gasto ingrese: 1 \nsi es ganancia: deja vacio");
    let descripcion = prompt("ingrese el concepto \nEjemplo, si es un gasto : compra repuestos \nsi es ganancia: clases a xx persona");
    let importe = parseInt(prompt("Ingrese el importe"));
    let disparosEfectuados = parseInt(prompt("Ingrese 0 si no se efectuaron disparos"));
    
    if(disparosEfectuados > 0){
        //tengo que eliminar stock.. suprimir
        usoCartuchos(disparosEfectuados);
    }
    else {
        //nada.. sigo
    }
        
    let ingresoMovimiento = {
    id: caja.length + 1,
    descripcion: descripcion,
    importe: importe,
    egresoIngreso: egresoIngreso,
    disparosEfectuados: disparosEfectuados,
    }
    caja.push(ingresoMovimiento);
    saldoBilletera()
}

//esta funcion es para poder actualizar el stock de materiales.. si la catidad  ingresada es positiva, suma. Si es Negativa, resta stock.
function actualizarStock(){
    let repite ="si"
    while(repite == "si"){
    let id = prompt("Ingrese el ID a actualizar:");
    let actualiza = materiales.findIndex((material) => material.id == id);
    let cantidad = parseInt(prompt("Introduce la cantidad a actualizar: (+ o -para restar)"));
    let nuevaCantidad = materiales[actualiza].cantidad + cantidad;
    materiales[actualiza].cantidad = nuevaCantidad;
    console.log("actualizacion correcta");
    mostrarLista();
    repite = prompt("desea ingresar una nueva operacion? \nIngrese SI para continuar \nIngrese NO para salir")
    }
}

function usoCartuchos(can) {
    let indexPol = 0;
    let grainsUsados = 3.6;
    let polvoraExistente = materiales[indexPol].cantidad - (grainsUsados * can);
    if (polvoraExistente < 0) {
        alert("No hay suficiente polvora");
    }
    else{
    materiales[indexPol].cantidad = polvoraExistente;
}
    for(let baja = 1; baja < materiales.length; baja++){
        let unidadesRestantes = materiales[baja].cantidad - (1 * can);
        if (unidadesRestantes < 0) {
        alert(`no hay suficiente ${materiales[baja].detalle}`);
        }
        else{
        materiales[baja].cantidad = unidadesRestantes
        }
    }
    mostrarLista();
}

//funcion 
function cumplesAlumnos(alumnos) {
    limpiarTabla()
    const tablaContainer = document.getElementById("tabla__contenedora");
    const fechaActual = new Date();

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
    else{
        const div = document.createElement("div");
        div.classList.add('negrita');
        div.textContent = "Hoy no hay festejos.. ";
        tablaContainer.appendChild(div);
    }
}

function calcularEdad(fechaNacimiento, fechaActual) {
    const fechaNacParts = fechaNacimiento.split("/");
    const diaNac = parseInt(fechaNacParts[0]);
    const mesNac = parseInt(fechaNacParts[1]) - 1;
    const anoNac = parseInt(fechaNacParts[2]);
    const fechaNac = new Date(anoNac, mesNac, diaNac);

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (
        fechaNac.getMonth() > fechaActual.getMonth() ||
        (fechaNac.getMonth() === fechaActual.getMonth() &&
            fechaNac.getDate() > fechaActual.getDate())
    ) {
        edad--;
    }

    return edad;
}

let boton = document.getElementById("botonBilletera");
let boton2 = document.getElementById("actualizarStock");
let boton3 = document.getElementById("mostrarLista");
let boton4 = document.getElementById("ingresarOperacion");
let boton5 = document.getElementById("cumplesAlumnos");

boton.addEventListener("click", () => saldoBilletera());
boton2.addEventListener("click", () => actualizarStock());
boton3.addEventListener("click", () => mostrarLista());
boton4.addEventListener("click", () => ingresarOperacion());
boton5.addEventListener("click", () => cumplesAlumnos(alumnos));

const modoOscuro = document.getElementById('modoOscuro');
const body = document.body;

modoOscuro.addEventListener('change', function() {
    if (this.checked) {
    body.classList.add('modo__oscuro');
    } 
    else {
    body.classList.remove('modo__oscuro');
    }
});