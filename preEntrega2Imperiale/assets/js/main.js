let operacion = parseInt(prompt(" Indique numero de operacion: \n01 - Para Editar o consultar Materiales. \n02 - Para realizar movimientos monetarios. \n03 - Consultar estado de cuenta. \n04 - Para Salir."));

/*
Arrays de pruductos a utilizar
los costos son x 1000 unidades, menos la polvora
el valor del tarro de polvora es por el toral, y trae 454 gramos, se convierten a GRAINS.
*/
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
function saldoBilletera(){
    let billetera = 0;
    let valorCartucho = costoMunicion();
    for(const calculator of caja){
        if(calculator.egresoIngreso){
            let resta = calculator.importe;
            billetera = billetera - resta;
    }
        else{
            let suma = calculator.importe;
            billetera = billetera + suma - (calculator.disparosEfectuados * valorCartucho);
    }
}
    if(billetera >= 0){
        alert(`El Saldo actual de la caja es: $${billetera.toFixed(2)}`)
    }
    else{
        alert(`para atras.. vas a tener que trabajar mas, tu saldo es negativo: -$${billetera.toFixed(2)}`)
    }
}

function mostrarLista(){
    for(const lista of materiales){
        alert(`Producto ID: ${lista.id} \nDescripcion: ${lista.detalle} \nvalor x 1000: $${lista.costo} \nUnidades disponiles: ${lista.cantidad}`);
        }
//aca muestro en conola usando funcion fecha.. (-_-)
    materiales.forEach(detalle => {
        console.log(detalle)
    });    
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

//se puede mejorar y agrupar index 2 3 y 4
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

//me aseguro de que la opcion ingresada sea numerica y dentro del rango permitdo
while (isNaN(operacion) || operacion < 1 || operacion > 4) {
    operacion = parseInt(prompt(" Indique numero de operacion: \n01 - Para Editar o consultar Materiales. \n02 - Para realizar movimientos monetarios. \n03 - Consultar estado de cuenta. \n04 - Para Salir."));
}

//con while hacer bucle infinito ??
if(operacion === 01){
    let listaMateriales = parseInt(prompt(" Indique numero de operacion: \n01 - Para Editar. \n02 - Para consultar Stock disponible."));
    if(listaMateriales === 01){
        alert(" A CONTINUACION PODRA OBSERVAR LOS ID DE LOS PRODUCTOS, RECUERDELOS PARA EDITAR SU STOCK")
        mostrarLista();
        actualizarStock();
        
}

    else if(listaMateriales === 02){
        //esta opcion brinda un listado de todos los materiales disponiobles para un control de stock
        mostrarLista();
    }
    else{
        //da opcion no valida por que no tengo ganas de hacer muchas validaciones.
        alert("Opcion No valida.");
    }
}

else if(operacion === 02){
    //ingresa un gasto o ganancia al array de caja y luego calcula el total
    let ingresa = "si";
    while(ingresa == "si"){
        ingresarOperacion();
        ingresa = prompt("desea ingresar una nueva operacion? \nIngrese SI para continuar \nIngrese No para salir")
    }
    saldoBilletera();
}

else if(operacion === 03){
    //simplemente dice el estado de la caja.
    saldoBilletera();
}

else if(operacion === 04){
    //aca saluda y se despide.
    alert("Muchas gracias por tu visita.")
}

//aca saluda y sale por completo.
alert(`aca salio de toda la app`);

let boton = document.getElementById("botonBilletera");
let boton2 = document.getElementById("actualizarStock");
let boton3 = document.getElementById("mostrarLista");
let boton4 = document.getElementById("ingresarOperacion");



boton.addEventListener("click", () => saldoBilletera());
boton2.addEventListener("click", () => actualizarStock());
boton3.addEventListener("click", () => mostrarLista());
boton4.addEventListener("click", () => ingresarOperacion());