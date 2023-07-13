    const URL_BASE = 'https://swapi.dev/';
    const URL_CHARACTERS = URL_BASE + 'api/people/';
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
    
    async function fetchCharacters() {
      const response = await fetch(URL_CHARACTERS);
      const data = await response.json();
      characters = data.results;
      
      characters.forEach((character, index) => {
        if (index < 5) {
          characterInfoElement1.appendChild(createCharacterBlock(character));
        } else if (index < 10) {
          characterInfoElement2.appendChild(createCharacterBlock(character));
        } else {
          characterInfoElement3.appendChild(createCharacterBlock(character));
        }
      });
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      characterInfoElement1 = document.getElementById('character-info-1');
      characterInfoElement2 = document.getElementById('character-info-2');
      characterInfoElement3 = document.getElementById('character-info-3');
      
      fetchCharacters();
    });
