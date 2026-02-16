import { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContext from "../useContext/Cart";
import UserContext from "../useContext/User";

const Checkout = () => {
  const {
    userDetails,
    userAddress,
    updateUserAddress,
    deletedUserAddress,
    deletedMessage,
    formSubmitted,
    setFormSubmitted,
    address,
    setAddress,
    location,
    setLocation,
  } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // console.log('User Details: ', userDetails)
  // console.log('User Address: ', userAddress)

  const DELIVERY_CHARGES = 125;
  const subtotal = cart.reduce((acc, curr) => {
    let sum = acc + curr.product.productPrice * curr.productQuantity;
    return sum;
  }, 0);
  const totalPrice = subtotal + DELIVERY_CHARGES;

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        await updateUserAddress(editingAddressId, { address, location });
        setFormSubmitted("✅ Address updated successfully!");
        setEditingAddressId(null);
      } else {
        const res = await fetch("http://localhost:3001/api/address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address, location }),
        });
        const responseData = await res.json();
        console.log("Address saved: ", responseData);
        setFormSubmitted("✅ Address added successfully!");
      }
      setAddress("");
      setLocation("");
    } catch (error) {
      console.error("Error saving address:", error);
      setFormSubmitted("Error saving address");
    }
  };

  const handleEditClick = (addr) => {
    setAddress(addr.address);
    setLocation(addr.location);
    setEditingAddressId(addr._id);
  };

  const handleDelete = (addrId) => {
    deletedUserAddress(addrId);
    if (selectedAddressId === addrId) {
      setSelectedAddressId(null);
    }
  };

  const handlePayment = () => {
    return alert("Your Order Successfully");
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <h1 className="mb-4 ">CheckOut</h1>

        {userDetails?.map((user) => (
          <>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.number}</p>
          </>
        ))}

        <div>
          {cart.map((item) => (
            <>
              <div key={item.id} className="d-flex justify-content-between">
                <div>
                  <h5 className="my-3">{item.product.productName}</h5>
                  <h6>Quantity: {item.productQuantity}</h6>
                </div>
                <div>
                  <h4>Total Price: ${item.product.productPrice}</h4>
                </div>
              </div>
            </>
          ))}
        </div>

        <hr />

        <form onSubmit={formHandler}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              {editingAddressId ? "Update Address:" : "Change Address:"}
            </label>
            <input
              id="address"
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              {editingAddressId ? "Update Location:" : "Change Location:"}
            </label>
            <input
              id="location"
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingAddressId ? "Update Address" : "Save Address"}
          </button>
          {editingAddressId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingAddressId(null);
                setAddress("");
                setLocation("");
              }}
            >
              Cancel
            </button>
          )}
          {formSubmitted && (
            <div className="alert alert-success mt-3">{formSubmitted}</div>
          )}
        </form>

        <div className="d-flex justify-content-between mt-4">
          <div>
            <h5>Delivery Charges: $125</h5>
            <h4>Total Amount: ${totalPrice.toFixed(2)}</h4>
          </div>
        </div>

        <div className="mt-5">
          <h6>Choose Delivery Address</h6>
          {userDetails[0] && (
            <div className="mb-4">
              <h6>{userDetails[0].name}</h6>
              <ul className="list-group">
                {userAddress.map((addr) => (
                  <li key={addr._id} className="list-group-item">
                    <div className="d-flex align-items-start">
                      <div className="form-check me-3 mt-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="deliveryAddress"
                          id={`addr-${addr._id}`}
                          checked={selectedAddressId === addr._id}
                          onChange={() => setSelectedAddressId(addr._id)}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <p>
                          {addr.address} {addr.location}
                        </p>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(addr._id)}
                        >
                          DELETE Addr
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEditClick(addr)}
                        >
                          Update Addr
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                {deletedMessage && (
                  <p className="p-3 alert alert-info mt-2">{deletedMessage}</p>
                )}
              </ul>
            </div>
          )}
        </div>

        {selectedAddressId && cart.length > 0 && (
          <div className="text-center mt-4">
            <button className="btn btn-success btn-lg" onClick={handlePayment}>
              Proceed to Payment (${totalPrice.toFixed(2)})
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
