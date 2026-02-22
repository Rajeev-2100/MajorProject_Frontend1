import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";


function App() {

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
          <Link to={`/category/Women`}>
            <img
              src="https://img.freepik.com/free-photo/happy-young-woman-uses-her-phone-posing-with-colorful-shopping-bags-studio_8353-5606.jpg"
              className="img-fluid"
              alt=""
            />
          </Link>
          <Link to={`/category/Men`}>
            <img
              src="https://img.freepik.com/premium-photo/online-home-shopping-time-portrait-young-bearded-man-sitting-floor-with-mobile-phone-with-crossed-legs-with-shopping-bags_255757-7840.jpg"
              className="img-fluid"
              alt=""
            />
          </Link>
        </div>
        <div className="py-5 d-flex justify-content-center flex-column align-items-center">
          <h1 className="pt-3 ">Ecommerce Website</h1>
          <Link to={`/productPage`} className="btn btn-primary">
            Go To Product Page
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
