const express = require("express");
const router = express.Router();

// user controller
const {} = require("../controllers/userController");

router
  .route("/")
  .get((req, res, next) => {
    res.send(`<div>Route: "/users/", Method: "GET"</div>`);
  })
  .post((req, res, next) => {
    res.send(`<div>Route: "/users/", Method: "POST"</div>`);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    res.send(
      `<div>Route: "/users/", Method: "GET", Params: ${req.params.id}</div>`
    );
  })
  .patch((req, res, next) => {
    res.send(
      `<div>Route: "/users/", Method: "PATCH", Params: ${req.params.id}</div>`
    );
  })
  .delete((req, res, next) => {
    res.send(
      `<div>Route: "/users/", Method: "DELETE", Params: ${req.params.id}</div>`
    );
  });

module.exports = router;
