import { createContext, useState } from "react";
import useFetch from "../useFetch";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  // console.log("Search Term: ", searchTerm);

  const url = `https://major-project-backend1.vercel.app/api/products`;

  const { data, loading, error } = useFetch(url);

  const productData = data?.products || data?.data || data || [];

  const filteredProducts = productData.filter((product) => {
    const searchMatch = !searchTerm || product.productName.toLowerCase().includes(searchTerm.toLowerCase())

    const priceMatch = !price || product.productPrice <= price

    const categoryMatch = !category || product.categoryField?.categoryField === category

    const ratingMatch = !rating || product.rating >= rating

    return searchMatch && priceMatch && categoryMatch && ratingMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "LOW_TO_HIGH") {
      return a.productPrice - b.productPrice;
    }

    if (sortBy === "HIGH_TO_LOW") {
      return b.productPrice - a.productPrice;
    }

    return 0;
  });

  async function getCategory(categoryName) {
    try {
      const res = await fetch(
        `https://major-project-backend1.vercel.app/api/category/${categoryName}`,
      );
      const data = await res.json();
      console.log("Category API response:", data);

      setCategoryData(data?.data || []);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        setSearchTerm,
        setPrice,
        setCategory,
        setRating,
        setSortBy,
        loading,
        error,
        filteredProducts,
        sortedProducts,
        categoryData,
        getCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
