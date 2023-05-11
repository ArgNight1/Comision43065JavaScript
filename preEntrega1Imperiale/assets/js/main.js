let clave = parseInt(prompt("Ingrese su clave"));
let cuotaIt = 1000;
let cuotaLu = 500;
const claveOk = 1234;

function calcular(a, b, c, d) {

    if (c.toUpperCase() == "IT") {
        let saldo = (b - a) * cuotaIt;
        alert(`Hola ${d}, usted es instructor y debe $ ${saldo} pesos`);
    }
    
    else {
        let saldo = (b - a) * cuotaLu;
        alert(`Hola ${d}, ustedes Legitimo usuario y  debe $ ${saldo} pesos`);

    }
    document.write(`Hola!! ${saldo}`);
    return saldo;
}

for (let i = 0; i < 2; i++) {

    if (clave === claveOk) {
        let nombre = prompt("Ingrese su nombre por favor");

        while (!isNaN(nombre)) {
            nombre = prompt("Ingrese su nombre por favor");
        }

        let categoria = prompt("indique su categoria; IT ó LU");

        while (categoria.toUpperCase() != "IT" && categoria.toUpperCase() != "LU") {
            categoria = prompt("Ingrese su categoria; IT ó LU!!");
        }

        let fechaIngresada = prompt("Ingrese una fecha en formato MM/DD/AA:");
        let fecha = new Date(fechaIngresada);
        let fechaActual = new Date();

        while (fecha.getTime() >= fechaActual.getTime()) {
            fechaIngresada = prompt("La fecha ingresada debe ser una fecha pasada. \nIngrese una nueva fecha en formato dd/mm/aaaa:");
            fecha = new Date(fechaIngresada);
        }

        let diferencia = fechaActual.getTime() - fecha.getTime();
        let mesesPasados = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30));
        let cuotasPagas = parseInt(prompt("si usted ya abono cuotas, indique cuantas: \nEscriba 0 si no abono ninguna cuota."));

        alert(`usted es lleva como socio, ${mesesPasados} meses hasta la fecha.`);
        calcular(cuotasPagas, mesesPasados, categoria, nombre);
        

        break;

    }
    else {
        clave = parseInt(prompt("contraseña incorrecta, Vuelva a intentarlo:"));
    }
}