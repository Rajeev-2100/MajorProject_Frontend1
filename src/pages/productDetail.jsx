import { useParams, Link } from "react-router";
import useFetch from "../useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import CartContext from "../useContext/Cart";

export const productMRP = (productData) => {
  const [quantity, setQuantity] = useState(1);
  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = productData ? productData.productPrice * quantity : 0;

  return { increaseQty, decreaseQty, totalPrice, quantity } 
}

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();
  
  const { data, loading, error } = useFetch(
    `http://localhost:3001/api/products/${productId}`,
  );

  const productData = data?.data;
  const { increaseQty, decreaseQty, totalPrice, quantity } = productMRP(productData)

  if (error) <p>{error.message}</p>;

  return (
    <>
      <Header />
      <main className="container py-5">
        {loading && (
          <>
            <p className="d-flex justify-content-center align-items-center">
              loading...
            </p>
          </>
        )}

        <div className="d-flex">
          <div className="">
            <img
              src={productData?.productImage}
              alt=""
              width={1100}
              className="img-thumbnail object-fit-contain"
            />
            <div className="d-flex justify-content-center gap-5">
              <Link
                to={`/cart`}
                onClick={() => addToCart(productData)}
                className="m-3 btn btn-primary"
              >
                Add to Cart
              </Link>
              <Link to={`/checkOut`} className="btn btn-primary m-3">Buy to Now</Link>
            </div>
          </div>
          <div className="p-2 mx-5 fs-5">
            <h2 className="fw-bolder">{productData?.productName}</h2>
            <p>
              <b className="">rating:</b> {productData?.rating}
            </p>
            <p>
              <b className="fw-bold">$</b>
              {productData?.productPrice}
            </p>
            <p>
              {productData?.discountPrice}
              <b>% off</b>
            </p>
            <h5>
              <div className="d-flex gap-3 align-items-center">
                <i
                  className="bi bi-dash-circle-fill"
                  style={{ cursor: "pointer" }}
                  onClick={decreaseQty}
                ></i>
                <span>Quantity: {quantity}</span>
                <i
                  className="bi bi-plus-circle-fill"
                  style={{ cursor: "pointer" }}
                  onClick={increaseQty}
                ></i>
              </div>
            </h5>
            <h2>
             Total Price: ${totalPrice}
            </h2>
            <p>
              <b className="fw-bold">Size: </b>
              {productData?.size}
            </p>
            <p>
              <b className="fw-bold">Description:</b> <br />
              {productData?.productDescription.join(", ")}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
