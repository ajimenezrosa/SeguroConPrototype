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
    console.log(year);

  // leer el tipo de cobertura
  // este objeto es un radio buttom los readio button se leen en javascript de la siguiente manera
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if( marca=== '' || year ==='' || tipo === '') {
        // console.log('No paso la Validacion');


    } else {
        console.log('Si paso la Validacion');
    }

}

