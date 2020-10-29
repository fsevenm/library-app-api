const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const contactRules = require("../validations/contact.rules");
const contactController = require("../controllers/contact.controller");

// GET
router.get("/", auth, contactController.get);

// POST
router.post("/", auth, validate(contactRules), contactController.add);

// PUT
router.put("/:id", auth, validate(contactRules), contactController.update);

// DELETE
router.delete("/:id", auth, contactController.remove);

module.exports = router;
