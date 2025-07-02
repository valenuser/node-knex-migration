const express = require('express');
const {Router} = require('express'); 

class StudentController{

  constructor() {
    this.router = Router()

    this.routes()

  }

  routes() {

    this.router.get('/', (req, res) => {
      res.send('Hello students');
    });

    return this.router;
  }
}

module.exports = { StudentController };