import * as yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import loginImage from "../../assets/Images/loginImage.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginSuccess, login } from "../../redux/Slices/authSlice";
import Loading from "../../Componente/Loading/Loading";

const Login = () => {
  const { loading, error, loginSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const disptch = useDispatch();
  const mySchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const userData = {
    email: "",
    password: "",
  };
useEffect(()=>{
  if(loginSuccess){
    navigate("/landingPage/userDetails/01JPNNHVGQZ8KGX391BRZJB98Y");
    disptch(changeLoginSuccess());
  }
},[loginSuccess])
useEffect(()=>{
  if (error) {
    console.error("Login error:", error);
    toast.error(
     <div className="text-center ">
        <p>{error}</p>
     </div>,
     {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: true,
     }
    );
  }
  
}, [error])
  function sendDataToLogin(values) {
    disptch(login(values));
  }

  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <ToastContainer />
      <div className="h-screen bg-[#F5ECE0] flex flex-col justify-center">
        <div className="container flex flex-col-reverse md:flex-row items-center h-screen p-4">
          <div className="w-full md:w-[40%] order-2 md:order-1 mt-4 md:mt-0">
            <h1 className="text-center text-4xl text-mainColor font-bold">
              Welcome To Hatly
            </h1>
            <img
              src={loginImage}
              alt="hatly login image"
              className="w-full mx-auto max-w-xs md:max-w-none"
            />
          </div>
          <div className="w-full md:w-[60%] rounded-md shadow-sm p-4 order-1 md:order-2">
            <form onSubmit={myFormik.handleSubmit} className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

              <div className="mb-4">
                <TextField
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={myFormik.handleChange}
                  onBlur={myFormik.handleBlur}
                  value={myFormik.values.email}
                  error={
                    myFormik.touched.email && Boolean(myFormik.errors.email)
                  }
                  helperText={myFormik.touched.email && myFormik.errors.email}
                />
              </div>

              <div className="mb-4">
                <TextField
                  placeholder="Password"
                  type="password"
                  id="password"
                  name="password"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={myFormik.handleChange}
                  onBlur={myFormik.handleBlur}
                  value={myFormik.values.password}
                  error={
                    myFormik.touched.password &&
                    Boolean(myFormik.errors.password)
                  }
                  helperText={
                    myFormik.touched.password && myFormik.errors.password
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-mainColor text-white p-2 rounded"
              >
                {loading ? <Loading /> : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
