// Função para buscar a lista de Pokémon disponíveis
function fetchPokemonList() {
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000'; // Limitando a 1000 para exemplo
  
    fetch(apiUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Não foi possível obter a lista de Pokémon');
        }
        return response.json();
      })
      .then(function(data) {
        populatePokemonSelects(data.results);
      })
      .catch(function(error) {
        alert(error.message);
      });
  }
  
  // Função para preencher os selects com as opções de Pokémon
  function populatePokemonSelects(pokemonList) {
    var select1 = document.getElementById('pokemon-select-1');
    var select2 = document.getElementById('pokemon-select-2');
  
    pokemonList.forEach(function(pokemon) {
      var option1 = document.createElement('option');
      var option2 = document.createElement('option');
  
      option1.value = pokemon.url;
      option1.textContent = pokemon.name;
  
      option2.value = pokemon.url;
      option2.textContent = pokemon.name;
  
      select1.appendChild(option1);
      select2.appendChild(option2);
    });
  }
  
  // Função para buscar dados do Pokémon na PokeAPI
  function getPokemon(pokemonUrl) {
    return fetch(pokemonUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Não foi possível encontrar o Pokémon');
        }
        return response.json();
      });
  }
  
  // Função para realizar a batalha entre dois Pokémons selecionados
  function battle() {
    var select1 = document.getElementById('pokemon-select-1');
    var select2 = document.getElementById('pokemon-select-2');
    var pokemonUrl1 = select1.value;
    var pokemonUrl2 = select2.value;
  
    if (pokemonUrl1 === '' || pokemonUrl2 === '') {
      alert('Por favor, selecione ambos os Pokémons');
      return;
    }
  
    var pokemon1 = getPokemon(pokemonUrl1);
    var pokemon2 = getPokemon(pokemonUrl2);
  
    Promise.all([pokemon1, pokemon2])
      .then(function(values) {
        var pokemonData1 = values[0];
        var pokemonData2 = values[1];
  
        var battleResult = determineBattleResult(pokemonData1, pokemonData2);
        displayBattleResult(battleResult, pokemonData1, pokemonData2);
      })
      .catch(function(error) {
        alert(error.message);
      });
  }
  
  // Função para determinar o resultado da batalha
  function determineBattleResult(pokemonData1, pokemonData2) {
    // Implemente a lógica de batalha aqui
    // Você pode comparar os atributos dos Pokémons, como força, defesa, pontos de vida, etc.
    // Retorne o resultado da batalha com base na sua lógica
  
    // Exemplo simples: O Pokémon com maior peso vence
    if (pokemonData1.weight > pokemonData2.weight) {
      return `${pokemonData1.name.toUpperCase()} vence a batalha!`;
    } else if (pokemonData1.weight < pokemonData2.weight) {
      return `${pokemonData2.name.toUpperCase()} vence a batalha!`;
    } else {
      return 'A batalha termina em empate!';
    }
  }
  
  // Função para exibir o resultado da batalha
  function displayBattleResult(result, pokemonData1, pokemonData2) {
    var pokemonDetails1 = document.getElementById('pokemon-details-1');
    var pokemonDetails2 = document.getElementById('pokemon-details-2');
    var battleResultElement = document.getElementById('battle-result');
  
    pokemonDetails1.innerHTML = `
      <h2>${pokemonData1.name.toUpperCase()}</h2>
      <img src="${pokemonData1.sprites.front_default}" alt="${pokemonData1.name}">
      <p><strong>Height:</strong> ${pokemonData1.height}</p>
      <p><strong>Weight:</strong> ${pokemonData1.weight}</p>
    `;
  
    pokemonDetails2.innerHTML = `
      <h2>${pokemonData2.name.toUpperCase()}</h2>
      <img src="${pokemonData2.sprites.front_default}" alt="${pokemonData2.name}">
      <p><strong>Height:</strong> ${pokemonData2.height}</p>
      <p><strong>Weight:</strong> ${pokemonData2.weight}</p>
    `;
  
    battleResultElement.textContent = result;
  }
  
  // Chamada inicial para obter a lista de Pokémon
  fetchPokemonList();

  function toggleDarkMode() {
    var body = document.querySelector('body');
    body.classList.toggle('dark-mode');
  }
  
  document.addEventListener('keydown', function(event) {
  if (event.key === 'd' || event.key === 'D') {
    toggleDarkMode();
  }
});