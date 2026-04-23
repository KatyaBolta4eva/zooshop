const Product = require("../models/Product");

async function getProducts(
  search = "",
  limit = 10,
  page = 1,
  category = "all",
  dietType = "all",
  sort = "default"
) {
  const filter = {
    name: { $regex: search, $options: "i" },
  };

  if (category !== "all") {
    filter.category = category;
  }

  if (dietType !== "all") {
    filter.diet_type = dietType;
  }

  let sortOption = { createdAt: -1 };

  if (sort === "price-low-high") {
    sortOption = { price: 1 };
  } else if (sort === "price-high-low") {
    sortOption = { price: -1 };
  }

  const [products, count] = await Promise.all([
    Product.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortOption),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    lastPage: Math.ceil(count / limit),
  };
}

async function getProduct(id) {
  return Product.findById(id);
}

async function addProduct(product) {
  return Product.create(product);
}

async function editProduct(id, product) {
  return Product.findByIdAndUpdate(id, product, { returnDocument: "after" });
}

async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
