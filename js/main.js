const formulario = document.getElementById('formulario');
const contenedorProductos = document.getElementById('productos');
let productos = [];

if (recuperarStorage('productos')) {
    productos = recuperarStorage('productos');
    mostrarProductos(productos);
}

class Producto {
    constructor(producto, precio, stock, vto) {
        this.producto = producto;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.vto = vto;
    }
}

function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

function buscarArticulo(){

    let buscarProducto = document.getElementById("pro").value;
    buscarProducto = productos.find((el) => el.producto == buscarProducto);
    return buscarProducto;

}

function verStock(){
    let buscarStock = document.getElementById("numero").value;
    buscarStock = productos.filter((el) => el.stock >= buscarStock);
    return buscarStock;
}


function obtenerDatos(e) {
    e.preventDefault();
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const vto = document.getElementById('vto').value;

    // console.log(producto, precio, stock,vto);

    const nuevoProducto = new Producto(producto, precio, stock, vto);
    productos.push(nuevoProducto);

    guardarStorage("productos", productos);
    resetear();

    mostrarProductos(productos);
}

function resetear() {
    document.getElementById('producto').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('vto').value = '';
}

function mostrarProductos(productos) {
    contenedorProductos.innerHTML = '';
    productos.forEach(element => {
        const {
            producto,precio,stock, vto} = element;
            contenedorProductos.innerHTML += `
            <table>
            <tr>
            <td><strong>Producto</strong></td>
            <td><strong>Precio</strong></td>
            <td><strong>Stock</strong></td>
            <td><strong>Vencimiento</strong></td>
            </tr>

            <tr>
            <td>${producto}</td>
            <td>$${precio}</td>
            <td>${stock}</td>
            <td>${vto}</td>
            </tr>

         </table>`;
         
        });
}

const verProducto = document.getElementById("buscar");
verProducto.addEventListener("click", () => {
    buscarArticulo();
    console.log(buscarArticulo());
});

const cantidadStock = document.getElementById("cantidad");
cantidadStock.addEventListener("click", () => {
    
    verStock();

    console.log(verStock());

});

formulario.addEventListener('submit', obtenerDatos);


































// recuperarLocalStore();

// function recuperarLocalStore() {

//     let recuperarProductos = JSON.parse(localStorage.getItem("articulos"));
//     if (recuperarProductos) {

// console.log(recuperarProductos);

//     } else {
//         console.log("no hay nada")
//     }

// }



// function guaradarLocal(nuevoProducto) {

//     productos.push(nuevoProducto);

//     localStorage.setItem("articulos", JSON.stringify(productos));
// }







// const productos = [];


// function modificarStock(stock) {
//     let buscarStock = productos.filter((el) => el.stock >= buscarStock);
//     // return stock;
//     alert(buscarStock);
// }


// function buscarArticulo() {

//     let buscarProducto = document.getElementById("pro").value;
//     buscarProducto = productos.find((el) => el.nombre == buscarProducto);
//     return buscarProducto;

// }

// function verStock() {
//     let buscarStock = document.getElementById("numero").value;
//     buscarStock = productos.filter((el) => el.stock >= buscarStock);
//     return buscarStock;
// }

// class Producto {
//     constructor(nombre, precio, stock, vencimiento) {
//         this.nombre = nombre;
//         this.precio = parseFloat(precio);
//         this.stock = parseInt(stock);
//         this.vencimiento = vencimiento;

//     }

// }

// function escribirLosProductos() {

//     const nombre = document.getElementById("nombre").value;

//     document.querySelector(".Producto").innerHTML += `<li>${nombre} </li>`;

//     const precio = document.getElementById("precio").value;
//     document.querySelector(".Precio").innerHTML += `<li>${precio} </li>`;

//     const stock = document.getElementById("stock").value;
//     document.querySelector(".Stock").innerHTML += `<li>${stock} </li>`;

//     const vencimiento = document.getElementById("vto").value;
//     document.querySelector(".Vencimiento").innerHTML += `<li>${vencimiento} </li>`;


//     const nuevoProducto = new Producto(nombre, precio, stock, vencimiento);

//     guaradarLocal(nuevoProducto);


// }


// const guardar = document.getElementById("Guardar");
// guardar.addEventListener("click", () => {

//     escribirLosProductos();

// });

// const verProducto = document.getElementById("buscar");
// verProducto.addEventListener("click", () => {

//     buscarArticulo();

//     console.log(buscarArticulo());

//     modificarStock();
//     console.log(modificarStock);

// });


// const cantidadStock = document.getElementById("cantidad");
// cantidadStock.addEventListener("click", () => {

//     verStock();

//     console.log(verStock());

// });


// const ver = document.getElementById("imprimir");
// ver.addEventListener("click", () => {

//     window.print();

// });