const router = require ("express").Router();
var kafka = require("../kafka/client");
const { checkAuth } = require("../Utils/restPassport")
const appController = require("../controllers/fileUpload");
const multer = require("multer")


const upload = multer();
router.post("/",upload.single("originalname"),appController.handleFileUpload);


module.exports = router;