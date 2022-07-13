const express = require("express");
const router = express.Router();
const multer = require("multer")

var storage = multer.diskStorage({
    destination: "public/images",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let maxSize = 10 * 1024 * 1024 //10mb
var upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    }
})

var controller = require("../controllers/collection.controller");


router.get("/", controller.index);
router.get("/:id", controller.info)
router.post("/delete/:id", controller.deleteCollection);
router.post("/", upload.array("collectionBanner", 12), controller.postCollection);
router.post("/update/:id", upload.array("collectionBanner", 12), controller.updateCollection);

module.exports = router;