//====================VARIABLES Y ARRAY DE PRODUCTOS====================================

let contenedor
let carritoContenedor
let vaciarCarrito
let precioTotal
let finalizarCompra
let procesarCompra
let totalProceso
let formulario
let cantidadCarro = 0
let totalCompra = 0



const Productos = [
  { id: 1, nombre: "Animal Crossing", cantidad: 1, precio: 1200, img: "img/animalCrossing.jpeg", },
  { id: 2, nombre: "Ark Evolve", cantidad: 1, precio: 1200, img: "img/arkEvolve.jpg", },
  { id: 3, nombre: "Mario Party Super Stars", cantidad: 1, precio: 1200, img: "img/supermarioparty.jpg", },
  { id: 4, nombre: "Crash Bandicoot Trilogy", cantidad: 1, precio: 1200, img: "img/crash.png", },
  { id: 5, nombre: "Bayonetta", cantidad: 1, precio: 1200, img: "img/bayonetta.png", },
  { id: 6, nombre: "Asassins Creed 3", cantidad: 1, precio: 1200, img: "img/assassins creed 3.jpg", },
  { id: 7, nombre: "Crash Bandicoot 4", cantidad: 1, precio: 1200, img: "img/crash 4.jpg", },
  { id: 8, nombre: "DMC 5 Special Edition", cantidad: 1, precio: 1200, img: "img/Devil May Cry 5.jpeg", },
  { id: 9, nombre: "Elden Ring", cantidad: 1, precio: 1200, img: "img/eldenRing.jpg", },
  { id: 10, nombre: "Hogwarts Legacy", cantidad: 1, precio: 1200, img: "img/hogwartslegacy.jpg", },
  { id: 11, nombre: "Horizon Forbidden West", cantidad: 1, precio: 1200, img: "img/horizon.jpg", },
  { id: 12, nombre: "Call of Duty MW II", cantidad: 1, precio: 1200, img: "img/callofdutymw3.jpg", },
];

let carrito = [];

//========================FUNCION QUE INICIALIZA VARIABLES===================

function inicializarVariables() {
  try {
    contenedor = document.getElementById("contenedor");
    vaciarCarrito = document.getElementById("vaciarCarrito");
    precioTotal = document.querySelector("#precioTotal");
    finalizarCompra = document.getElementById("finalizarCompra")
    procesarCompra = document.getElementById("procesarCompra");
    totalProceso = document.getElementById("totalProceso");
    formulario = document.querySelector('#procesar-pago');
    finalizarCompra.onclick = comprar;

  } catch (error) {

  }
  if (procesarCompra) {
    procesarCompra.onclick = realizarCompra;

  }

  if (vaciarCarrito) {
    vaciarCarrito.onclick = vaciarCarro;
  }
}


//=========================FUNCION QUE PINTA LOS PRODUCTOS EN EL INDEX===========================


function pintarProductos() {
  try {
    Productos.forEach((producto) => {
      let column = document.createElement("div");
      column.className = "col-md-4 mt-3";
      column.id = `columna-${Productos.id}`;
      contenedor.innerHTML += `
    <div class="card mt-3 mx-2" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${producto.img}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title" id="text">${producto.nombre}</h5>
          <p class="card-text" id="text">Precio: ${producto.precio}</p>
          <p class="card-text" id="text">Cantidad: ${producto.cantidad}</p>
          <button class="btn btn-primary" id="${producto.id}" onclick="agregarProductos(${producto.id})">Comprar Producto</button>
        </div>
    </div>
    `;

    })
  } catch (error) { }

}


//===============================FUNCION QUE AGREGA LOS PRODUCTOS AL CARRO=====================

