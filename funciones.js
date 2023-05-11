
document.querySelector('form').addEventListener('submit', function(event) { //selecciona la parte donde esta el form en el html
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
  
    var nombrepersonaje= document.getElementById('myTextarea').value; // Obtiene el nombre del personaje ingresado
  
    // Envia una solicitud a la API de rick y morty 
    fetch(`https://rickandmortyapi.com/api/character/?name=${nombrepersonaje}`)
      .then(response => response.json()) // Pasa la respuesta a Json
      .then(data => {
        console.log('Datos del personaje:', data.results[0]); // Muestra los datos del primer personaje que coincide con el nombre (en la consola)
        
        // Selecciona el elemento donde quieres mostrar los datos
        const informacion = document.getElementById('informacion');
  
        // Crea un elemento p para mostrar los datos
        const parrafo = document.createElement('p');
        
        // Crea un elemento img para mostrar la imagen 
        const imagen = document.createElement('img');
        
        

  
        // Agrega el contenido que quieres mostrar dentro del elemento <p>
        parrafo.innerHTML = 'Nombre: ' + data.results[0].name + ' <br>Estado: ' + data.results[0].status + ' <br>Especie: ' + data.results[0].species;
        imagen.src = data.results[0].image; 

        // Agrega el elemento <p> dentro del elemento seleccionado
        informacion.appendChild(parrafo);
        informacion.appendChild(imagen);
      })
      .catch(error => {
        console.error('Error al obtener los datos del personaje:', error); // Muestra un error si ocurre algun fallo
      });
  });