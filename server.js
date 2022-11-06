import {roll} from "./lib/lib/roll.js";
import express from "express";
import minimist from "minimist";

const app = express()
const args = minimist(process.argv.slice(2));

const port = args.port ? args.port: 5000;

app.get('/app/', (req,res) => {
    res.send("200 OK")
    res.end()
  })

var sides = 6;
var dice = 2;
var rolls = 1;

app.get('/app/roll/', (req,res,next) => {
    res.send(roll(sides, dice, rolls));
    console.log('x');
    res.end();
})
  
app.get('/app/roll/:sides', (req, res, next) => {
    sides = parseInt(req.params.sides);
    res.send(roll(sides, dice, rolls));
    console.log('y');
    res.end();
})

app.get('/app/roll/:sides/:dice/', (req, res, next) => {
    sides = parseInt(req.params.sides);
    dice = parseInt(req.params.dice);
    res.send(roll(sides, dice, rolls));
    console.log('z');
    res.end();
})

app.get('/app/roll/:sides/:dice/:rolls', (req,res,next) => {
    sides = parseInt(req.params.sides);
    dice = parseInt(req.params.dice);
    rolls = parseInt(req.params.rolls);
    res.send(roll(sides, dice, rolls));
    console.log('ss');
    res.end();
})

app.use('/app/roll/', (req,res,next) => {
    sides = req.params.sides? parseInt(req.params.sides): sides;
    dice = req.params.dice? parseInt(req.params.dice): dice;
    rolls = req.params.rolls? parseInt(req.params.rolls): rolls;
    res.send(roll(sides, dice, rolls));
    console.log('q');
    res.end();
})

app.use((req, res, next) => {
	res.status(404).send("404 NOT FOUND");
    res.end()
})

app.listen(port, (err) => {
	console.log("Server port is " + port);
})
