import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import ProductContext from "../useContext/product";
import CartContext from "../useContext/Cart";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const { getCategory, categoryData } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    if (categoryName) {
      getCategory(categoryName);
    }
  }, [categoryName]);

  return (
    <>
      <Header />
      <main className="container py-4">
        <div className="container mt-5">
          <h2 className="mb-4">{categoryName} Products</h2>

          <div className="row">
            {categoryData.length === 0 ? (
              <p>Loading...</p>
            ) : (
              categoryData.map((product) => (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.productImage}
                      className="card-img-top"
                      alt={product.productName}
                      style={{ height: "250px", objectFit: "cover" }}
                    />

                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>

                      <p className="card-text fw-bold">
                        ₹{product.productPrice}
                      </p>
                      <Link
                        to={`/cart`}
                        onClick={() => addToCart(product)}
                        className="btn btn-primary"
                      >
                        Go To Cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
