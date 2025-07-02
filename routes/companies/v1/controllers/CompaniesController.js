const express = require('express');
const {Router} = require('express'); // o como tengas la importación

class CompaniesController{

  constructor() {
    this.router = Router()

    this.routes()

  }

  routes() {

    this.router.get('/', (req, res) => {
      res.send('Hello companies');
    });

    return this.router;
  }
}

module.exports = { CompaniesController };
