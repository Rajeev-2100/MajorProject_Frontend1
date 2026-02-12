import { createContext, useState } from "react";
import useFetch from "../useFetch";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAddressDetail, setUserAddressDetail] = useState([]); 
  const [formSubmitted, setFormSubmitted] = useState('');
  const [deletedMessage, setDeletedMessage] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);

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
          body: JSON.stringify({
            address: addressData?.address || address,
            location: addressData?.location || location,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed to update address");

      const data = await res.json();
      console.log("Update Address: ", data);
      setFormSubmitted("Address updated successfully!");
      setUserAddressDetail(prev => [...prev, data]);
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
      setDeletedMessage("You have deleted this address");
      setAddress("");
      setLocation("");
      
      if (selectedDeliveryAddress?._id === userAddressId) {
        setSelectedDeliveryAddress(null);
      }
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

  return (
    <UserContext.Provider
      value={{
        userDetails,
        userAddress,
        setUserAddressDetail,
        updateUserAddress,
        deletedUserAddress,
        deletedMessage,
        formSubmitted,
        setFormSubmitted,
        setDeletedMessage,
        userAddressDetail,
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
