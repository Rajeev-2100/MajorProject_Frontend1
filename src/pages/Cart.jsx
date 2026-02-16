import { useContext } from "react";
import CartContext from "../useContext/Cart.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, addToWishList, increaseQty, decreaseQty } =
    useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.product.productPrice * curr.productQuantity,
    0
  );
  console.log(totalPrice)

  console.log('Cart Data: ',cart)

  return (
    <>
      <Header />
      <main className="container py-5">
        <h4 className="text-center mb-4">
          My Cart ({cart.length})
        </h4>

        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cart.map((item) => (
                // console.log(item),
                <div key={item._id} className="card mb-4">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.product.productImage}
                        className="img-fluid rounded-start h-100 object-fit-cover"
                        alt={item.product.productName}
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5>{item.product.productName}</h5>
                        <p className="mb-1">${item.product.productPrice}</p>
                        <small className="text-muted">
                          Discount: {item.product.discountPrice}%
                        </small>

                        <div className="d-flex align-items-center gap-3 mt-3">
                          <i
                            className="bi bi-dash-circle-fill"
                            style={{ cursor: "pointer" }}
                            onClick={() => decreaseQty(item.product._id, item.productQuantity)}
                          ></i>

                          <span>Quantity: {item.productQuantity}</span>

                          <i
                            className="bi bi-plus-circle-fill"
                            style={{ cursor: "pointer" }}
                            onClick={() => increaseQty(item.product._id, item.productQuantity)}
                          ></i>
                        </div>

                        <div className="d-flex gap-3 mt-3">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item._id)}
                          >
                            Remove
                          </button>

                          <Link
                            to="/wishList"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => addToWishList(item.product)}
                          >
                            Move to Wishlist
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className="card p-4 sticky-top" style={{ top: "80px" }}>
                <h5>PRICE DETAILS</h5>
                <hr />
                <p>Total Items: {cart.length}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <hr />
                <h4>
                  <b>Total Amount:</b> ${totalPrice.toFixed(2)}
                </h4>
                <Link to="/checkOut" className="btn btn-primary mt-3">
                  PLACE ORDER
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Cart;
