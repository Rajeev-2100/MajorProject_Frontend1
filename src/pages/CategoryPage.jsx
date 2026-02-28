import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext, useState, useEffect } from "react";
import ProductContext from "../useContext/product";
import CartContext from "../useContext/Cart";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const { getCategory, categoryData } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [selectedSizes, setSelectedSizes] = useState({});

  const [addedProductId, setAddedProductId] = useState(null);

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

                      <select
                        value={selectedSizes[product._id] || ""}
                        className="form-select mb-3"
                        onChange={(e) =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [product._id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>

                      <div className="d-flex gap-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            const size = selectedSizes[product._id];

                            if (!size) {
                              alert("Please select the size");
                              return;
                            }

                            addToCart(product, size);
                            setAddedProductId(product._id);

                            setSelectedSizes((prev) => ({
                              ...prev,
                              [product._id]: "",
                            }));
                          }}
                        >
                          {addedProductId === product._id
                            ? "Go To Cart"
                            : "Add To Cart"}
                        </button>

                        <Link
                          to={`/productPage/${product._id}`}
                          className="btn btn-outline-primary"
                        >
                          More Detail
                        </Link>
                      </div>
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
