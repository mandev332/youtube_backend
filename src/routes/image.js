const router = require("express").Router();
const imageController = require("../controllers/image.js");

router
  .route("/")
  .get(imageController.GET)
  .put(imageController.PUT)
  .delete(imageController.DELETE);

module.exports = router;
