const URL_BASE = 'https://swapi.dev/';
const URL_CHARACTERS = URL_BASE + 'api/people/?page=';
let characterInfoElement1, characterInfoElement2, characterInfoElement3;
let characters = [];

function createCardBlock(character) {
  const cardBlock = document.createElement('div');
  cardBlock.classList.add('card');

  const nameElement = document.createElement('h3');
  nameElement.textContent = character.name;
  cardBlock.appendChild(nameElement);

  const heightElement = document.createElement('p');
  heightElement.textContent = `Altura: ${character.height} cm`;
  cardBlock.appendChild(heightElement);

  const weightElement = document.createElement('p');
  weightElement.textContent = `Peso: ${character.mass} kg`;
  cardBlock.appendChild(weightElement);

  return cardBlock;
}

function showCharacters(startIndex, endIndex, element) {
  element.innerHTML = '';

  for (let i = startIndex; i < endIndex; i++) {
    const character = characters[i];
    const cardBlock = createCardBlock(character);
    element.appendChild(cardBlock);
  }
}

function* fetchCharacters() {
  characters = [];

  let page = 1;
  let url = `${URL_CHARACTERS}${2}`;

  while (url) {
    const response = yield fetch(url);
    const data = yield response.json();
    characters = characters.concat(data.results);
    url = data.next;
    console.log('data', data);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  characterInfoElement1 = document.getElementById('character-info-1');
  characterInfoElement2 = document.getElementById('character-info-2');
  characterInfoElement3 = document.getElementById('character-info-3');

  const charactersGenerator = fetchCharacters();
  let charactersResponse = charactersGenerator.next();

  function handleResponse(response) {
    if (!response.done) {
      response.value.then(data => {
        charactersResponse = charactersGenerator.next(data);
        handleResponse(charactersResponse);
      });
    } else {
      document.getElementById('show-characters-1').addEventListener('mouseover', () => {
        showCharacters(0, 5, characterInfoElement1);
      });

      document.getElementById('show-characters-2').addEventListener('mouseover', () => {
        showCharacters(6, 11, characterInfoElement2);
      });

      document.getElementById('show-characters-3').addEventListener('mouseover', () => {
        showCharacters(12, 17, characterInfoElement3);
      });
    }
  }

  handleResponse(charactersResponse);
});
