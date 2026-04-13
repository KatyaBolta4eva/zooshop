require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register, login } = require("./controllers/user");
const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("./controllers/product");

const {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = require("./controllers/cart");

const mapUser = require("./helpers/mapUser");
const mapProduct = require("./helpers/mapProduct");
const mapCart = require("./helpers/mapCart");

const authenticated = require("./middlewares/authenticated");

const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");

const port = 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(express.static("../frontend/build"));

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.get("/products", async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.limit,
    req.query.page,
    req.query.category,
    req.query.dietType,
    req.query.sort
  );

  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

app.get("/products/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  res.send({ data: mapProduct(product) });
});

app.use(authenticated);

app.post("/products", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    image_url: req.body.imageUrl,
    weight_kg: req.body.weightKg,
    feed_type: req.body.feedType,
    diet_type: req.body.dietType,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
  });

  res.send({ data: mapProduct(newProduct) });
});

app.patch("/products/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  // todo
  const updatedProduct = await editProduct(req.params.id, {
    image_url: req.body.imageUrl,
    weight_kg: req.body.weightKg,
    feed_type: req.body.feedType,
    diet_type: req.body.dietType,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
  });

  res.send({ data: mapProduct(updatedProduct) });
});

app.delete("/products/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteProduct(req.params.id);

  res.send({ error: null });
});

app.get("/cart", authenticated, async (req, res) => {
  try {
    const cart = await getCart(req.user._id);
    res.send({ data: mapCart(cart) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/cart", authenticated, async (req, res) => {
  try {
    const cart = await addItemToCart(
      req.user._id,
      req.body.productId,
      req.body.quantity
    );
    res.send({ data: mapCart(cart) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.patch("/cart", authenticated, async (req, res) => {
  try {
    const cart = await updateItemQuantity(
      req.user._id,
      req.body.productId,
      req.body.quantity
    );
    if (!cart) {
      res.send({ error: "Cart not found" });
      return;
    }
    res.send({ data: mapCart(cart) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.delete("/cart", authenticated, async (req, res) => {
  try {
    await removeItemFromCart(req.user._id, req.body.productId);
    const cart = await getCart(req.user._id);
    res.send({ data: mapCart(cart) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.delete("/cart/clear", authenticated, async (req, res) => {
  try {
    await clearCart(req.user._id);
    res.send({ data: [] });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log("Connected to mongodb");
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`);
  });
});
