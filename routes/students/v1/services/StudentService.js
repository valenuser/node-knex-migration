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
}


module.exports = {StudentService}