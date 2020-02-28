const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Product must have a name."],
      maxlength: [100, "Product name cannot be larger than 100 characters."],
      minlength: [3, "Product name cannot have less than 3 characters."]
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product must have a description."],
      maxlength: [
        500,
        "Product description cannot be larger than 500 characters."
      ],
      minlength: [
        10,
        "Product description cannot have less than 10 characters."
      ]
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "Product must have a summary."]
    },
    slug: String,
    imageCover: {
      type: String,
      required: [true, "Product must have a cover image."]
    },
    category: {
      type: String,
      enum: [
        "breakfast",
        "salad",
        "soup",
        "side-dish",
        "hot-meal",
        "desert",
        "childrens-menu",
        "grill",
        "snack",
        "pasta",
        "risotto",
        "pizza",
        "bread",
        "drink",
        "alchohol-drink"
      ],
      required: [true, "Product must belong to a certain category."]
    },
    sale: {
      type: Boolean,
      default: false
    },
    hot: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      required: [true, "Product must have a prce."]
    },
    /*
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.1'],
      max: [5, 'Rating must be below 5.0'],
      // 4.66666 * 10 = 46.6666 (rounded to 47) | 47 / 10 = 4.7
      set: val => Math.round((val * 10) / 10)
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Product must have an author."]
    },
    */
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  },
  {
    versionKey: false
  }
);

/*
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
*/

productSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/*
productSchema.pre(/^find/, function(next) {
  this.populate({
    path: "author",
    select: "-__v"
  });
  next();
});
*/

/*
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
});
*/

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
