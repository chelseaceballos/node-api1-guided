// IMPORTS AT THE TOP
const express = require('express') // import express from 'express' // ES6
const Dog = require('./dog-model.js')
// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json()) // this teaches express to read JSON from reqs

// ENDPOINTS

// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get('/api/dogs', (req, res) => {
  Dog.findAll()
  .then(dogs => {
      res.status(200).json(dogs)
  })
  .catch(err => {
      res.status(500).json({message: err.message})
  })    
})
// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', (req, res) => {
//gather info from the req object
const { id } = req.params
Dog.findById(id)
.then(dog => {
    //the id may have not existed in the DB
    if (!dog) {
        res.status(404).json({message: `Dog ${id} not found`})
    } else {
        // Happy Response :) 
        res.status(200).json(dog)
    }
})
.catch(err => {
    res.status(500).json({message: err.message})
    })  
})

// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', (req, res) => {
  const { name, weight } = req.body
  Dog.create({ name, weight })
  .then( dog => {
      res.status(201).json(dog)
  })
  .catch(err => {
    res.status(500).json({message: err.message})
}) 
})


// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', (req, res) => {
    const { id } = req.params
    const { name, weight } = req.body
   Dog.update(id, { name, weight })
   .then(updatedDog => {
       res.json(updatedDog)
       if(!updatedDog) {
           res.status(404).json({message: "not found!"})    
       } else {
           res.json(updatedDog) //defaults to status 200
       }
   })
   .catch(err => {
    res.status(500).json({message: err.message})
})

//   res.json({ message: 'update existing dog working!' })
})


// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', (req, res) => {
    const { id } = req.params
    console.log(`about to delete ${id}`);
    // in the project you will have to getbyID the dog before proceeding with the deletion of the dog
    Dog.delete(id)
    .then(deleted => {
        if(!deleted) {
            res.status(404).json({message: 'not found!'})
        } else {
            res.json(deleted)
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })

//   res.json({ message: `deleted dog with id ${req.params.id}` })
})
// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server // export default server // ES6
