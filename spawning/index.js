const mqtt = require("mqtt")
var publisher = mqtt.connect("mqtt://broker.hivemq.com")

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


publisher.on('connect',async function() {
      while (true) {
        const id = getRandomInt(10)+1;
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await pokemon.json();
        console.log(pokemonData.name);
        publisher.publish("pokemon", JSON.stringify(pokemonData));
        await sleep(1000);
      }
});