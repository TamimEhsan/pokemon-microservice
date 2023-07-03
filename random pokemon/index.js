const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt")
// import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
const app = express();

app.use(cors());
app.use(express.json());


var megaPublisher = mqtt.connect("mqtt://broker.hivemq.com")
var subscriber;

// export const resMap = new Map();

function simpleStringify (object){
  // stringify an object, avoiding circular structures
  // https://stackoverflow.com/a/31557814
  var simpleObject = {};
  for (var prop in object ){
      if (!object.hasOwnProperty(prop)){
          continue;
      }
      if (typeof(object[prop]) == 'object'){
          continue;
      }
      if (typeof(object[prop]) == 'function'){
          simpleObject[prop] = object[prop];
      }
      
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

const replacerFunc = () => {
  const visited = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
};

async function getPokemon() {
  
  return new Promise((resolve, reject) => {
      subscriber.on('message', function(topic, message) {
          // console.log("msg: " + message.toString())
          return resolve(JSON.parse(message));
      });
  });

}

app.get("/", async (req,res,next) => {
  console.log("hello");
  subscriber = mqtt.connect("mqtt://broker.hivemq.com")
  subscriber.subscribe("pokemon");
  const pokemon = await getPokemon();
  subscriber.unsubscribe("pokemon");
  subscriber.end();
  console.log(pokemon.name);
  res.json(pokemon);
} );

// app.get("/mega", async (req,res,next) => {

//   subscriber = mqtt.connect("mqtt://broker.hivemq.com")
//   subscriber.subscribe("pokemon");
//   const pokemon = await getPokemon();
//   subscriber.unsubscribe("pokemon");
//   subscriber.end();
//   console.log(pokemon.name);
//   // const token = uuidv4();
//   // resMap.set(token,res);
//   const mega = {"pokemon":pokemon,res:res.send};
//   megaPublisher.publish("mega",JSON.stringify(mega, replacerFunc()));
  
  
// } );



app.get("/*", async (req,res,next) => {

  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl+req.fullUrl;
  console.log(fullUrl);
  console.log("helloo");
    const pokemon = {"poke":"mon"};//await getPokemon();
    console.log(pokemon.name);
    // subscriber.unsubscribe("pokemon");
    // const pokemonData = await pokemon.json();
    // console.log(pokemonData);
    res.json(pokemon);
} );

app.listen(8001, () => {
  console.log("Gateway is Listening to Port 8001");
});


