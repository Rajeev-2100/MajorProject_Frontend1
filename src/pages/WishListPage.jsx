import { useContext } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartContext from "../useContext/Cart";
import { useState } from "react";
import { toast } from "react-toastify";


const WishListPage = () => {
  const [addedProductId, setAddedProductId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(false);
  const {
    wishList,
    wishListLoaded,
    getAllWishListDetail,
    removeToWishlist,
    addToCart,
  } = useContext(CartContext);

  if (!wishListLoaded) {
    getAllWishListDetail();
  }
  // console.log("Wishlist: ", wishList);

  return (
    <>
      <Header />
      <main className="container py-5">
        <h4 className="text-center mb-4">My Wishlist ({wishList.length})</h4>

        {wishList.length === 0 ? (
          <p className="text-center">Your Wishlist is Empty</p>
        ) : (
          <div className="d-flex flex-wrap justify-content-between gap-5">
            {wishList.map((item) => (
              console.log('Helo:', item),
              <div className="card" key={item._id} style={{ width: "20rem" }}>
                <img
                  src={item.product.productImage}
                  className="card-img-top"
                  alt={item.product.productName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{item.product.productName}</h6>
                  <h5>${item.product.productPrice}</h5>
                  <div className="d-flex flex-column gap-1">
                    <select
                      name=""
                      id=""
                      value={selectedSize || ""}
                      className="form-select mb-3"
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="">Select Size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>

                    <Link
                      to={addedProductId === item.product._id ? "/cart" : "#"}
                      onClick={(e) => {
                        if (!selectedSize) {
                          e.preventDefault();
                          toast("Please Selected the size");
                        }

                        e.preventDefault();
                        addToCart(item.product, selectedSize);
                        setSelectedSize(false);
                        setAddedProductId(item.product._id);
                      }}
                      className="btn btn-primary px-5 mx-3 mb-2"
                    >
                      {addedProductId === item.product._id && !selectedSize || ""
                        ? "Go To Cart"
                        : "Add To Cart"}
                    </Link>
                    <Link
                      className="btn btn-secondary"
                      to={`/wishList`}
                      onClick={() => removeToWishlist(item._id)}
                    >
                      Remove WishList
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default WishListPage;
