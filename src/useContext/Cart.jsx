import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };
  // console.log(addToCart);

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };
  
  const addToWishList = (product) => {
    setWishList((prev) => [...prev, product]);
  };
  
  const removeToWishlist = (product) => {
    setWishList((prev) => prev.filter((item) => {
      return item._id !== product._id
    }))
  }

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, productQuantity: item.productQuantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.productQuantity > 1
          ? { ...item, productQuantity: item.productQuantity - 1 }
          : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, wishList, addToWishList, removeToWishlist, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
