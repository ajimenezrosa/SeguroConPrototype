// Constructores

function Seguro(marca, year , tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;

}

//Realiza la cotizacion con los datos;
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */

    let cantidad;
    const base = 2000;

        switch(this.marca){

            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
            default:
        }

        // leer el anio
        const diferencia =new Date().getFullYear() - this.year;
        // Cada anio que la diferencia es mayor , el costo va a reducirce en un 3%
        if(diferencia > 0) {
            cantidad -=((diferencia * 3) * cantidad) / 100 ;
        } 

        /*
            Si el seguro es basico se multiplica en un 30% Mas
            Si el seguro es Completo se multiplica en un 50% Mas
        */

        console.log(this.tipo)    ;

        if(this.tipo ==='basico'){
            cantidad *= 1.30;
        }else {
            cantidad *= 1.50;
        }

        return cantidad;
        console.log(cantidad);
}


function UI() {

}

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max -20;

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

UI.prototype.mostrarResultado = (seguro, total) => {

    const {marca, year, tipo } = seguro

    let textoMarca;
        switch(marca){
            case '1':
                textoMarca= 'Americano'
                break;
            case '2':
                textoMarca= 'Asiatico'
                break;
            case '3':
                textoMarca= 'Europeo'
                break;

            default:
                break;
        }

    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen</>
        <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span> </p>
        <p class="font-bold">Año: <span class="font-normal"> ${year} </span> </p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo} </span> </p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total} </span> </p>
    `

    const resultadoDiv = document.querySelector('#resultado');

    //Mostrar el Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    

    setTimeout(() =>{
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div); 

    },3000)

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
   
    // Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados !== null){
        resultados.remove();
    }
    

    // Instanciar el seguro
    const seguro = new Seguro(marca , year , tipo);
    const total = seguro.cotizarSeguro();

    //Utilizar prototype que va a cotizar..

    ui.mostrarResultado(seguro, total);


}

