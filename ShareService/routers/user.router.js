const express = require("express")
const router = express.Router()
const userController= require("../controllers/user-controller")
const  verifySignUp = require("../middlewares/verifySignUp");
const authJwt =require("../middlewares/authJwt") 

router.get("/", authJwt.verifyToken, userController.getAll)
router.get("/:id", userController.getOne)
router.post("/username", userController.findByName)
router.post("/signup", verifySignUp.checkDuplicateUsernameOrEmail, 
                verifySignUp.checkRolesExisted, userController.signup)
router.post("/signin", userController.signin)
router.post("/insert", userController.insert)
router.post("/removeRole", userController.removeRole)
router.patch("/:id", userController.update) 
router.post("/addRole", userController.addRole) 
router.delete("/:id", userController.delete)


module.exports= router