// Constructores

function Seguro(marca, year , tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;

}

function UI() {

}

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max -10;

    const selectYear = document.querySelector('#year');

    for( let i = max; i>=min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);

    }
}


UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const formulario = document.querySelector('#cotizar-seguro');
    const div = document.createElement('div');

    if (tipo ==='error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // insertar en el html
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}


// Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones();  // llena el select con los Anios
})


addEventListener();
function addEventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarseguro);
}


function cotizarseguro(e) {
  e.preventDefault();

  // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    
    // leer el anio seleccionado
    const year = document.querySelector('#year').value;

  // leer el tipo de cobertura
  // este objeto es un radio buttom los readio button se leen en javascript de la siguiente manera
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if( marca=== '' || year ==='' || tipo === '') {
        ui.mostrarMensaje('Todos los Campos Son Obligatorios', 'error');
        return;
    } 
    
    ui.mostrarMensaje('Cotizando', 'exito');
   
    // Instanciar el seguro


    //Utilizar prototype que va a cotizar..
    



}

