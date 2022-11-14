const Product = require("../models/Product");
const Category = require("../models/Category");
const formidable = require("formidable");

async function index(req, res) {
  const products = await Product.find().populate({ path: "category", Category });
  res.json({ products });
}

async function store(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: __dirname + "/../public/img",
  });
  form.parse(req, async (err, fields, files) => {
    const findedCategory = await Category.findById(fields.category);
    const newProduct = await Product.create({
      name: fields.name,
      description: fields.description,
      images: [files.image1.newFilename, files.image2.newFilename, files.image3.newFilename],
      price: fields.price,
      stock: fields.stock,
      category: findedCategory,
      featured: fields.featured,
      slug: fields.slug,
    });
    await newProduct.save();
    return res.json({ msg: "OK" });
  });
}

module.exports = {
  index,
  store,
};