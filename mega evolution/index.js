const mqtt = require("mqtt")

var client = mqtt.connect("mqtt://broker.hivemq.com")
// var client = mqtt.connect("mqtt://127.0.0.1:1883")

client.on('connect', function() {
    client.subscribe("mega")
    console.log("client has subscribed!")
})

client.on('message', function(topic, message) {
  //  console.log("msg: " + message.toString())
    const msg = JSON.parse(message);
    const pokemon = msg.pokemon;
    pokemon.name = "Mega "+pokemon.name;
    console.log("Congratulations! your pokemon has evolved into "+pokemon.name);

})