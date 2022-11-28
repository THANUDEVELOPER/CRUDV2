const crudSchema = require("../models/crudSchema");

// To show product list
const showList = async (req, res) => {
  try {
    const productList = crudSchema.find(req.query);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const result = await productList.skip(skip).limit(limit);

    res.status(200).json({ result, total: result?.length, page, limit });
  } catch (err) {
    res.send(err);
  }
};

// to create product
const create = async (req, res) => {
  try {
    // const createProduct = new crudSchema({
    //   productName: req.body.productName,
    //   price: req.body.price,
    // });
    // const result = await createProduct.save();
    // res.json(result);

    const createProduct = await crudSchema.create(req.body);

    res.status(200).json(createProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};
// to show product by id
const product = async (req, res) => {
  try {
    const product = await crudSchema.findById(req.params.id);

    if (!product) {
      res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).send(err);
  }
};
// to update product
const update = async (req, res) => {
  try {
    const update = await crudSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json(update);
  } catch (err) {
    res.status(400).send(err);
  }
};
// to delete product

const deleteProduct = async (req, res) => {
  try {
    const productList = await crudSchema.findByIdAndDelete(req.params.id);
    res.status(200).json(productList);
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = {
  showList,
  create,
  product,
  update,
  deleteProduct,
};
