// IMPORTS AT THE TOP
const express = require('express') // import express from 'express' // ES6

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json()) // this teaches express to read JSON from reqs

// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get()
// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
// [GET] /api/dogs (R of CRUD, fetch all dogs)
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server // export default server // ES6
