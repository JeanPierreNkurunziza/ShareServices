const express = require("express")
const router = express.Router()
const quartierController= require("../controllers/quartier-controller")
router.get("/", quartierController.getAll)
router.get("/:id", quartierController.getOne)
router.post("/", quartierController.create)
router.post("/:getIdQuartier", quartierController.getQuartierId)
router.post("/quartier", quartierController.findByName) 
router.patch("/:id", quartierController.update) 
router.delete("/:id", quartierController.delete)


module.exports= router