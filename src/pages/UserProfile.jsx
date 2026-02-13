import { useContext, useState } from "react";
import UserContext from "../useContext/User.jsx";
import Footer from "../components/Footer";
import Header from "../components/Header";

const UserProfile = () => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const {
    userDetails,
    userAddress,
    deletedMessage,
    formHandler,
    handleDelete,
    handleEditClick,
    formSubmitted,
    setFormSubmitted,
    setDeletedMessage,
    address,
    setAddress,
    location,
    setLocation,
  } = useContext(UserContext);

  return (
    <>
      <Header />
      <main className="container p-5">
        {userDetails?.map((user) => (
          <>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.number}</p>
          </>
        ))}

        <form onSubmit={formHandler} className="mt-5">
          <h5>Updated the form Data</h5>
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

        {formSubmitted && (
          <div className="success-message">
            <p>{formSubmitted}</p>
            <button onClick={() => setFormSubmitted("")}>OK</button>
          </div>
        )}

        {deletedMessage && (
          <div className="success-message">
            <p>You Address is Deleted</p>
            <button onClick={() => setDeletedMessage("")}>DELETE Btn</button>
          </div>
        )}

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

        {selectedAddressId > 0 && (
          <div className="text-center mt-4">
            <button className="btn btn-success btn-lg"></button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default UserProfile;
