const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/pokemon/random", async (request,response) => {
    response.send("Hello from 1");
});

app.get("/pokemon/random2", async (req,res) => {
    // database retrieve
    res.send("Hello from 2");
});

app.post("/pokemon", async (req,res) => {
    console.log(req.body);
    // database insert
    res.send("Pokemon added");
});


app.listen(9000, () => {
    console.log("The application is running on localhost:9000");
});