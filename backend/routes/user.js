const express = require('express');
const router = express.Router();
const multer = require('multer');

var controller = require("../controllers/user.controller");
var middleware = require("../middlewares/token.middleware")

var upload = multer({ dest: './public/images'})

router.get("/",  middleware.verifyToken, controller.index);
router.get("/list",  controller.list);
router.get("/list/:id",  controller.listId);
router.get("/:id",  middleware.verifyToken, controller.info); 
router.post("/login", controller.postLogin);
router.post("/logout", middleware.verifyToken, controller.logOut);
router.post("/register", upload.array("avt", 12), controller.register);
router.post("/update/:id", upload.array("avt", 12), controller.updateUser);
router.post("/delete/:id", controller.deleteUser);
router.post("/refresh",  controller.requestRefreshToken)

module.exports = router;