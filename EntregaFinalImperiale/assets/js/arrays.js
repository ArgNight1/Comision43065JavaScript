//array de alumnos pre cargados
const alumnos = [
    { id: 1, nombre: "Juan", apellido: "Oviedo", DNI: "22233358", telefono: "3411234568", fechaNac: "28/05/1973" },
    { id: 2, nombre: "Roque", apellido: "Perez", DNI: "22233358", telefono: "3411234568", fechaNac: "26/05/1954" },
    { id: 3, nombre: "pepe", apellido: "Ramirez", DNI: "22233358", telefono: "3411234568", fechaNac: "07/06/1990" },
    { id: 4, nombre: "Pedro", apellido: "Marquez", DNI: "22233358", telefono: "3411234568", fechaNac: "07/06/1990" }
];
// verifico si ya esta cargado
if (!localStorage.getItem('alumnos')) {
    // si no, lo guardo en el local storage
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}


//array de materiales para la construccion de cartuchos
const materiales = [
    { id: 1, detalle: "Polvora", costo: 40000, cantidad: 7006.26},
    { id: 2, detalle: "Fulminantes", costo: 18250, cantidad: 3000},
    { id: 3, detalle: "Puntas", costo: 41000, cantidad: 1500},
    { id: 4, detalle: "Vainas", costo: 20000, cantidad: 25000},
];

if (!localStorage.getItem('materiales')) {
    localStorage.setItem('materiales', JSON.stringify(materiales));
}

/* array de operaciones comerciales pre cargadas*/
const caja = [
    { id: 1, descripcion: "instruccion a 2 guardias de brinks", importe: 12000, egresoIngreso: false, disparosEfectuados: 0},
    { id: 2, descripcion: "instruccion a civiles", importe: 50000, egresoIngreso: false, disparosEfectuados: 120},
    { id: 3, descripcion: "instruccion a 1 personal policial", importe: 10000, egresoIngreso: false, disparosEfectuados: 0},
    { id: 4, descripcion: "Compra de cinta papel", importe: 350, egresoIngreso: true, disparosEfectuados: 0},
];
if (!localStorage.getItem('caja')) {
    localStorage.setItem('caja', JSON.stringify(caja));
}