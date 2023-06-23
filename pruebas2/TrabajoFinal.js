class Vuelo {
    constructor(origen, destino, duracion, precio) {
      this.origen = origen;
      this.destino = destino;
      this.duracion = duracion;
      this.precio = precio;
    }
  }
  
  class Aerolinea {
    constructor() {
      this.vuelos = [];
      this.vuelosComprados = [];
    }
  
    agregarVuelo(origen, destino, duracion, precio) {
      const vuelo = new Vuelo(origen, destino, duracion, precio);
      this.vuelos.push(vuelo);
    }
  
    buscarVuelos(origen, destino) {
      const resultados = this.vuelos.filter((vuelo) => {
        return vuelo.origen.toLowerCase().includes(origen.toLowerCase()) &&
               vuelo.destino.toLowerCase().includes(destino.toLowerCase());
      });
  
      return resultados;
    }
  
    listarVuelos() {
      return this.vuelos;
    }
  }
  
  const aerolinea = new Aerolinea();
  
  function agregarVuelo() {
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const duracion = document.getElementById('duracion').value;
    const precio = document.getElementById('precio').value;
  
    aerolinea.agregarVuelo(origen, destino, duracion, precio);
  
    actualizarListaVuelos();
    limpiarCampos();
  }
  
  function buscarVuelos() {
    const origen = document.getElementById('buscar-origen').value;
    const destino = document.getElementById('buscar-destino').value;
  
    const resultados = aerolinea.buscarVuelos(origen, destino);
  
    mostrarVuelos(resultados);
  }
  
  function limpiarCampos() {
    document.getElementById('origen').value = '';
    document.getElementById('destino').value = '';
    document.getElementById('duracion').value = '';
    document.getElementById('precio').value = '';
  }
  
  function seleccionarVuelo(origen, destino, duracion, precio) {
    document.getElementById('vuelo-seleccionado').innerHTML = `Vuelo Seleccionado: ${origen} - ${destino} (${duracion}) - Precio: ${precio}`;
    document.getElementById('formulario-compra').style.display = 'block';
  }
  
  function realizarCompra(event) {
    event.preventDefault();
    
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const cantidadPasajeros = document.getElementById('cantidad-pasajeros').value;

    if (cantidadPasajeros < 0.5){
      alert("Reintentar");
      location.reload();
    }
  
    
    const vueloSeleccionado = document.getElementById('vuelo-seleccionado').innerText; // Cambio a innerText en lugar de textContent
    const vueloComprado = `${vueloSeleccionado} - Pasajeros: ${cantidadPasajeros} - Comprador: ${nombre} ${apellido}`;
    
    aerolinea.vuelosComprados.push(vueloComprado);
    
    const confirmacion = `Compra realizada con éxito para ${cantidadPasajeros} pasajero(s) a nombre de ${nombre} ${apellido}.`;
    document.getElementById('mensaje-compra').textContent = confirmacion;
    document.getElementById('mensaje-compra').style.display = 'block';
    
    agregarAlCarrito(vueloSeleccionado);
    
    Swal.fire(
        '¡Bien hecho!',
        'Has comprado tu pasaje',
        'success'
      ).then(() => {
        Swal.fire({
            title: 'Deseas guardar los cambios?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Bien hecho ya tiene su pasaje comprado!', '', 'success')

            } else if (result.isDenied) {
              Swal.fire('Los cambios no han sido guardados', '', 'info')
              eliminarDelCarrito(vueloSeleccionado);
            }
          })
  
        actualizarVuelosComprados();
      });
  }
  
  
  
  let carrito = [];
  
  // Función para agregar un vuelo al carrito
  function agregarAlCarrito(vueloSeleccionado) {
    carrito.push(vueloSeleccionado);
    actualizarVuelosComprados();
  }
  
  // Función para eliminar un vuelo del carrito
  function eliminarDelCarrito(vueloSeleccionado) {
    const index = carrito.indexOf(vueloSeleccionado);
    if (index > -1) {
      carrito.splice(index, 1);
    }
    
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      
    actualizarVuelosComprados();
  }
  
  // Función para mostrar los vuelos comprados en la página
  function mostrarVuelosComprados() {
    const vuelosCompradosDiv = document.getElementById('vuelos-comprados');
    vuelosCompradosDiv.innerHTML = '';
  
    if (carrito.length === 0) {
      const mensaje = document.createElement('p');
      mensaje.textContent = 'No se han comprado vuelos';
      vuelosCompradosDiv.appendChild(mensaje);
    } else {
      const listaVuelos = document.createElement('ul');
      carrito.forEach((vuelo) => {
        const vueloItem = document.createElement('li');
        vueloItem.textContent = vuelo;
        vueloItem.innerHTML += `<button onclick="eliminarDelCarrito('${vuelo}')">Eliminar</button>`; // Se agrega comillas alrededor de vuelo
        listaVuelos.appendChild(vueloItem);
      });
  
      vuelosCompradosDiv.appendChild(listaVuelos);
    }
  }
  
  // Función para actualizar la sección de vuelos comprados en la página
  function actualizarVuelosComprados() {
    mostrarVuelosComprados();
  }
  
  // Ejemplo: Agregar 10 vuelos disponibles
  function agregarVuelosDeEjemplo() {
    aerolinea.agregarVuelo("Buenos Aires", "Madrid", "12h 5m", "$20000");
    aerolinea.agregarVuelo("Buenos Aires", "Santiago De Chile", "2h 20m", "$30000");
    aerolinea.agregarVuelo("Buenos Aires", "Montevideo", "50m", "$10000");
    aerolinea.agregarVuelo("Buenos Aires", "Lima", "4h 55m", "$10000");
    aerolinea.agregarVuelo("Buenos Aires", "Ciudad De Mexico", "9h 45m", "$20000");
    aerolinea.agregarVuelo("Buenos Aires", "Bogota", "6h 40m", "$30000");
    aerolinea.agregarVuelo("Buenos Aires", "Rio de Janeiro", "2h 55m", "$40000");
    aerolinea.agregarVuelo("Buenos Aires", "Londres", "13h 20m", "$20000");
    aerolinea.agregarVuelo("Buenos Aires", "Miami", "9h 5m", "$30000");
    aerolinea.agregarVuelo("Buenos Aires", "Las Vegas", "11h 22m", "$10000");
  }

  
  // Llamar a la función para agregar vuelos de ejemplo
  agregarVuelosDeEjemplo();