import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "react-router";

function App() {
  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center">
          <img src="https://placehold.net/avatar.svg" alt="" />
          <img src="https://placehold.net/avatar-5.png" alt="" />
          <img src="https://placehold.net/avatar.svg" alt="" />
          <img src="https://placehold.net/avatar-5.png" alt="" />
          <img src="https://placehold.net/avatar.svg" alt="" />
        </div>
        <div className="py-5 d-flex justify-content-center flex-column align-items-center">
          <h1 className="pt-3 ">Ecommerce Website</h1>
          <Link  to={`/productPage`} className="btn btn-primary">Go To Product Page</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
