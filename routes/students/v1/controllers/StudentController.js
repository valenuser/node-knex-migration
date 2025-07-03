const express = require('express');
const {Router} = require('express'); 
const {StudentService} = require('../services/StudentService')
const {StudentRepository} = require('../repositories/StudentRepository')
class StudentController{

  constructor() {
    this.router = Router()
    this.services = new StudentService()
    this.routes()

  }

  routes() {

    this.router.get('/', async (req, res) => {

      try{

        const users = await this.services.getAllStudents()

        res.status(200).json(users);

      }catch(error){

        res.status(500).send({message:'Error interno del servidor'})

      }
    });

    this.router.get('/:id',async(req,res)=>{

      try{
        
        const id  = Number(req.params.id)
        
        if(isNaN(id)){

          res.status(404).json({message:'El id debe ser un numero valido'})

        }

        const student = await this.services.getStudentById(id)

        res.status(200).json(student)

      }catch(err){

        res.status(404).json({message:err.message})
      }

    })

    return this.router;
  }
}

module.exports = { StudentController };