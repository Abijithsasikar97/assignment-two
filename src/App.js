/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "antd/dist/reset.css";
import axios from "axios";
import Loader from "./Components/Loader";
import ProfileList from "./Components/ProfileList";
import { addUser } from "./redux/action/user";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
        dispatch(addUser(userData));
      }
    } catch (err) {
      setIsLoading(false);
      console.log("Error in getUserDetails: ", err);
    }
  };

  const userDetails = useSelector((state) => state.userData);

  return (
    <>{isLoading ? <Loader /> : <ProfileList userDetails={userDetails} />}</>
  );
};

export default App;
