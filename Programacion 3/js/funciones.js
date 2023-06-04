
function getResults() {
    getRickMortyCharacter(); // Funcion asociada al boton, que cunando es accionado llama a las otras 2 funciones (RickAndMorty y Random User)
    getRandomUser();
  }

  function getRickMortyCharacter() {
    fetch('https://rickandmortyapi.com/api/character/') // Se realiza una solicitud a esta url (api rick and morty)
      .then(response => response.json()) // Json es un formato especial
      .then(data => {
        const results = data.results;                                      //Se accede a los personajes a traves del result (Personajes) del objeto data
        const randomIndex = Math.floor(Math.random() * results.length);     // A traves de un calculo matematico random  (genera un indice aleatorio ), se obtiene un personaje
        const randomCharacter = results[randomIndex];                      // Este personaje se guarda en la constante (variable no modificable)  randomCharacter

        const rickMortyContainer = document.getElementById('rick-morty-results');    // Crea una contenedor de info (RickMortyResults) , y que se ubique en el div con id(ubicacion) rickmortyresults 
        rickMortyContainer.innerHTML = '';      //Borra cualquier contenido existente para asegurarse de que este limpio para guardar los nuevos resultados 

        const characterElement = document.createElement('div');   //Crea un elemento div (caja contenedora) para guardar la info del personaje
        characterElement.innerHTML = `
          <img src="${randomCharacter.image}" alt="Character Image"> 
          <p>Nombre: ${randomCharacter.name}</p>
          <p>Especie: ${randomCharacter.species}</p>              
          <p>Género: ${randomCharacter.gender}</p>
        `;                                                                        //Informacion  del personaje                     
        rickMortyContainer.appendChild(characterElement); // Este codigo guarda la info de characterelement en RickmortyContainer (Elemento hijo)

        compareGenders(randomCharacter.gender, getUserGender());
      })
      .catch(error => {
        console.error('Error al obtener el personaje de Rick and Morty:', error);
      });
  }

  function getRandomUser() {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        const user = data.results[0];
        const randomUserContainer = document.getElementById('random-user-results');
        randomUserContainer.innerHTML = '';

        const userElement = document.createElement('div');                        // El mismo procedimiento que Rick and Morty
        userElement.innerHTML = `
          <img src="${user.picture.large}" alt="User Picture">
          <p>Nombre: ${user.name.first} ${user.name.last}</p>
          <p>Género: ${user.gender}</p>
          <p>Email: ${user.email}</p>
          <p>Ubicación: ${user.location.city}, ${user.location.country}</p>
        `;
        randomUserContainer.appendChild(userElement);

        compareGenders(getRickMortyGender(), getUserGender());
      })
      .catch(error => {
        console.error('Error al obtener el usuario aleatorio de Random User:', error);
      });
  }

  function compareGenders(rickMortyGender, randomUserGender) {
    const tikElement = document.getElementById('tik');
    tikElement.className = '';

    const tikTextElement = document.getElementById('tik-text');

    if (rickMortyGender.toLowerCase() === randomUserGender.toLowerCase()) {
      tikElement.classList.add('tik', 'green');
      tikTextElement.textContent = 'Coincide';
    } else {
      tikElement.classList.add('tik', 'red');
      tikTextElement.textContent = 'No coincide';
    }
  }

  function getRickMortyGender() {
    const rickMortyGenderElement = document.getElementById('rick-morty-results').querySelector('p:nth-child(4)'); //Selecciona el genero del personaje ubicado en rick y morty results encontrado en el 4to parrafo
    if (rickMortyGenderElement) {
      return rickMortyGenderElement.textContent.trim();  // Si el rickMorty Gender Element coincide con el genero obtenido recien devuelve el texto del genero y con el trim borra cualuqier espacio adicional en el
    }
    return '';
  }

  function getUserGender() {
    const randomUserGenderElement = document.getElementById('random-user-results').querySelector('p:nth-child(3)');
    if (randomUserGenderElement) {
      return randomUserGenderElement.textContent.trim();
    }
    return '';
  }

  