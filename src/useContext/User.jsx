import { createContext, useState } from "react";
import useFetch from "../useFetch";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formSubmitted, setFormSubmitted] = useState("");
  const [deletedMessage, setDeletedMessage] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const { data: getUserDetails } = useFetch("http://localhost:3001/api/user");
  const { data: getApiAddress } = useFetch("http://localhost:3001/api/address");

  const userDetails = getUserDetails?.data || [];
  const userAddress = getApiAddress?.data || [];

  const updateUserAddress = async (userAddressId, addressData) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/address/${userAddressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        },
      );

      if (!res.ok) throw new Error("Failed to update address");

      const data = await res.json();
      console.log("Update Address: ", data);
      setFormSubmitted("Address updated successfully!");
      setAddress("");
      setLocation("");
    } catch (error) {
      console.error("Error updating address:", error);
      setFormSubmitted("Error updating address!");
    }
  };

  const deletedUserAddress = async (userAddressId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/address/${userAddressId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Failed to delete address");

      const data = await res.json();
      console.log("Deleted:", data);
      setDeletedMessage("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
      setDeletedMessage("Error deleting address");
    }
  };

  const selectDeliveryAddress = (address) => {
    setSelectedDeliveryAddress(address);
  };

  const clearDeliveryAddress = () => {
    setSelectedDeliveryAddress(null);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    if (editingAddressId) {
      await updateUserAddress(editingAddressId, { address, location });
      setEditingAddressId(null);
    } else {
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
      } catch (error) {
        console.error("Error saving address:", error);
      }
    }

    setAddress("");
    setLocation("");
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

  return (
    <UserContext.Provider
      value={{
        userDetails,
        userAddress,
        formHandler,
        handleEditClick,
        handleDelete,
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
        selectedDeliveryAddress,
        selectDeliveryAddress,
        clearDeliveryAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
