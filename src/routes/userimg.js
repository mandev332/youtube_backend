const router = require("express").Router();
const userimgController = require("../controllers/userimg.js");

router.route("/").get(userimgController.GET);

module.exports = router;
