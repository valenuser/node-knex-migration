
exports.up = function(knex) {

    return knex.schema
    //tabla de students
    .createTable('students',(table)=>{
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').unique().notNullable()
        table.timestamps(true,true)
    })
    //tabla de teachers
    .then(()=>{
        return knex.schema.createTable('teachers',(table)=>{
            table.increments('id').primary()
            table.string('name').notNullable()
            table.string('email').unique().notNullable()
            table.timestamps(true,true)
        })
    })
    //tabla de teachers
    .then(()=>{
        return knex.schema.createTable('courses',(table)=>{
            table.increments('id').primary()
            table.string('title').notNullable()
            table.text('description')
            table.timestamps(true,true)
        })
    })
    //tabla de enrollments
    .then(()=>{
        return knex.schema.createTable('enrollments',(table)=>{
            table.increments('id').primary()
            table.integer('students_id').unsigned().notNullable().references('id').inTable('students').onDelete('CASCADE')
            table.integer('courses_id').unsigned().notNullable().references('id').inTable('courses').onDelete('CASCADE')
            table.timestamp('enrolled_at').defaultTo(knex.fn.now())
            table.unique(['students_id','courses_id'])
        })
    })
    //tabla de teachers_courses
    .then(()=>{
        return knex.schema.createTable('courses_teachers',(table)=>{
            table.increments('id').primary()
            table.integer('courses_id').unsigned().notNullable().references('id').inTable('courses').onDelete('CASCADE')
            table.integer('teachers_id').unsigned().notNullable().references('id').inTable('teachers').onDelete('CASCADE')
            table.unique(['courses_id','teachers_id'])
        })
    })

};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('courses_teachers')
    .then(()=>{ knex.schema.dropTableIfExists('enrollments')})
    .then(()=>{ knex.schema.dropTableIfExists('courses')})
    .then(()=>{ knex.schema.dropTableIfExists('teachers')})
    .then(()=>{ knex.schema.dropTableIfExists('students')})
};
