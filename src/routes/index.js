const { Router } = require("express");
const authRoutes = require("./auth.route");
const router = Router();

// other routes should be defined here
router.use("/auth", authRoutes);

module.exports = router;
