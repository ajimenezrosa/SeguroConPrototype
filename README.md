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



