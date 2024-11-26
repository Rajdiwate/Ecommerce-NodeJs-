import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      name: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Instance method to calculate the total price
cartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.products.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);
  return this.totalPrice;
};

export const Cart = mongoose.model("Cart", cartSchema);
