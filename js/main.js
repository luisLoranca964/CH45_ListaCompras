const btnAgregar = document.getElementById("btnAgregar")
const txtNombre = document.getElementById("Name")
const txtNumber = document.getElementById("Number")
const alertValidaciones = document.getElementById("alertValidaciones")
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto")

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

btnAgregar.addEventListener("click",function(event){
    event.preventDefault()
    txtNombre.style.border=""
    alertValidacionesTexto.innerHTML=""      
    alertValidaciones.style.display="none"

    if(txtNombre.value.length<3){
        txtNombre.style.border="solid"
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto. <br>"      
        alertValidaciones.style.display="block"
        //return false
    }

    if (! validarCantidad()) {
        txtNumber.style.border="solid"
        alertValidacionesTexto.innerHTML +="La <strong>Cantidad</strong> no es correcta. <br>"      
        alertValidaciones.style.display="block"
    }

    txtNombre.addEventListener("blur", function(event){
        txtNombre.value = txtNombre.value.trim()
    })
    
    txtNumber.addEventListener("blur", function(event){
        txtNumber.value = txtNumber.value.trim()
    })
})