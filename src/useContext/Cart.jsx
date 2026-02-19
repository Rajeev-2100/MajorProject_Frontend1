import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  const addToCart = async (product) => {
    try {
      const res = await fetch(`https://major-project-backend1.vercel.app/api/cart/${product._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productQuantity: 1,
        }),
      });

      const data = await res.json();
      const newCartItem = data?.data;

      setCart((prev) => {
        const existing = prev.find((item) => item.product._id === product._id);
        if (existing) {
          return prev.map((item) =>
            item.product._id === product._id
              ? { ...item, productQuantity: item.productQuantity + 1 }
              : item,
          );
        }

        return [...prev, { _id: newCartItem._id, product, productQuantity: 1 }];
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const res = await fetch(
        `https://major-project-backend1.vercel.app/api/deletedCart/${cartId}`,
        {
          method: "DELETE",
        },
      );
      // console.log("CartId: ", cartId);
      // console.log("Res: ", res);
      if (!res.ok) {
        throw new Error("Failed to delete cart item");
      }
      setCart((prev) => prev.filter((item) => item._id !== cartId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const increaseQty = async (productId, productQuantity) => {
    try {
      await fetch(`https://major-project-backend1.vercel.app/api/updatedCart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty: productQuantity + 1,
        }),
      });

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, productQuantity: item.productQuantity + 1 }
            : item,
        ),
      );
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQty = async (productId, productQuantity) => {
    try {
      await fetch(`https://major-project-backend1.vercel.app/api/updatedCart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: productQuantity - 1 }),
      });

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId && item.productQuantity > 1
            ? { ...item, productQuantity: item.productQuantity - 1 }
            : item,
        ),
      );
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const addToWishList = async (product) => {
    try {
      const res = await fetch(
        `https://major-project-backend1.vercel.app/api/wishlist/${product._id}`,
        {
          method: "POST",
        },
      );
      const data = await res.json();
      // console.log("Data: ", data);
      // console.log("Product Details: ", product);
      const newWishlist = data?.data;
      // console.log("New Wishlist: ", newWishlist);
      setWishList((prev) => {
        const existing = prev.find((item) => item._id === product._id);
        return existing ? prev : [...prev, { id: newWishlist._id, product }];
      });
    } catch (error) {
      throw error;
    }
  };

  const removeToWishlist = async (wishlistId) => {
    try {
      const res = await fetch(
        `https://major-project-backend1.vercel.app/api/wishlist/${wishlistId}`,
        {
          method: "DELETE",
        },
      );
      // console.log('WishListId: ', wishlistId)
      // console.log('Res: ',res)
      if (!res.ok) {
        throw new Error("Failed to delete cart item");
      }
      setWishList((prev) => prev.filter((item) => item.id !== wishlistId));
    } catch (error) {
      console.error("Error removing from Wishlist:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        wishList,
        addToWishList,
        removeToWishlist,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
