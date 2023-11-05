// var generateName = require("sillyname");
import generateName from "sillyname";
var sillyname = generateName();
console.log(`The random name generated is ${sillyname}`);

import superheroes from "superheroes";
var superheroName = superheroes.random();
console.log(`I am ${superheroName}`);
