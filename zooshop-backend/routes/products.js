const express = require("express");

const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");

const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const mapProduct = require("../helpers/mapProduct");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const { products, lastPage } = await getProducts(
      req.query.search,
      req.query.limit,
      req.query.page,
      req.query.category,
      req.query.dietType,
      req.query.sort
    );
    res.send({ data: { lastPage, products: products.map(mapProduct) } });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);

    if (!product) {
      res.send({ error: "Товар не найден" });
      return;
    }
    res.send({ data: mapProduct(product) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

//
router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newProduct = await addProduct({
      image_url: req.body.imageUrl,
      weight_kg: req.body.weightKg,
      feed_type: req.body.feedType,
      diet_type: req.body.dietType,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
    });
    res.send({ data: mapProduct(newProduct) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const updatedProduct = await editProduct(req.params.id, {
        image_url: req.body.imageUrl,
        weight_kg: req.body.weightKg,
        feed_type: req.body.feedType,
        diet_type: req.body.dietType,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
      });

      if (!updatedProduct) {
        res.send({ error: "Товар не найден" });
        return;
      }
      res.send({ data: mapProduct(updatedProduct) });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const result = await deleteProduct(req.params.id);

      if (result.deletedCount === 0) {
        res.send({ error: "Товар не найден" });
        return;
      }
      res.send({ error: null });
    } catch (e) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
);

module.exports = router;
