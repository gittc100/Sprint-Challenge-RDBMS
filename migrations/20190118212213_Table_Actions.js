exports.up = function(knex, Promise) {
    return knex.schema.createTable("actions", tbl => {
      tbl.increments();
      tbl.text("description", 255).notNullable();
      tbl.text("notes", 255).notNullable();
      tbl.boolean("completed").notNullable();
      tbl
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects").notNullable();
      tbl.unique("description");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('actions');
  };
