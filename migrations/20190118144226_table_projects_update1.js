exports.up = function(knex, Promise) {
    return knex.schema.table("projects", tbl => {
        tbl.specificType('intarray', 'actions');
    });
  };
  
  exports.down = function(knex, Promise) {
    knex.schema.table.dropColumn('actions');
  };
