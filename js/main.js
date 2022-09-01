let arrayProductos = [];

const nombreProducto = document.querySelector('#nombre-producto');

const filtrar = document.querySelector('#filtrar');

const eliminar = document.getElementById("borrar");

const volver = document.getElementById("volver");

class Producto {
    constructor(producto, precio, stock, vto) {
        this.producto = producto;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.vto = vto;
    }
}

function borrarTodo(){
    localStorage.clear();
    renderizarHtml();
}

function renderizarHtml(array) {
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';

    // if (array.length === 0) {
    //     tbody.innerHTML = "<h1 class='mt-5'>No se encontraron resultados</h1>"
    // }

    array.length === 0 ?  tbody.innerHTML = "<h1 class='mt-5'>No tenes este producto en tu inventario</h1>" : 

    array.forEach(({
        producto,precio,stock,vto}) => {
        const tr = document.createElement('tr');
        tr.innerHTML = 
        `<td>${producto}</td>
         <td>$${precio}</td>
         <td>${stock}</td>
         <td>${vto}</td>
         `
        tbody.appendChild(tr);
    });
}

function obtenerDatos(e) {
    e.preventDefault();
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const vto = document.getElementById('vto').value;
    const nuevoProducto = new Producto(producto, precio, stock, vto);
    arrayProductos.push(nuevoProducto);
    renderizarHtml(arrayProductos);
    guardarStorage("articulos", arrayProductos);
    resetear();


}

function resetear() {
    document.getElementById('producto').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('vto').value = '';
}

function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}
nombreProducto.addEventListener('input', () => {
    const encontrados = arrayProductos.filter(({
        producto
    }) => {
        return producto.toUpperCase().includes(nombreProducto.value.toUpperCase());
    });
    renderizarHtml(encontrados);
});

filtrar.addEventListener('click', () => {
    const desde = document.querySelector('#desde').value;
    const hasta = document.querySelector('#hasta').value;

    const encontrados = arrayProductos.filter(({
        precio
    }) => {
        return Number(precio) >= desde && Number(precio) <= hasta;
    });
    renderizarHtml(encontrados);
  

})

if (recuperarStorage('articulos')) {
    arrayProductos = recuperarStorage('articulos');
    renderizarHtml(arrayProductos);
}

volver.addEventListener("click", () => {
    document.location.reload();
})

formulario.addEventListener('submit', obtenerDatos);

eliminar.addEventListener("click", ()=>{
     Swal.fire({
        title: 'Eliminar todo',
        text: '¿Está seguro de eliminar todo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        backdrop: '#66f4ae22'
    }).then((result)=>{
    if(result.isConfirmed){
       borrarTodo();
       
    }
    }) 

});




