const router = require("express").Router();
const unitRoutes = require("./units");

// unit routes
router.use("/units", unitRoutes);

module.exports = router;
