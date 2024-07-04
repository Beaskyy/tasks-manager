const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.json({
    name: "Wash the dishes",
    completed: true,
  });
});

module.exports = router;
