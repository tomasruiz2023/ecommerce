import { navbarPrincipal, cuentaProductosCarrito } from './ecommerce.js';

const items = document.getElementById('items')
// const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('carritoTom')) {
        // carrito = JSON.parse(localStorage.getItem('carritoTom'))
        navbarPrincipal()
        renderizarCarrito();
        // pintarCarrito()

    }
}
)

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carritoTom")) || [];

}

function renderizarCarrito() {

    const carrito = obtenerCarrito();
    console.log(carrito);
    console.log(carrito.length);
    const tabla = document.getElementById("tablaCarrito");

    tabla.innerHTML = "";

    let totalGeneral = 0;

    carrito.forEach((producto, index) => {

        const totalItem = producto.precio * producto.cantidad;
        totalGeneral += totalItem;

        tabla.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${producto.titulo}</td>
                <td>$${producto.precio.toLocaleString("es-CL")}</td>
                <td>
                    
                    ${producto.cantidad}

                    <a href="#" class="icon-link" onclick="aumentar(${producto.id})">
                    <i class="bi bi-plus-circle"></i> 
                    </a>
                    <a href="#" class="icon-link" onclick="disminuir(${producto.id})">
                    <i class="bi bi-dash-circle"></i> 
                    </a>
                </td>
                <td>$${totalItem.toLocaleString("es-CL")}</td>
                <td>
                    <button onclick="eliminar(${producto.id})">❌</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalGeneral").innerText = totalGeneral.toLocaleString("es-CL");
    navbarPrincipal()
}


function aumentar(id) {

    let carrito = obtenerCarrito();

    carrito = carrito.map(p => {
        if (p.id === id) {
            p.cantidad++;
        }
        return p;
    });

    localStorage.setItem("carritoTom", JSON.stringify(carrito));
    renderizarCarrito();
}


function disminuir(id) {

    let carrito = obtenerCarrito();

    carrito = carrito.map(p => {
        if (p.id === id) {
            p.cantidad--;
        }
        return p;
    }).filter(p => p.cantidad > 0);

    localStorage.setItem("carritoTom", JSON.stringify(carrito));
    renderizarCarrito();
}


function eliminar(id) {

    let carrito = obtenerCarrito();

    carrito = carrito.filter(p => p.id !== id);

    localStorage.setItem("carritoTom", JSON.stringify(carrito));
    renderizarCarrito();
}

// Hacer las funciones globales para que sean accesibles desde onclick
window.aumentar = aumentar;
window.disminuir = disminuir;
window.eliminar = eliminar;