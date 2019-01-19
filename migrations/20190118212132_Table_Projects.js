exports.up = function(knex, Promise) {
    return knex.schema.createTable("projects", tbl => {
      tbl.increments();
      tbl.text("name", 50).notNullable();
      tbl.text("description", 255).notNullable();
      tbl.boolean("completed").notNullable();
      tbl.unique("name");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('projects');
  };
