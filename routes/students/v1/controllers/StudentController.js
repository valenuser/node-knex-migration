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

    this.router.get('/', async (req, res,next) => {

      try{

        const users = await this.services.getAllStudents()

        res.status(200).json(users);

      }catch(err){

        next(err)

      }
    });

    this.router.get('/:id',async(req,res,next)=>{

      try{
        
        const id  = Number(req.params.id)
        
        if(isNaN(id)){

          res.status(404).json({message:'El id debe ser un numero valido'})

        }

        const student = await this.services.getStudentById(id)

        res.status(200).json(student)

      }catch(err){

        next(err)
      }

    })


    this.router.post('/save',async(req,res,next)=>{

      try{
        //se deberia usar express-validator o zod para la verificacion de datos pero son ejemplos de prueba
        const data_student = req.body

        const new_student = await this.services.createStudent(data_student)

        res.status(201).json(new_student)

      }catch(err){

        next(err)

      }

    })

    return this.router;
  }
}

module.exports = { StudentController };