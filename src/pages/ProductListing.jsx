import { Link } from "react-router-dom";
import useFetch from "../useFetch.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useContext, useState } from "react";
import CartContext from "../useContext/Cart.jsx";

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState(false);

  const url = searchTerm ? `http://localhost:3001/api/productsDetail/${searchTerm}` :  `http://localhost:3001/api/products`

  const { data, loading, error } = useFetch(url)

  const productData = data?.data ? data?.data : [];

  const { addToCart, addToWishList } = useContext(CartContext);

  const filteredProducts = productData?.filter((product) => {
    const searchMatch = searchTerm ? product.productName.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const priceMatch = price ? product.productPrice <= price : true;
    const categoryMatch = category
      ? category === product.categoryField.category
      : true;
    const ratingMatch = rating ? product.rating >= rating : true;
    return priceMatch && categoryMatch && ratingMatch && searchMatch
  });

  const SortByProduct = [...filteredProducts].sort((a, b) => {
    if (sortBy === "LOW_TO_HIGH") {
      return a.productPrice - b.productPrice;
    }
    if (sortBy === "HIGH_TO_LOW") {
      return b.productPrice - a.productPrice;
    }
    return 0;
  });

  if (error) <p>{error.message}</p>;

  return (
    <>
      <Header setSearchTerm={setSearchTerm}/>
      <main className="container py-5">
        {loading && (
          <>
            <p className="d-flex justify-content-center align-items-center">
              loading...
            </p>
          </>
        )}

        <div className="d-flex" style={{ minHeight: "80vh" }}>
          <div
            className="d-flex flex-column bg-secondary-subtle p-3"
            style={{ minWidth: "240px", maxHeight: "90vh" }}
          >
            <h4>
              <b>Filter Products</b>
            </h4>
            <br />
            <div>
              <label htmlFor="price">
                <h5>Price: </h5>
              </label>
              <br />
              <input
                type="radio"
                name="price"
                checked={price === 50}
                onChange={() => setPrice(50)}
              />{" "}
              $50 & below
              <br />
              <input
                type="radio"
                name="price"
                checked={price === 150}
                onChange={() => setPrice(150)}
              />{" "}
              $150 & below
              <br />
              <input
                type="radio"
                name="price"
                checked={price === 200}
                onChange={() => setPrice(200)}
              />{" "}
              $200 & below
              <br />
            </div>
            <br />
            <div>
              <label htmlFor="category">
                <h5>Category: </h5>
              </label>
              <br />
              <input
                type="checkbox"
                onChange={(e) => setCategory(e.target.checked ? "Men" : "")}
                checked={category === "Men"}
                id=""
                value="Men"
              />{" "}
              Women
              <br />
              <input
                type="checkbox"
                onChange={(e) => setCategory(e.target.checked ? "Women" : "")}
                checked={category === "Women"}
                id=""
                value="Women"
              />{" "}
              Men
              <br />
              <br />
            </div>
            <div>
              <label htmlFor="rating">
                <h5>Rating: </h5>
              </label>
              <br />
              <input
                type="radio"
                onChange={() => setRating(4.8)}
                checked={rating === 4.8}
                name="rating"
              />{" "}
              4.8 Stars & above
              <br />
              <input
                type="radio"
                onChange={() => setRating(4.6)}
                checked={rating === 4.6}
                name="rating"
              />{" "}
              4.6 Stars & above
              <br />
              <input
                type="radio"
                onChange={() => setRating(4.4)}
                checked={rating === 4.4}
                name="rating"
              />{" "}
              4.4 Stars & above
              <br />
              <input
                type="radio"
                onChange={() => setRating(4.2)}
                checked={rating === 4.2}
                name="rating"
              />{" "}
              4.2 Stars & above
              <br />
            </div>
            <br />
            <div>
              <label htmlFor="sortBy">
                <h5>Sort By</h5>
              </label>
              <br />
              <input
                type="radio"
                name="sortBy"
                checked={sortBy === "LOW_TO_HIGH"}
                onChange={() => setSortBy("LOW_TO_HIGH")}
              />{" "}
              Price - Low to High
              <br />
              <input
                type="radio"
                name="sortBy"
                checked={sortBy === "HIGH_TO_LOW"}
                onChange={() => setSortBy("HIGH_TO_LOW")}
              />{" "}
              Price - High to Low
              <br />
            </div>
            <button
              className="btn btn-sm btn-outline-dark w-100 mt-4"
              onClick={() => {
                setPrice("");
                setCategory("");
                setRating(0);
                setSortBy("");
              }}
            >
              Clear Filters
            </button>
          </div>
          <div className="m-4 d-flex flex-column flex-wrap gap-5">
            <div className="mx-4">
              <h5>
                Show All Products (Showing {filteredProducts?.length || 0}{" "}
                products)
              </h5>
            </div>
            <div className="mx-4 d-flex gap-5 flex-wrap">
              {SortByProduct?.map((product) => (
                <>
                  <div
                    key={product._id}
                    className="card d-flex align-items-center justify-content-center"
                    style={{ width: "18rem" }}
                  >
                    <div
                      className="card d-flex align-items-center justify-content-center"
                      style={{ width: "18rem" }}
                    >
                      <i
                        className="card-img-overlay bi bi-heart-fill text-danger fs-3"
                        onClick={() => addToWishList(product)}
                      ></i>
                      <img
                        src={product.productImage}
                        className="img-fluid card-img h-100 object-fit-cover card-img-top"
                        alt="..."
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-text">{product.productName}</h5>
                      <h6>${product.productPrice}</h6>
                      <Link
                        to={`/cart`}
                        onClick={() => addToCart(product)}
                        className="btn btn-primary px-5 mx-3 mb-4"
                      >
                        Go to Cart
                      </Link>
                      <Link
                        to={`/productPage/${product._id}`}
                        className="px-5 mx-3 btn btn-primary"
                      >
                        More Detail
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductListing;
