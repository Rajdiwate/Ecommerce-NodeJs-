import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/apiError.js";

const addToCart = async (req, res, next) => {
  try {
    const { name, productId, price, quantity } = req.body;

    if (!name || !productId || !price || !quantity)
      return next(new ApiError("Incomplete details", 400));

    //check if the stock of product is greater than or equal to the quantity(check if stock is enough)

    // Check if cart of current user already exists
    const existingCart = await Cart.findOne({ user: req.user._id });

    if (existingCart) {
      // Update the cart
      const productIndex = existingCart.products.findIndex(
        (product) => product.productId.toString() === productId
      );

      if (productIndex > -1) {
        // Product exists in cart, update quantity and price
        existingCart.products[productIndex].quantity += quantity;
        existingCart.products[productIndex].price =
          existingCart.products[productIndex].quantity * price;
      } else {
        // Add new product to cart
        existingCart.products.push({ name, productId, price, quantity });
      }

      // Recalculate total price
      existingCart.totalPrice = existingCart.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      await existingCart.save();
      return res.status(200).json({ success: true, cart: existingCart });
    } else {
      // Create a new cart and add product
      const newCart = new Cart({
        user: req.user._id,
        products: [{ name, productId, price, quantity }],
        totalPrice: price * quantity,
      });

      await newCart.save();
      return res.status(201).json({ success: true, cart: newCart });
    }
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const getCartDetails = async (req, res, next) => {
  try {
    const existingCart = await Cart.findOne({ user: req.user._id });

    if (!existingCart) return next(new ApiError("no Cart found", 404));

    return res.status(200).json({ success: true, cart: existingCart });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { cartId, quantity, productId } = req.body;

    if (!cartId || !quantity || !productId)
      return next(new ApiError("incomplete details", 400));

    const cart = await Cart.findById(cartId);
    if (!cart) return next(ApiError("Cart does not exist", 404));

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex < 0)
      return next(new ApiError("No such Product Exists", 404));

    cart.products[productIndex].quantity = quantity;

    await cart.save();

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const removeItem = async () => {
  try {
    const { cartId, productId } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) return next(ApiError("Cart does not exist", 404));

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex < 0)
      return next(new ApiError("No such Product Exists", 404));

    cart.products = cart.products.filter(
      (product) => product.productId.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

export { addToCart, getCartDetails, updateQuantity, removeItem };
