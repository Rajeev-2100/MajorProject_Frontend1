import { useContext, useState } from "react";
import UserContext from "../useContext/User.jsx";
import Footer from "../components/Footer";
import Header from "../components/Header";

const UserProfile = () => {
  const {
    userDetails,
    userAddress,
    updateUserAddress,
    deletedUserAddress,
    deletedMessage,
    formSubmitted,
    setFormSubmitted,
    setDeletedMessage,
    address,
    setAddress,
    location,
    setLocation,
  } = useContext(UserContext);
  
  console.log("UserDetails: ", typeof userDetails);

  const user = userDetails?.data?.[0];

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          location,
        }),
      });

      const responseData = await res.json();
      console.log("Address saved: ", responseData);
      setFormSubmitted("Address added successfully!");
      setAddress("")
      setLocation("")

    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="container p-5">
        <form onSubmit={formHandler}>
          <div>
            <label htmlFor="address">Change Address: </label>
            <br />
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress("")}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Change Location: </label>
            <br />
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation("")}
              required
            />
          </div>
          <br />
          <button type="submit">Save Address</button>
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

        <hr />

        {user && (
          <>
            <h3>User Profile</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.number}</p>
          </>
        )}

        {userAddress.map((userAddr) => (
          <div key={userAddr._id}>
            <p>{userAddr.address}</p>
            <p>{userAddr.location}</p>
            <div className="d-flex gap-3">
              <button onChange={() => deletedUserAddress(userAddr._id)}>Delete</button>
              <button onChange={() => {
                setAddress(userAddr.address);
                setLocation(userAddr.location);
                updateUserAddress(userAddr._id);
              }}>
                Update
              </button>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default UserProfile;
