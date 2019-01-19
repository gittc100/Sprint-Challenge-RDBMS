// reference location
// const express = require("express");
const server = require('./api/server');
// server.use(express.json());
// initialize server location 5000
const port = 5400;
server.listen(port, ()=>{
    console.log(`server running on port: ${port}`);
});