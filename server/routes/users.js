"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/likes", (req, res) => {

    console.log(req.body)

    knex('likes').select('*').where({name: req.body.name}).limit(1)
    .then(([restaurant]) =>{
      if(restaurant) {

        console.log("restaurant exist")

        return knex('likes').update( 'like', (restaurant.like)+1).where('name', req.body.name)
        .then((results) => {
          return knex('likes').select('*').orderByRaw('like').limit(10)
        })
        .then(([likes]) => {
          res.json(likes);
        })

      } else {

        console.log("restaurant doesnt exist")

        let data = {
          name: req.body.name,
          like: 1
        }
        return knex('likes').insert(data).returning('like')
        .then(([likes]) => {
          return knex('likes').select('*').orderByRaw('like').limit(10)
        })
        .then(([table]) => {
          res.json(table);
        })
      }
    })

  });


  return router;
}
