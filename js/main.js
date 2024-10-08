const btnAgregar = document.getElementById("btnAgregar")
const txtNombre = document.getElementById("Name")
const txtNumber = document.getElementById("Number")
const alertValidaciones = document.getElementById("alertValidaciones")
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto")
const tablaListaCompras = document.getElementById("tablaListaCompras")
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0)
const contadorProductos = document.getElementById("contadorProductos")
const productosTotal = document.getElementById("productosTotal")
const precioTotal = document.getElementById("precioTotal")
const btnClear = document.getElementById("btnClear")

let isValid = true
let contador = 0
let precio = 0
let costoTotal = 0
let totalEnProductos = 0

let datos = new Array()

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false
    }
    if(isNaN(txtNumber.value)){
        return false
    }
    if(Number(txtNumber.value)<=0){
        return false
    }
    return true
}

function getPrecio() {
    return Math.round((Math.random()*10000))/100
}

btnAgregar.addEventListener("click",function(event){
    event.preventDefault()
    txtNombre.style.border=""
    txtNumber.style.border=""
    alertValidacionesTexto.innerHTML=""      
    alertValidaciones.style.display="none"
    isValid = true

    if(txtNombre.value.length<3){
        txtNombre.style.border="solid"
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto. <br>"      
        alertValidaciones.style.display="block"
        isValid = false
    }

    if (! validarCantidad()) {
        txtNumber.style.border="solid"
        alertValidacionesTexto.innerHTML +="La <strong>Cantidad</strong> no es correcta. <br>"      
        alertValidaciones.style.display="block"
        isValid = false
    }

    if(isValid){
        contador++
        precio = getPrecio()
        let row = `<tr>
                    <td>${contador}</td>
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
        </tr>`

        let elemento ={"contador": contador,
            "nombre": txtNombre.value,
            "cantidad": txtNumber.value,
            "precio": precio
        }

        datos.push(elemento)
        localStorage.setItem("datos",JSON.stringify(datos))

        cuerpoTabla.insertAdjacentHTML("beforeend",row)
        costoTotal  += precio * Number(txtNumber.value)
        totalEnProductos += Number(txtNumber.value)
        contadorProductos.innerText = contador
        productosTotal.innerText = totalEnProductos
        precioTotal.innerText = "$" + costoTotal

        localStorage.setItem("contador", contador)
        localStorage.setItem("totalEnProductos", totalEnProductos)
        localStorage.setItem("costoTotal", costoTotal)

        txtNombre.value=""
        txtNumber.value=""
        txtNombre.focus()
    }
})

btnClear.addEventListener("click", function(event){
    event.preventDefault()
    txtNombre.value = ""
    txtNumber.value = ""
    localStorage.clear()
    contador = 0
    costoTotal = 0
    totalEnProductos = 0
    contadorProductos.innerText = contador
    productosTotal.innerText = totalEnProductos
    precioTotal.innerText = "$ " + costoTotal
    alertValidacionesTexto.innerHTML=""      
    alertValidaciones.style.display="none"
    txtNombre.style.border=""
    txtNumber.style.border=""
    txtNombre.focus()
    cuerpoTabla.innerText = "";
})

txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim()
})

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim()
})

window.addEventListener("load",function(event){
    if(this.localStorage.getItem("contador")!=null){
        contador = Number(this.localStorage.getItem("contador"))
    }
    if(this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"))
    }   
    if(this.localStorage.getItem("costoTotal")!=null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"))
    }
    if(this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"))
    }
    datos.forEach(r => {
        let row = `<tr>
                    <td>${r.contador}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
        </tr>`
        cuerpoTabla.insertAdjacentHTML("beforeend",row)
    })
    contadorProductos.innerText = contador
    productosTotal.innerText = totalEnProductos
    precioTotal.innerText = "$ " + costoTotal
})