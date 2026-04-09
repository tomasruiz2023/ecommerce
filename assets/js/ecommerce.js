

//const img = document.querySelector('img');
const fragment = document.createDocumentFragment()
let data = [];
let carrito = [];

// esta constante realiza la carga del del catalogo de productos 
function navbarPrincipal() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            cuentaProductosCarrito()

        });


}

const cargaCatalogoProductos = async () => {
    try {
        const res = await fetch('productos.json')
        data = await res.json()
        pintaCatalogo(data);


    } catch (error) {
        console.log(error)
    }
};

// esta funcion se ejecuta cuando se termina de cargar toda la pagina
document.addEventListener('DOMContentLoaded', () => {
    navbarPrincipal()
    cargaCatalogoProductos()


}
);

function cuentaProductosCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carritoTom")) || [];
    const totalCantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    const cantItems = carrito.length
    const iconoShop = document.getElementById('icono-shop');
    iconoShop.innerHTML = `<i class="bi bi-bag"></i> ${cantItems} Items / ${totalCantidad} Productos `;
}



function pintaCatalogo(data) {
    const cards = document.getElementById('cards')
    const templateProducto = document.getElementById('template-producto').content
    //se agregan los datos a la card para cada elemento del json
    data.forEach(item => {
        // se agregan titulo y precio
        // templateProducto.querySelector('h5').textContent = item.titulo
        // templateProducto.querySelector('h2').textContent = item.precio
        // // se agregan datos de la imagen
        // const img = templateProducto.querySelector('img')
        // img.src = item.imagen;
        // img.alt = item.titulo;
        // // se agregan datos para los botones
        // templateProducto.querySelector('#btnAgregar').dataset.id = item.id
        // const clone = templateProducto.cloneNode(true)
        // fragment.appendChild(clone)

        // const btnAgregar = clone.querySelector('#btnAgregar')
        // btnAgregar.addEventListener('click', () => agregarAlCarrito(item.id));

        const clone = templateProducto.cloneNode(true);
        clone.querySelector('h5').textContent = item.titulo
        clone.querySelector('h2').textContent = item.precio
        const img = clone.querySelector('img')
        img.src = item.imagen;
        img.alt = item.titulo;
        clone.querySelector('#btnAgregar').dataset.id = item.id
        const btn = clone.querySelector('#btnAgregar');
        btn.addEventListener('click', () => agregarAlCarrito(item.id));
        fragment.appendChild(clone)

    })
    cards.appendChild(fragment)



};


function agregarAlCarrito(id) {

    let carrito = JSON.parse(localStorage.getItem("carritoTom")) || [];
    console.log(typeof carrito, carrito);
    const producto = data.find(p => p.id === id);

    let existente = carrito.find(p => p.id === id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    localStorage.setItem("carritoTom", JSON.stringify(carrito));
    console.log(carrito);
    cuentaProductosCarrito();

}




//const img = document.querySelector('img');
//// Forma limpia para múltiples atributos
//img.src = 'imagen.jpg';
//img.alt = 'Descripción';
//// O también:
//Object.assign(img, {
//    src: 'imagen.jpg',
//    alt: 'Descripción',
//    title: 'Título'
//});
//]


// ejemplo de funcion flecha en javaascript
// const suma = (a, b) => a + b;

// misma function, pero flecha
const muestraCatalogo2 = (data) => {
    console.log(data.length);
}


export { navbarPrincipal, cuentaProductosCarrito };

//import { saludar } from './funciones.js';