const URL_BASE = 'https://swapi.dev/';
const URL_CHARACTERS = URL_BASE + 'api/people/?page=';
let characterInfoElement1, characterInfoElement2, characterInfoElement3;
let characters = [];

function createCharacterBlock(character) {
  const characterBlock = document.createElement('div');
  characterBlock.classList.add('character-block');

  const nameElement = document.createElement('h3');
  nameElement.textContent = character.name;
  characterBlock.appendChild(nameElement);

  const heightElement = document.createElement('p');
  heightElement.textContent = `Height: ${character.height} cm`;
  characterBlock.appendChild(heightElement);

  const weightElement = document.createElement('p');
  weightElement.textContent = `Weight: ${character.mass} kg`;
  characterBlock.appendChild(weightElement);

  return characterBlock;
}

function showCharacters(startIndex, endIndex, element) {
  element.innerHTML = '';

  for (let i = startIndex; i < endIndex; i++) {
    const character = characters[i];
    const characterBlock = createCharacterBlock(character);
    element.appendChild(characterBlock);
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
      document.getElementById('show-characters-1').addEventListener('click', () => {
        showCharacters(0, 5, characterInfoElement1);
      });

      document.getElementById('show-characters-2').addEventListener('click', () => {
        showCharacters(6, 11, characterInfoElement2);
      });

      document.getElementById('show-characters-3').addEventListener('click', () => {
        showCharacters(12, 17, characterInfoElement3);
      });
    }
  }

  handleResponse(charactersResponse);
});
