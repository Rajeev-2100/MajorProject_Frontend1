import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        <div className="py-5">
          <h1 className="pt-3 d-flex justify-content-center align-items-center">Ecommerce Website</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
