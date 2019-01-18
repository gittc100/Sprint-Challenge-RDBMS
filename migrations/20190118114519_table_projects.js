exports.up = function(knex, Promise) {
    return knex.schema.createTable("projects", tbl => {
      tbl.increments();
      tbl.text("name", 50);
      tbl.text("description", 255);
      tbl.boolean("completed");
      tbl.unique("name");
    });
  };
  
  exports.down = function(knex, Promise) {
    knex.schema.dropTable('projects');
  };
