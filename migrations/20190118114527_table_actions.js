exports.up = function(knex, Promise) {
    return knex.schema.createTable("actions", tbl => {
      tbl.increments();
      tbl.text("description", 255);
      tbl.text("notes", 255);
      tbl.boolean("completed");
      tbl
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects");
      tbl.unique("description");
    });
  };
  
  exports.down = function(knex, Promise) {
    knex.schema.dropTable('actions');
  };