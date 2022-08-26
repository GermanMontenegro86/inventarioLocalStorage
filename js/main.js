let productos = [];

const formulario = document.getElementById('formulario');

const contenedorProductos = document.getElementById('Imprimir');

const eliminarTodo = document.getElementById("borrarTodo");

const verProducto = document.getElementById("buscar");

const cantidadStock = document.getElementById("cantidad");

class Producto {
    constructor(producto, precio, stock, vto) {
        this.producto = producto;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.vto = vto;
    }
}

function iliminarStorage(clave, valor) {
    localStorage.clear(clave, valor);
}
function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

function buscarArticulo() {

    let buscarProducto = document.getElementById("pro").value;
    buscarProducto = productos.find((el) => el.producto == buscarProducto);
    return buscarProducto;

}

function verStock() {
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

    guardarStorage("articulos",productos);
    resetear();

    mostrarProductos( obtenerProductos);
}

function resetear() {
    document.getElementById('producto').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('vto').value = '';
}

function mostrarProductos() {
    contenedorProductos.innerHTML = '';
    productos.forEach(element => {
        const {
            producto,precio,stock,vto} = element;
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
            <td style="color:red;">${vto}</td>
            </tr>

         </table>`;

    });
}


verProducto.addEventListener("click", () => {
    buscarArticulo();
    console.log(buscarArticulo());
});


cantidadStock.addEventListener("click", () => {

    verStock();

    console.log(verStock());

});

if (recuperarStorage('articulos')) {
   obtenerProductos = recuperarStorage('articulos');
    mostrarProductos( obtenerProductos);
}


eliminarTodo.addEventListener("click", () => {
    iliminarStorage();
});

formulario.addEventListener('submit', obtenerDatos);