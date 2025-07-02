const {Router} = require('express');


const { StudentController } = require('./students/v1/controllers/StudentController');
const { CompaniesController } = require('./companies/v1/controllers/CompaniesController');

class RouterManage{
    constructor(){
        this.router = Router()
        this.controllers()
    }

    controllers(){

        this.router.use('/api/v1/students', new StudentController().routes())
        this.router.use('/api/v1/companies', new CompaniesController().routes())

    }
}
const routerManage = new RouterManage().router 

module.exports = routerManage; 