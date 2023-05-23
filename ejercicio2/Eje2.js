
class pasajeros {
    constructor(nombreDelPasajero, edadDelPasajero, PesoDelEquipaje, DestinoDelVuelo, ClaseDelVuelo, ApellidoDelPiloto) {
        this.nombreDelPasajero = nombreDelPasajero;
        this.edadDelPasajero = edadDelPasajero;
        this.PesoDelEquipaje = PesoDelEquipaje;
        this.destiDestinoDelVuelo =DestinoDelVuelo;
        this.ClaseDelVuelo = ClaseDelVuelo;
        this.ApellidoDelPiloto = ApellidoDelPiloto;
    }
}


const clienteJavier = new pasajeros('Javier', 25, 15 + "kg", 'Mendoza', 'Ejecutivo', 'Gonzalez');
const arrayClientes = [];
arrayClientes.push(clienteJavier);

console.log(arrayClientes);
       
let respuesta = prompt("quiere ingresar otro pasajero?");

while(respuesta == "si"){
    Nuevopasajero();
}

function Nuevopasajero() {
    let nombreDelPasajero = prompt('Ingrese el nombre del pasajero: ');
    let ApellidoDelPiloto = prompt('Ingrese el apellido del piloto: ');
    let PesoDelEquipaje = parseInt(prompt('Ingrese el peso de la maleta: '));
    let edadDelPasajero = parseInt(prompt('Ingrese la edad del pasajero: '));
    let ClaseDelVuelo = prompt('Ingrese la clase del vuelo');
    let destinoDestinoDelVuelo = prompt('Ingrese el destino del vuelo');
    let pasajero = new pasajeros(nombreDelPasajero, edadDelPasajero, PesoDelEquipaje,destinoDestinoDelVuelo, ClaseDelVuelo, ApellidoDelPiloto);
    arrayClientes.push(pasajero);
    console.log(arrayClientes);
    respuesta = prompt("quiere ingresar otro pasajero?");
    }




         
    
        