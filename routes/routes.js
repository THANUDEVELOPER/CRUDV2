const express = require("express");
const {
  showList,
  create,
  product,
  update,
  deleteProduct,
} = require("../controllers/crud");

const router = express.Router();
router.route("/").get(showList).post(create);
router.route("/:id").get(product).patch(update).delete(deleteProduct);

module.exports = router;
