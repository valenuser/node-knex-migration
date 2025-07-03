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
}

module.exports = {StudentRepository}