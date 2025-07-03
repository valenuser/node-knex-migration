const {StudentRepository} = require('../repositories/StudentRepository')

class StudentService {
    constructor(){
        this.repository = new StudentRepository()
    }

    async getAllStudents(){

        return await this.repository.getAllStudents()
            

    }

    async getStudentById(id){



        const student = await this.repository.getStudentById(id)

        if(!student){

            throw new Error('Estudiante no encontrado')

        }

        return student
    }

    async createStudent(data){

        //se deberia usar express-validator o zod para la verificacion de datos pero son ejemplos de prueba
        const student_created = await this.repository.createStudent(data)

        if(!student_created){

            throw new Error('No se ha podido almacenar los datos del estudiante')

        }

        return student_created
    }
}


module.exports = {StudentService}