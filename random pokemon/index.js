const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt")
// import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
const app = express();

app.use(cors());
app.use(express.json());



app.get("/", async (req,res,next) => {
  const id = Math.floor(Math.random() * 50) + 1;
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  res.json(await pokemon.json());
} );



/*
var megaPublisher = mqtt.connect("mqtt://broker.hivemq.com")
var subscriber;



async function getPokemon() {
  
  return new Promise((resolve, reject) => {
      subscriber.on('message', function(topic, message) {
          // console.log("msg: " + message.toString())
          return resolve(JSON.parse(message));
      });
  });

}

connectToMqtt = () => {
  subscriber = mqtt.connect("mqtt://broker.hivemq.com")
  subscriber.subscribe("pokemon");
}

disconnectFromMqtt = () => {
  subscriber.unsubscribe("pokemon");
  subscriber.end();
}

app.get("/", async (req,res,next) => {
 
  connectToMqtt();
  const pokemon = await getPokemon();
  disconnectFromMqtt();
  console.log(pokemon.name);
  res.json(pokemon);
} );



app.get("/mega", async (req,res,next) => {

  connectToMqtt();
  const pokemon = await getPokemon();
  disconnectFromMqtt();
  console.log(pokemon.name);

  const mega = {"pokemon":pokemon};
  megaPublisher.publish("mega",JSON.stringify(mega));
  res.send(`You ${pokemon.name} is Mega Evolving`);
} );



app.get("/*", async (req,res,next) => {
    const pokemon = {"poke":"mon"};//await getPokemon();
    res.json(pokemon);
} );
*/
app.listen(8001, () => {
  console.log("Gateway is Listening to Port 8001");
});


