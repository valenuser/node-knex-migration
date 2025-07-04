const AppError = require('../../../../config/handler_error/AppError')
const db = require('../../../../db/knex')


class StudentRepository{
    constructor(){
        this.db = db
        
    }

    async getAllStudents(){
        return  await this.db('students').select('*')

    }

    async getStudentById(id){
        
        return await this.db('students').where({id}).first()

    }

    async createStudent(data){
        try{

            const [id_student] =  await this.db('students').insert(data)
            
            const [new_student] = await this.db('students').where('id',id_student)

            return new_student
        }catch(err){

            throw new AppError('Error al guardar los datos del estudiante',404)

        }

    }
}

module.exports = {StudentRepository}