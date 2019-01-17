const router = require("express").Router();
const unitsController = require("../../controllers/unitsController");

// Matches with "/api/units"
router.route("/")
  .get(unitsController.findAll)
  .post(unitsController.create);

  // Matches with "/api/list"
router.route("/squad")
  .get(unitsController.findAll)
  .post(unitsController.create);

// Matches with "/api/units/:id"
router
  .route("/:id")
  .get(unitsController.findById)
  .put(unitsController.update)
  .delete(unitsController.remove);

module.exports = router;
