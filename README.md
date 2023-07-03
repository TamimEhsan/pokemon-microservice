# Pokemon microservice

<img src="assets/pokemon.jpg" />

This repository is aimed to be a basic for beginners for microservice and serves as the hands on experience for BUET CSE Fest Hackathon workshop for API and Cloud Services. And in no way should be considered as a best practice or as a reference in any kind of evaluation, specially during BUET CSE FEST Hackathon 2023! 

We tried to showcase below features

- [x]  Simple backend with nodejs and express
- [x] Consuming external public apis
- [x] Dividing modules into microservices
- [x] proxy server for api routing
- [ ] jwt authentication  for api call
- [ ] api caching for heavily used routes
- [ ] load balancing
- [ ] rate limiting
- [x] Inter service communication with async requests
- [x] Publishing and consuming from topics using message queues
- [ ] returning tokens to client to checkout heavy loads
- [ ] using docker container



## Services

The project consumes pokemon api to get information about a pokemon. 

`https://pokeapi.co/api/v2/pokemon/1`

**Gateway:** proxy server to reroute requests to respective micro services

**Pokemon Spawning:** A micro service to mimic cron jobs. It will spawn a random pokemon every 1 second and publish it into a mqtt topic

**Random Pokemon:** This microservice will both subcribe and publish an even.t  It will subscribe to pokemon spawning for random pokemon capture. And also will publish into 'mega' channel for a pokemon to be mega/gigantamaxed.

**Specific Pokemon:** It will listen to spawning service for some specific amount of time to look for the specified pokemon. Will return if found else specify not found (The pokemon is very rare!)

**Mega evolution:** This is to mimic chained processing of tasks with multiple microservice. ie at first service A does something with data, then forwards it to B and B processes the data and later forward it to C or save it in database/ return response to user/ mail etc.



## How to start

clone this repository in your local environment first

`git clone https://github.com/TamimEhsan/pokemon-microservice.git`

for each services run

```bash
npm install
npm run dev
```

 inside that folder to install dependency, and then run each module.



## Conclusion

I myself am not that proficient in microservice. If anyone finds any error in implementation please feel free to suggest a change. Pull a request or raise a issue. Any kind of feedback is highly appreciated. Thank you! 







