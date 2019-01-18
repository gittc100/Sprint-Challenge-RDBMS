// import requirements
const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
// create server instance
const server = express();
server.use(express.json());
const db = knex(knexConfig.development);
// Middleware
// const morgan = require("morgan");
// const helmet = require("helmet");
// const cors = require("cors");
//Helper Functions
const serverError = res => err => {
  res.status(500).json(err);
};
const getSuccess = res => data => {
  res.status(200).json(data);
};
const postSuccess = res => id => {
  res.status(201).json(id);
};
//Routing
server.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});
// Retrieve all Projects
server.get("/api/projects", (req, res) => {
  db("projects")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(serverError(res));
});
// Retrieve project by id with associated actions
server.get("/api/projects/:project_id", (req, res) => {
  db
  .select(
    "p.id as Project_ID",
    "p.name as Project_Name",
    "p.description as Project_Description",
    "p.completed as Project_Completed",
    "p.actions as Actions:",

  )
    .from("projects as p").where({ "p.id": req.params.project_id })
    .innerJoin("actions as a", function() {
      this.on({ "a.project_id": "p.id" });
    })
    

    .then(data => {
      if (data.length > 0) {
        console.log(data[0].Project_ID);
        res.status(201).json(data);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(serverError(res));
});
// post project
server.post("/api/projects", (req, res) => {
  const { name, description, completed } = req.body;
  if (!(name || description || completed)) {
    res.status(500).json({ Error_Message: "Provide Name" });
  } else {
    db("projects")
      .insert(req.body)
      .then(postSuccess(res))
      .catch(serverError(res));
  }
});

// post action
server.post("/api/actions", (req, res) => {
  const { notes, description, completed, project_id } = req.body;
  if (!(notes || description || completed || project_id)) {
    res.status(500).json({ Error_Message: "Provide Name" });
  } else {
    db("actions")
      .insert(req.body)
      .then(postSuccess(res))
      .catch(serverError(res));
  }
});

// export server for index.js use
module.exports = server;

// "a.id as Action_ID",
//     "a.description as Action_Description",
//     "a.notes as Action_Notes",
//     "a.completed as Action_Completed"
// .onIn("p.actions", ["a.id"])
// .column(['a.notes', 'a.description', 'a.completed'])
    // .where({ "p.actions": "a.notes" })
    // .options({ nestTables: true, rowMode: "array" })