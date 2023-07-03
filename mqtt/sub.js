const mqtt = require("mqtt")

var client = mqtt.connect("mqtt://broker.hivemq.com")
// var client = mqtt.connect("mqtt://127.0.0.1:1883")

client.on('connect', function() {
    client.subscribe("attendance-data")
    console.log("client has subscribed!")
})

client.on('message', function(topic, message) {
    console.log("msg: " + message.toString())

})