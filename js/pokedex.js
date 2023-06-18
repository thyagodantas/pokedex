const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');


let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }


}

const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Carregando...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonImage.style.display = 'block';
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = 'Não encontrado :c';
        pokemonImage.style.display = 'none';
    } 
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
})

prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon.toString());
    }
})

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon.toString());
})


renderPokemon(searchPokemon.toString());