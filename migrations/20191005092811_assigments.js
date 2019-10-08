
exports.up = function(knex) {
  return knex.schema.createTable('Assignments', (table) =>{
      table.increments('id')
      table.string('assignment_name')
      table.boolean('isComplete')
      table.integer('studentId')
      table.foreign('studentId').references('Students.id')
      table.integer('cohortId')
      table.foreign('cohortId').references('Cohorts.id')        
  }) 
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE Assignments')
};
