// import requirements
const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");
// create server instance
const server = express();
server.use(express.json());
const db = knex(knexConfig.development);
// Middleware
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
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
// Retrieve all Projects
server.get("/api/projects", (res, req) => {
  db("projects")
    .then(getSuccess(res))
    .catch(serverError(res));
});
// Retrieve project by id with associated actions
server.get("/api/projects/:project_id", (res, req) => {
  db.select(
    "p.id",
    "p.name",
    "p.description",
    "p.completed",
    "a.id",
    "a.description",
    "a.notes",
    "a.completed"
  )
    .from("projects as p")
    .innerJoin("actions as a", "a.project_id", "=", "p.id")
    .where({ "p.id": req.params.id })
    .then(data => {
      if (data.length > 0) {
        getSuccess(res);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(serverError(res));
});
// post project
server.post("/api/projects", (req, res) => {
    const {id, name, description, completed} = req.body;
    if (!(id, name, description, completed)) {
        res.status(500).json({ Error_Message: "Provide Name" });
      } else {
        db('projects')
          .insert(req.body)
          .then(postSuccess(res))
          .catch(serverError(res));
      }
});

// post action
server.post("/api/actions", (req, res) => {
    const {id, notes, description, completed, project_id} = req.body;
    if (!(id, notes, description, completed, project_id)) {
        res.status(500).json({ Error_Message: "Provide Name" });
      } else {
        db('actions')
          .insert(req.body)
          .then(postSuccess(res))
          .catch(serverError(res));
      }
});

// export server for index.js use
module.exports = server;
