import React, { createContext, useReducer } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();
// reducer function to handle switch type
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGGIN_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        IsAuthenticated: true,
        isLoading: true,
        isError: action.payload,
      };
    case "USERLOADED":
      return {
        ...state,
        currentUser: action.payload,
        IsAuthenticated: true,
        isLoading: true,
        isError: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        isError: null,
        IsAuthenticated: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const Authprovider = ({ children }) => {
  const initialState = {
    currentUser: null,
    IsAuthenticated: false,
    isLoading: false,
    isError: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // get user
  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://taskmanagement-zg03.onrender.com/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: "USERLOADED", payload: response.data.user });
    } catch (error) {
      if (error) {
        dispatch({ type: "LOGGIN_ERROR", payload: error.response.data.msg });
        toast.error(state.isError);
      }
    }
  };
  // post login
  const login = async (FORMDATA) => {
    try {
      const response = await axios.post(
        "https://taskmanagement-zg03.onrender.com/user/login",
        FORMDATA
      );

      getUser();
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "LOGGIN_SUCCESS", payload: response.data });
      toast.success("user successfully logged in");

      console.log("dorcas");
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        dispatch({ type: "LOGIN_ERROR", payload: error.response.data.msg });
        toast.error(state.isError);
      }
    }
  };
  // logout function
  const Logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        getUser,
        IsAuthenticated: state.IsAuthenticated,
        isLoading: state.isLoading,
        currentUser: state.currentUser,
        isError: state.isError,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Authprovider, AuthContext };
