import * as yup from "yup";
import { useFormik } from "formik";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Utils/axiosInstance";
import axios from "axios";
// import axios from "axios";
const Login = () => {
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const mySchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required "),
    password: yup
      .string()
      .required(" Password is required")
  });

  const userData = {
    email: "",
    password: "",
  };
  async function sendDataToLogin(values) {
    console.log("values", values);
    
    try {
      await axiosInstance.post("auth/login",values);
    } catch (error) {
      console.error("Login error:", error);
    }

  }

  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={myFormik.handleSubmit}
          className="bg-white p-6 rounded shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
              value={myFormik.values.email}
            />
            {myFormik.touched.email && myFormik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {myFormik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
              value={myFormik.values.password}
            />
            {myFormik.touched.password && myFormik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {myFormik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
