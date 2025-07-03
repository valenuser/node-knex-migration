
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('students',(table)=>{
        table.increments('id').primary()
        table.string('email').notNullable().unique()
        table.string('name').notNullable()
        table.string('password').notNullable()
        table.timestamp(true,true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('students')
  
};
