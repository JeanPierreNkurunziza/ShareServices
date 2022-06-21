const express = require("express")
const router = express.Router()
const memberController= require("../controllers/member-controller")

router.get("/", memberController.getAll)
router.get("/:id", memberController.getOne)
router.post("/username", memberController.findByName)
router.post("/",  memberController.create)

router.post("/insert", memberController.insert)
router.post("/removeCompetence", memberController.removeCompetence)
router.patch("/:id", memberController.update) 
router.post("/addCompetence", memberController.addCompetence) 
router.delete("/:id", memberController.delete)
router.post("/addCompetenceDetails", memberController.addCompetenceDetails) 


module.exports= router