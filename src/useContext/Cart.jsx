import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  const [cartLoaded, setCartLoaded] = useState(false);
  const [wishListLoaded, setWishListLoaded] = useState(false);

  const getAllCartDetail = async () => {
    try {
      if (cartLoaded) return;

      const res = await fetch(
        "https://major-project-backend1.vercel.app/api/cart",
      );

      const data = await res.json();

      setCart(data?.data || []);
      setCartLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (product, selectedSize = "") => {
    try {
      const res = await fetch(
        `https://major-project-backend1.vercel.app/api/cart/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productQuantity: 1,
            productSize: selectedSize,
          }),
        },
      );

      const data = await res.json();
      const newCartItem = data?.data;

      if (!res.ok) {
        alert("Please select the size");
        return;
      }else{
        alert(`${product.productName} added to cart successfully!`);
      }


      setCart((prev) => {
        const existing = prev.find(
          (item) =>
            item.product._id === product._id &&
            item.productSize === selectedSize,
        );

        if (existing) {
          return prev.map((item) =>
            item.product._id === product._id &&
            item.productSize === selectedSize
              ? {
                  ...item,
                  productQuantity: item.productQuantity + 1,
                }
              : item,
          );
        }

        return [
          ...prev,
          {
            _id: newCartItem._id,
            product,
            productQuantity: 1,
            productSize: selectedSize,
          },
        ];
      });
    } catch (error) {
      throw error;
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

      setCart((prev) => prev.filter((item) => item._id !== cartId));

      if (res.ok) {
        alert(`Cart Id deleted Successfully!`);
      } else {
        alert("This Cart Id not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const increaseQty = async (productId, qty) => {
    try {
      await fetch(
        `https://major-project-backend1.vercel.app/api/updatedCart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qty: qty + 1,
          }),
        },
      );

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? {
                ...item,
                productQuantity: item.productQuantity + 1,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQty = async (productId, qty) => {
    if (qty <= 1) return;

    try {
      await fetch(
        `https://major-project-backend1.vercel.app/api/updatedCart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qty: qty - 1,
          }),
        },
      );

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? {
                ...item,
                productQuantity: item.productQuantity - 1,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getAllWishListDetail = async () => {
    try {
      if (wishListLoaded) return;

      const res = await fetch(
        "https://major-project-backend1.vercel.app/api/wishlist",
      );

      const data = await res.json();

      setWishList(data?.data || []);

      setWishListLoaded(true);
    } catch (error) {
      console.error(error);
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

      const newItem = data?.data;

      if (res.ok) {
        alert(`${product.productName} added to wishlist successfully!`);
      } else {
        alert("Something went wrong in wishlist Data");
      }

      setWishList((prev) => {
        const exists = prev.find((item) => item.product._id === product._id);

        if (exists) return prev;

        return [
          ...prev,
          {
            _id: newItem._id,
            product,
          },
        ];
      });
    } catch (error) {
      console.error(error);
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
      const data = res.json();

      if (res.ok) {
        alert(`This wishlist Id remove successfully!`);
      } else {
        alert("Something went wrong in wishlist Data");
      }

      setWishList((prev) => prev.filter((item) => item._id !== wishlistId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishList,
        cartLoaded,
        wishListLoaded,
        getAllCartDetail,
        getAllWishListDetail,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        addToWishList,
        removeToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
