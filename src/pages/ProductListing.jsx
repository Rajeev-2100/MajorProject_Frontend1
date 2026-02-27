import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useContext, useState } from "react";
import CartContext from "../useContext/Cart.jsx";
import ProductContext from "../useContext/product.jsx";

const ProductListing = () => {
  const [goToCart, setGoToCart] = useState(false);
  const { categoryName } = useParams();
  const {
    setSearchTerm,
    price,
    categories,
    setCategories,
    setRating,
    setPrice,
    setSortBy,
    rating,
    sortBy,
    loading,
    error,
    sortedProducts,
  } = useContext(ProductContext);

  const { addToCart, addToWishList } = useContext(CartContext);

  const finalProducts = categoryName
    ? sortedProducts.filter(
        (product) => product.categoryField?.categoryField === categoryName,
      )
    : sortedProducts;

  if (error) {
    return (
      <>
        <Header />
        <p className="text-center text-danger mt-5">{error.message}</p>
        <Footer />
      </>
    );
  }

  const removeCategory = (cateRemove) => {
    setCategories(categories.filter((cate) => cate !== cateRemove));
  };

  const removePrice = () => {
    setPrice("");
  };

  const removeRating = () => {
    setRating(0);
  };

  const hasActiveFilters = () => {
    // setActiveFilter(true);
    return price !== "" || categories.length > 0 || rating > 0 || sortBy !== "";
  };

  const handleCategoryChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((item) => item !== value));
    }
  };

  return (
    <>
      <Header setSearchTerm={setSearchTerm} />
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
            className="d-flex flex-column align-items-start bg-secondary-subtle p-3"
            style={{ minWidth: "240px", maxHeight: "100vh" }}
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
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="price"
                  id="price50"
                  checked={price === 50}
                  onChange={() => setPrice(50)}
                />
                <label className="form-check-label" htmlFor="price50">
                  $50 & below
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="price"
                  id="price150"
                  checked={price === 150}
                  onChange={() => setPrice(150)}
                />
                <label className="form-check-label" htmlFor="price150">
                  $150 & below
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="price"
                  id="price200"
                  checked={price === 200}
                  onChange={() => setPrice(200)}
                />
                <label className="form-check-label" htmlFor="price200">
                  $200 & below
                </label>
              </div>
            </div>
            <br />
            <div>
              <label htmlFor="category">
                <h5>Category: </h5>
              </label>
              <br />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="women"
                  onChange={handleCategoryChange}
                  checked={categories.includes("Women")}
                  value="Women"
                />
                <label className="form-check-label" htmlFor="women">
                  Women
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="men"
                  onChange={handleCategoryChange}
                  value="Men"
                  checked={categories.includes("Men")}
                />
                <label className="form-check-label" htmlFor="men">
                  Men
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="child"
                  onChange={handleCategoryChange}
                  value="Child"
                  checked={categories.includes("Child")}
                />
                <label className="form-check-label" htmlFor="child">
                  Child
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="men sport"
                  onChange={handleCategoryChange}
                  value="Men Sport"
                  checked={categories.includes("Men Sport")}
                />
                <label className="form-check-label" htmlFor="men sport">
                  Men Sports
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="women sport"
                  onChange={handleCategoryChange}
                  value="Women Sport"
                  checked={categories.includes("Women Sport")}
                />
                <label className="form-check-label" htmlFor="women sport">
                  Women Sports
                </label>
              </div>
              <br />
            </div>
            <div>
              <label htmlFor="rating">
                <h5>Rating: </h5>
              </label>
              <br />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id="rating48"
                  checked={rating === 4.8}
                  onChange={() => setRating(4.8)}
                />
                <label className="form-check-label" htmlFor="rating48">
                  4.8 Stars & above
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id="rating46"
                  checked={rating === 4.6}
                  onChange={() => setRating(4.6)}
                />
                <label className="form-check-label" htmlFor="rating46">
                  4.6 Stars & above
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id="rating44"
                  checked={rating === 4.4}
                  onChange={() => setRating(4.4)}
                />
                <label className="form-check-label" htmlFor="rating44">
                  4.4 Stars & above
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id="rating42"
                  checked={rating === 4.2}
                  onChange={() => setRating(4.2)}
                />
                <label className="form-check-label" htmlFor="rating42">
                  4.2 Stars & above
                </label>
              </div>
            </div>
            <br />
            <div>
              <label htmlFor="sortBy">
                <h5>Sort By</h5>
              </label>
              <br />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortBy"
                  id="lowToHigh"
                  checked={sortBy === "LOW_TO_HIGH"}
                  onChange={() => setSortBy("LOW_TO_HIGH")}
                />
                <label className="form-check-label" htmlFor="lowToHigh">
                  Price - Low to High
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortBy"
                  id="highToLow"
                  checked={sortBy === "HIGH_TO_LOW"}
                  onChange={() => setSortBy("HIGH_TO_LOW")}
                />
                <label className="form-check-label" htmlFor="highToLow">
                  Price - High to Low
                </label>
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-dark w-100 mt-4"
              onClick={() => {
                setPrice("");
                setCategories([]);
                setRating(0);
                setSortBy("");
              }}
            >
              Clear Filters
            </button>
          </div>

          <div className="m-4 d-flex flex-column flex-wrap gap-5">
            <div className="mx-4">
              {hasActiveFilters() && (
                <div className="mb-3">
                  <h4>
                    <strong>Active Filters:</strong>
                  </h4>

                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="badge bg-dark mx-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeCategory(cat)}
                    >
                      {cat} ✖
                    </span>
                  ))}

                  {price !== "" && (
                    <span
                      className="badge bg-dark mx-1"
                      style={{ cursor: "pointer" }}
                      onClick={removePrice}
                    >
                      ${price} & below ✖
                    </span>
                  )}

                  {rating > 0 && (
                    <span
                      className="badge bg-dark mx-1"
                      style={{ cursor: "pointer" }}
                      onClick={removeRating}
                    >
                      {rating}+ ✖
                    </span>
                  )}
                </div>
              )}

              <h5>
                Show All Products (Showing {finalProducts?.length || 0}{" "}
                products)
              </h5>
            </div>
            <div className="mx-4 d-flex gap-5 flex-wrap">
              {finalProducts?.map((product) => (
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
                        onClick={() => {
                          addToCart(product);
                          setGoToCart(true);
                        }}
                        className="btn btn-primary px-5 mx-3 mb-4"
                      >
                        {goToCart ? "Go To Cart" : "Add To Cart"}
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
