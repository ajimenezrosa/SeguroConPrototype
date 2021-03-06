# Cotizador de Seguros de Autos
![](https://i.ytimg.com/vi/3O8reWqS1EA/maxresdefault.jpg)
# 
### Definicion
#### Los prototipos son un mecanismo mediante el cual los objetos en JavaScript heredan características entre sí. En este proyecto, explicaremos como funcionan los prototipos y también cómo se pueden usar las propiedades de estos para añadir métodos a los contructores existentes.
# 



#### nuestro codigo ***javascript***
# 
~~~javascript
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

~~~



  # Leer el tipo de cobertura
  #### Este objeto es un radio buttom los readio button se leen en javascript de la siguiente manera
 ~~~javascript
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
    console.log(tipo);
~~~ 

    Lo que estamos haciendo en este codigo es lo siguiente:
        - seleccionamos el input con nombre igual a tipo, como podras ver en el html los dos radioButtom tienen como nombre tipo

        - Luego de esto le decimos a codigo que seleccione el que esta chequeado y tomamos su valor.



# 
## Creacion de codigo para poder desplegar los mensajes tanto de error como de exito en el formulario

~~~javascript
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
~~~

# Creacion de Prototype de cotizarSeguro

#### Para este ejemplo crearemos un prototype para realizar el calculo del seguro segun el año y el tipo de seguro.

#### En el siguiente codigo haremos que el valor de un seguro sea decreciente en un 3% de acuerdo a cada año que tenga el vehiculo.
#### ademas de esto tenemos dos tipos de seguros ***Basiso*** y ***Completo*** esto lo manejaremos de la siguiente forma. 
            - para el seguro Basico aplicaremos un 30% al valor de la poliza 
            - para el seguro Completo aplicaremos un 50% al valor de la poliza 


~~~javascript
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

        if(this.tipo ==='Basico'){
            cantidad *= 1.30
        }else {
            cantidad *= 1.30
        }

        return cantidad;
        console.log(cantidad);
}
~~~

# Mostrar Resultados
~~~javascript
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
~~~

