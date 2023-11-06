const express = require("express");
const homeController = require("../controllers/home_controller");
const router = express.Router();

router.get("/", homeController.home);

router.get("/createProject", homeController.create);

router.post("/addProject", homeController.addProjectToDom);

router.get("/projectDetails", homeController.details);

router.post("/filterProjectDetails", homeController.filterProjectDetails);

router.get("/createAnIssue/:id", homeController.createAnIssue);

router.post("/createAnIssue/:id/addIssue", homeController.addAnIssue);

module.exports = router;
