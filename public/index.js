
const socket = io.connect();

const divListaProductos = document.getElementById('products-list')

function addProducts(e){
    const producto = {
        productName: document.getElementById('product').value,
        productPrice: document.getElementById('price').value,
        productUrl: document.getElementById('urlImage').value
    }

    socket.emit('new-product', producto);
    return false;
}

socket.on('new-list', (listaProductos)=>{

    fetch('/products-list.hbs')
        .then(response=>response.text())
        .then(data=>{divListaProductos.innerHTML =`${data}`})

        

    // divListaProductos.innerHTML = listaProductos.map(el=>{
    //     return(
    //         `<p>${el.productName}</p>
    //         <p>${el.productPrice}</p>
    //         `
    //     )
    // }).join('')
})