const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt")

const app = express();

app.use(cors());
app.use(express.json());

// var subscriber = mqtt.connect("mqtt://broker.hivemq.com")




app.get("/id/:id", async (req,res,next) => {
  let { id } = req.params;
  id = parseInt(id);
  console.log(id);
  for(let i=0;i<50;i++){
    let pokemon = await fetch(`http://localhost:8000/pokemon/random`);
    
    pokemon = await pokemon.json()
    console.log(pokemon.name,pokemon.id);
    if( pokemon.id === id ) {
      pokemon.attempt = i+1;
      res.json(pokemon);
      return;
    }
  }
 
  res.send("Pokemon not found");
  
} );

app.get("/name/:name", async (req,res,next) => {
  let { name } = req.params;
  
  console.log(name);
  for(let i=0;i<50;i++){
    let pokemon = await fetch(`http://localhost:8000/pokemon/random`);
    
    pokemon = await pokemon.json()
    console.log(pokemon.name,pokemon.id);
    if( pokemon.name === name ) {
      pokemon.attempt = i+1;
      res.json(pokemon);
      return;
    }
  }
 
  res.send("Pokemon not found");
  
} );


/*
connectToMqtt = () => {
  subscriber = mqtt.connect("mqtt://broker.hivemq.com")
  subscriber.subscribe("pokemon");
}

disconnectFromMqtt = () => {
  subscriber.unsubscribe("pokemon");
  subscriber.end();
}



app.get("/id/:id", async (req,res,next) => {
    let { id } = req.params;
    id = parseInt(id);

    connectToMqtt();

    let i = 0;
    subscriber.on('message', function(topic, message) {
      // console.log("msg: " + message.toString())
      const pokemon = JSON.parse(message);
      i = i + 1;
      console.log(pokemon.name,pokemon.id,i);
      
      if( pokemon.id === id ) {
        disconnectFromMqtt();
        res.json(pokemon);
        return;
      }else if( i === 10 ){
        disconnectFromMqtt();
        res.status(404).json({message:"Pokemon not found"} );
        return;
      }else if(i > 10){
        return;
      }
     
   });
   
   
    
} );



app.get("/name/:name", async (req,res,next) => {
  
  const name = req.params.name;
  connectToMqtt();
 
   
  let i = 0;
  subscriber.on('message', function(topic, message) {
    // console.log("msg: " + message.toString())
    const pokemon = JSON.parse(message);
    i = i+1;
    console.log(pokemon.name,pokemon.id,i);
    
    if( pokemon.name === name ) {
      disconnectFromMqtt();
      res.json(pokemon);
      return;
    }else if( i === 10 ){
      disconnectFromMqtt();
      res.status(404).json({message:"Pokemon not found"} );
      return;
    }else if(i>10){
      // subscriber.unsubscribe("pokemon");
      return;
    }
    
   });

} );
*/
app.get("/*", async (req,res,next) => {

  const pokemon = {"poke":"mon"};//await getPokemon();
  res.json(pokemon);

} );

app.listen(8002, () => {
  console.log("Gateway is Listening to Port 8002");
});
