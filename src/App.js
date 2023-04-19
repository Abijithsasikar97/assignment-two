import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/reset.css";
import axios from "axios";
import Loader from "./Components/Loader";
import ProfileList from "./Components/ProfileList";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      setIsLoading(false);
      if (response?.status === 200) {
        const userData = response?.data;
        setUserDetails(userData);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("Error in getUserDetails: ", err);
    }
  };

  const onDelete = (id) => {
    setUserDetails([...userDetails.filter((item) => item.id !== id)]);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ProfileList userDetails={userDetails} onDelete={onDelete} />
      )}
    </>
  );
};

export default App;
