
const bototn = document.querySelector('#load-more');
let body= "";
// URL base de la API
const API_URL = 'https://rickandmortyapi.com/api/character/';

// Función para obtener los personajes
function getCharacters(page) {
    
    return new Promise((resolve, reject) => {
        
        fetch(`${API_URL}?page=${page}`)
            .then(response => response.json())
            .then(data => resolve(data.results))
            .catch(error => reject(error));
            
    });
}

// Función para mostrar los personajes
function displayCharacters(characters) {

    document.querySelector('#mostrar-cargando').textContent="CARGANDO...";
    characters.forEach(character => {
        body +=`<div class="box">
        <div class="icons">
         <span>${character.id}</span>
        </div>
         <div class="image">
            <img src="${character.image}" alt="">
         </div>
         <div class="content">
            <h3>${character.name}</h3>
         </div>
      </div>`;
      document.getElementById('content').innerHTML = body;
    });
    document.querySelector('#mostrar-cargando').textContent="";
}

let page = 1;
function cargar_mas(page){
    getCharacters(page)
    .then(characters => {
        displayCharacters(characters);
        return getCharacters(page);
    })
    .catch(error => console.error(error));
}

cargar_mas(page);

bototn.addEventListener('click', function(){
    page++;
    cargar_mas(page); //pasa de página al hacer click
    
});