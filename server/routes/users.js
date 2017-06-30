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

  router.get("/likes", (req, res) => {

    knex('likes').select('*').where({name: req.body.name}).limit(1)
    .then(([restaurant]) =>{
      if(restaurant) {

        return knex('likes').update( 'like', (restaurant.like)+1).where('name', req.body.name)
        .then((results) => {
          return knex('likes').select('like').where({name: req.body.name}).limit(1)
        })
        .then(([likes]) => {
          res.json(likes);
        })

      } else {

        let data = {
          name: req.body.name,
          like: 1
        }
        return knex('likes').insert(data).returning('like')
        .then(([likes]) => {
          res.json(likes);
        })
      }
    })

  });


  return router;
}
