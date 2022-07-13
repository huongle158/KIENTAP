const express = require("express");
const router = express.Router();

var controller = require("../controllers/email.controller");

router.get("/:idUser/:idEmail", controller.index);
router.get("/", controller.list); //get all
router.get("/:id", controller.info); // get by id
router.post("/", controller.postEmail); //subscribe
router.post("/update/:id", controller.updateEmail); // edit
router.post("/delete/:id", controller.deleteSubscriber); // delete

module.exports = router;