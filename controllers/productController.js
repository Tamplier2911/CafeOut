const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require("./handlersFactory");

// storage properties - SAVE IN MEMORY BUFFER
const multerStorage = multer.memoryStorage();

// filter properties. Is file image?
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("File must be an image.", 400), false);
  }
};

// product properties for upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

// Product photo upload middleware for POST /products
exports.uploadProductPhoto = upload.single("imageCover");

// Product photo resizing and conversion
exports.reizeProductPhoto = catchAsync(async (req, res, next) => {
  // if no file in request - return app error, product must have a photo.
  if (!req.file) {
    return next(new AppError("File must be an image.", 400));
  }

  // if current product exists, also throw an error, we do not want to save new photo.
  const product = await Product.findOne({ name: req.body.name });
  if (product) {
    return next(new AppError("Product with that name already exists.", 400));
  }

  // req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  req.file.filename = `product-${req.body.name
    .split(" ")
    .join("-")
    .toLowerCase()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.file.filename}`);
  next();
});

// Product photo resizing for update
exports.reizeProductPhotoUpdate = catchAsync(async (req, res, next) => {
  // if no file in request - jump to next, we just updating what else we have.
  if (!req.file) next();

  // req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  req.file.filename = `product-${req.body.name
    .split(" ")
    .join("-")
    .toLowerCase()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.file.filename}`);
  next();
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = getAll(Product);

// @desc    Get product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getOneProduct = getOne(Product);

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Admin
// exports.createOneProduct = createOne(Product);
exports.createOneProduct = catchAsync(async (req, res, next) => {
  const { name, description, summary, category, price } = req.body;
  const imageCover = req.file.filename;

  const productObject = {
    name,
    description,
    summary,
    category,
    price,
    imageCover
  };

  const product = await Product.create(productObject);

  res.status(201).json({
    status: "success",
    data: {
      data: product
    }
  });
});

// @desc    Update product by id
// @route   PATCH /api/v1/products/:id
// @access  Admin
// exports.updateOneProduct = updateOne(Product);
exports.updateOneProduct = catchAsync(async (req, res, next) => {
  const productObject = {};

  Object.keys(req.body).forEach(key => {
    productObject[key] = req.body[key];
  });

  if (req.file) {
    productObject.imageCover = req.file.filename;
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    productObject,
    {
      new: true,
      runValidators: true
    }
  );

  if (!product) {
    return next(new AppError("No document found with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: product
    }
  });
});

// @desc    Delete product by id
// @route   DELETE /api/v1/products/:id
// @access  Admin
exports.deleteOneProduct = deleteOne(Product);
