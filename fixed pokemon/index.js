const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt")

const app = express();

app.use(cors());
app.use(express.json());

// var subscriber = mqtt.connect("mqtt://broker.hivemq.com")






app.get("/id/:id", async (req,res,next) => {
    let { id } = req.params;
   /* const pokemon = await fetch(`http://localhost:8001/pokemon/random`);
    const pokemonData = await pokemon.json();
    res.json(pokemonData);
    return;*/
    subscriber = mqtt.connect("mqtt://broker.hivemq.com")
    subscriber.subscribe("pokemon");
 
    console.log("hello",id);
    id= parseInt(id);
    let i =0;
    subscriber.on('message', function(topic, message) {
      // console.log("msg: " + message.toString())
      const pokemon = JSON.parse(message);
      i = i+1;
      console.log(pokemon.name,pokemon.id,i);
      
      if( pokemon.id === id ) {
        subscriber.unsubscribe("pokemon");
        subscriber.end();
        res.json(pokemon);
        return;
      }else if( i === 10 ){
        subscriber.unsubscribe("pokemon");
        subscriber.end();
        res.status(404).json({message:"Pokemon not found"} );
        return;
      }else if(i>10){
        // subscriber.unsubscribe("pokemon");
        return;
      }
     
   });
   
   
    
} );

app.get("/name/:name", async (req,res,next) => {
  
  const name = req.params.name;
 /* const pokemon = await fetch(`http://localhost:8001/pokemon/random`);
    const pokemonData = await pokemon.json();
    res.json(pokemonData);
    return;*/
    subscriber = mqtt.connect("mqtt://broker.hivemq.com")
    subscriber.subscribe("pokemon");
 
    console.log("hello",name);
  
    let i = 0;
    subscriber.on('message', function(topic, message) {
      // console.log("msg: " + message.toString())
      const pokemon = JSON.parse(message);
      i = i+1;
      console.log(pokemon.name,pokemon.id,i);
      
      if( pokemon.name === name ) {
        subscriber.unsubscribe("pokemon");
        subscriber.end();
        res.json(pokemon);
        return;
      }else if( i === 10 ){
        subscriber.unsubscribe("pokemon");
        subscriber.end();
        res.status(404).json({message:"Pokemon not found"} );
        return;
      }else if(i>10){
        // subscriber.unsubscribe("pokemon");
        return;
      }
     
   });

} );
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

app.listen(8002, () => {
  console.log("Gateway is Listening to Port 8002");
});