function agregarProductos(id) {

  let index = Productos.findIndex((Productos) => Number(Productos.id) == id);
  nombreProd = Productos[index].nombre

  if (carrito.length == 0) {
    carrito.push(Productos[index])
    console.table(carrito)
  } else if (carrito.length != "") {
    let prodID = carrito.some((valor) => valor.id === id)
    if (prodID) {

      let newArray = carrito.map((producto) => producto.nombre).indexOf(nombreProd)
      carrito[newArray].cantidad += 1
      console.table(carrito)
     } //else {
    //   carrito.push(Productos[index])
    //   console.table(carrito)
    // }

  }
  mostrarCarrito()
}


//=================================FUNCION QUE CALCULA LA CANTIDAD TOTAL DE PRODUCTOS===========================


function cantidadCarrito() {
  cantidadCarro = 0
  carrito.forEach((carro) => {
    cantidadCarro += carro.cantidad;

  })
  return cantidadCarro
}

//============================================FUNCION QUE PINTA LOS PRODUCTOS AGREGADOS EN EL CARRITO EN EL MODAL==========
function mostrarCarrito() {

  let cart = document.getElementById("carritoContenedor");
  cart.innerText = cantidadCarrito();

  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, img, cantidad } = prod;

      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>  
      `;
    });
  }

  if (carrito.length === 0) {

    modalBody.innerHTML += `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  }
  if (precioTotal) {
    precioTotal.innerText = ("$ " + carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0)
    )
  }

  guardarStorage();
};

//=================FUNCION PARA GUARDAR EN EL LOCAL STORAGE=========================
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//=================FUNCION PARA ELIMINAR PRODUCTOS DEL CARRO=========================
function eliminarProducto(id) {
  let index = carrito.findIndex((carrito) => Number(carrito.id) == id);
  carrito[index].cantidad -= 1
  carrito = carrito.filter((juego) => juego.cantidad > 0);
  mostrarCarrito();
  console.table(carrito)
  let cart = document.getElementById("carritoContenedor");
  cart.innerText = cantidadCarrito();
}

//=================FUNCION PARA EL BOTON DE VACIAR CARRO=========================
function vaciarCarro() {

  carrito.length = [];
  mostrarCarrito();
  console.table(carrito)

}

//=================OBTIENE LOS DATOS DEL STORAGE=========================

function obtenerProductosStorage() {
  let productosJSON = localStorage.getItem("carrito");
  if (productosJSON != null) {
    carrito = JSON.parse(productosJSON);
    mostrarCarrito();
    let cart = document.getElementById("carritoContenedor");
    cart.innerText = cantidadCarrito();
  }
}


function realizarCompra() {

  if (carrito.length === 0) {
    Swal.fire({
      title: "¡Tu carrito está vacio!",
      text: "Agrega un producto para continuar con la compra",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    location.href = "compra.html";
  }

}

function procesarPedido() {
  totalProceso = document.getElementById("totalProceso")
  try {
    let productosJSON = localStorage.getItem("carrito");
    if (productosJSON != null) {
      carrito = JSON.parse(productosJSON);
      let cart = document.getElementById("carritoContenedor");
      cart.innerText = cantidadCarrito();
      carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const { id, nombre, precio, img, cantidad } = prod;
        if (listaCompra) {
          const row = document.createElement("tr");
          row.innerHTML += `
                  <td>
                  <img class="img-fluid img-carrito" src="${img}"/>
                  </td>
                  <td>${nombre}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>${precio * cantidad}</td>
                `;
          listaCompra.appendChild(row);

          totalCompra += prod.cantidad * prod.precio;

        }
      });

    }
  } catch (error) { }
if(totalProceso){
  totalProceso.innerText = `TOTAL: ${totalCompra}`;
  console.log(totalCompra)
}
}

function comprar() {

  Swal.fire({
    title: "¡Compra Existosa!",
    text: "su compra a sido realizada con exito",
    icon: "success",
    timer: 3000,
  });
  setTimeout(() => {
    location.href = "index.html";
    localStorage.clear();
    carrito = [];
    mostrarCarrito();

  }, 3000)

}




procesarPedido()
inicializarVariables()
pintarProductos()
obtenerProductosStorage()






