const mqtt = require("mqtt")

var client1 = mqtt.connect("mqtt://broker.hivemq.com")
var client2 = mqtt.connect("mqtt://broker.hivemq.com")

// var client = mqtt.connect("mqtt://127.0.0.1:1883")

client1.on('connect', function() {
    client1.subscribe("mega")
    console.log("client1 has subscribed!")
})

client1.on('message', function(topic, message) {
  //  console.log("msg: " + message.toString())
    const msg = JSON.parse(message);
    const pokemon = msg.pokemon;
    pokemon.name = "Mega "+pokemon.name;
    console.log("Congratulations! your pokemon has evolved into "+pokemon.name);

})

client2.on('connect', function() {
  client2.subscribe("mega")
  console.log("client1 has subscribed!")
})

client2.on('message', function(topic, message) {
  //  console.log("msg: " + message.toString())
    const msg = JSON.parse(message);
    const pokemon = msg.pokemon;
    pokemon.name = "Gigantamax "+pokemon.name;
    console.log("Congratulations! your pokemon has evolved into "+pokemon.name);

})