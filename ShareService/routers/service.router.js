const express = require("express")
const router = express.Router()
const serviceController= require("../controllers/service-controller")

router.get("/", serviceController.getAll)
router.get("/:id", serviceController.getOne)
router.post("/service", serviceController.findByName)
router.post("/",  serviceController.create)

router.post("/removeMember", serviceController.removeMember)
router.patch("/:id", serviceController.update) 
router.post("/addMember", serviceController.addMember) 
router.delete("/:id", serviceController.delete)
router.post("/addServiceDemandeDetails", serviceController.addServiceDemandeDetails) 


module.exports= router