const { Router } = require("express");
const authRoutes = require("./auth.route");
const contactRoutes = require("./contact.route");
const handleErrors = require("../middlewares/handleErrors.middleware");
const router = Router();

router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);
// other routes should be defined here

router.use(handleErrors);

module.exports = router;
