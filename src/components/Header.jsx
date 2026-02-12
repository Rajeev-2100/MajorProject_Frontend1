import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-body-tertiary ">
        <nav className="navbar navbar-expand-lg container d-flex justify-content-between align-items-center">
          <div className="">
            <a className="navbar-brand fw-bold" href="/">
              MyShoppingSite
            </a>
          </div>

          <form className="d-flex mx-auto w-50">
            <input class="form-control" type="search" placeholder="Search" />
          </form>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-secondary">Login</button>
            <Link to={`/wishList`}><i className="bi bi-heart fs-5 text-danger"></i></Link>
            <Link to={`/cart`} style={{ textDecoration: 'none', color: '#000'}}><h6><i className="b bi-cart fs-5"></i>Cart</h6></Link>
          </div>
        </nav>
      </header>
    </>
  );
};
9
export default Header;
