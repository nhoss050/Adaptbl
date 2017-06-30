"use strict";
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '/.env')});

const PORT        = process.env.PORT || 4000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();
const Yelp        = require('yelp-fusion-v3');
const _           = require('lodash');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let yelp = new Yelp({
  client_id: process.env.client_id,
  client_secret: process.env.client_secret
})

yelp.getToken();

app.get('/yelp', (req, res) => {
console.log(req.query);

let query = {term: req.query.term, location: req.query.city, limit: 15};
yelp.getBusinesses(query)
  .then( data => {
    return JSON.parse(data)
  })
  .then (name => {
    let object = _.find(name.businesses, obj => {
      if (_.includes(req.query.term, obj.name)){
        return obj.name;
      }
    });
    console.log(object)
    res.json(name)
  })

  .catch(e => {
    res.json(e)
  })
})


// Mount all resource routes
app.use("/users", usersRoutes(knex));


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
