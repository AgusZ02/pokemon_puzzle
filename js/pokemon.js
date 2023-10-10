class Pokemon {
  static keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };
  static activePokemon = null;

  constructor(name, sprite) {
    this.name = name;
    this.sprite = sprite;
    this.element = this.createElement();
    this.addEventListeners();
  }

  createElement() {
    const img = document.createElement("img");
    img.src = this.sprite;
    img.style.position = "absolute";
    img.style.top = (Math.random() * 200) + "px";
    img.style.left = (Math.random() * 200) + "px";
    document.body.appendChild(img);
    return img;
  }

  addEventListeners() {
    this.element.addEventListener('click', () => {
      Pokemon.activePokemon = this;
      console.log("activo: " + Pokemon.activePokemon.name);
    });
  }

  move(step) {
    let top = parseInt(this.element.style.top);
    let left = parseInt(this.element.style.left);
    
    if (Pokemon.keys.ArrowUp) this.element.style.top = top-step+"px";
    if (Pokemon.keys.ArrowDown) this.element.style.top = top+step+"px";
    if (Pokemon.keys.ArrowLeft) this.element.style.left = left-step+"px";
    if (Pokemon.keys.ArrowRight) this.element.style.left = left+step+"px";
  }
} // end of Pokemon class


document.addEventListener('keydown', function (event) {
  console.log(event);
  Pokemon.keys[event.key] = true;

});
document.addEventListener('keyup', function (event) {
  console.log(event);
  Pokemon.keys["ArrowRight"] = Pokemon.keys["ArrowLeft"] = Pokemon.keys["ArrowDown"] = Pokemon.keys["ArrowUp"] = false;

});


function moveActivePokemon() {
  const step = 5;
  
  if (Pokemon.activePokemon) {
      Pokemon.activePokemon.move(step);
  }
}

setInterval(moveActivePokemon, 10);

// Instantiate Pokémon
const pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff'];


pokemonNames.forEach(name => {
  fetch("https://pokeapi.co/api/v2/pokemon/"+name).then(r=>r.json()).then(pokemon => new Pokemon(name, pokemon.sprites.front_default))
  //Solicita al servidor externo la imagen del pokemon correspondiente y genera el pokemon
});
