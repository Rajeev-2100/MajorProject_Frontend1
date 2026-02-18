import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import OrderContext from "../useContext/Order";
import { Link } from "react-router";

const Order = () => {
  const { orders, handleAllOrderData } = useContext(OrderContext);

  useEffect(() => {
    handleAllOrderData();
  }, []);

  return (
    <>
      <Header />

      <main className="container py-5">
        <h3 className="mb-4 fw-bold">My Orders</h3>

        <button
          className="btn btn-outline-primary mb-3"
          onClick={handleAllOrderData}
        >
          Load Orders
        </button>

        {orders.length === 0 ? (
          <div className="alert alert-info">No orders found</div>
        ) : (
          <ul className="list-group">
            {orders.map(
              (order) => (
                // console.log(order),
                (
                  <div key={order._id}>
                    <li
                      key={`${order.product._id}-${order._id}`}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex flex-column align-items-center">
                        <small>Date: {order.createdAt}</small>
                        <img
                          src={order.product.productImage}
                          alt={order.product.productName}
                          width="80"
                          className="rounded"
                        />
                      </div>
                      <div>
                        <h6 className="mb-1">{order.product.productName}</h6>
                        <small>Quantity: {order.quantity}</small>
                      </div>

                      <div className="text-end">
                        <div>₹{order.totalPrice.toFixed(2)}</div>
                        <small className="text-muted">
                          {order.orderStatus}
                        </small>
                      </div>

                      <div className="">
                        <Link
                          className="btn btn-primary"
                          to={`/order/${order._id}`}
                        >
                          View Details
                        </Link>
                      </div>
                    </li>
                    <hr />
                  </div>
                )
              ),
            )}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
};
export default Order;
