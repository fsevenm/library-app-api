const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const { loginRules, registerRules } = require("../validations/auth.rules");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/login", validate(loginRules), authController.login);
router.post("/register", validate(registerRules), userController.register);

module.exports = router;
