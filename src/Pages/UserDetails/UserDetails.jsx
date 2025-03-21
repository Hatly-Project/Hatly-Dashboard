import React, { useEffect, useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import loginImage from "../../assets/Images/loginImage.png";
import axiosInstance from "../../Utils/axiosInstance";
import { useCountries } from "../../context/CountriesProvider";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useParams } from "react-router-dom";
import Loading from "../../Componente/Loading/Loading";

export default function UserDetails() {
  const { id } = useParams();
  const { countries, loading: countriesLoading } = useCountries();
  const [userObject, setUserObject] = useState(null);
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(loginImage);
  const [passportPhoto, setPassportPhoto] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  async function getUserDetails() {
    try {
      const response = await axiosInstance.get(`user/${id}`);
      const { user } = response.data;
      setUserObject(user);
      localStorage.setItem("userDetails", JSON.stringify(user));
      setRole(user.role || "");
      setCountry(user.country || "");
      setCity(user.city || "");
      setPostalCode(user.postalCode || "");
      setDateOfBirth(user.dateOfBirth || "");
      const formattedPhone = user.phone?.phoneNumber
        ? `+${user.phone.phoneNumber}`
        : "";
      setPhone(formattedPhone);
      if (user.profilePhoto)
        setProfilePhoto(`data:image/png;base64,${user.profilePhoto}`);
      if (user.passportPhoto)
        setPassportPhoto(`data:image/png;base64,${user.passportPhoto}`);
    } catch (error) {
      toast.error(
        "Failed to fetch user details: " +
          (error.response?.data?.message || error.message)
      );
    }
  }

  async function updateUser() {
    setIsUpdating(true);
    try {
      if (!isValidPhoneNumber(phone)) {
        toast.error("Please enter a valid phone number", {
          position: "top-center",
          autoClose: 1000,
        });
        return;
      }

      const updateData = {
        dob: dateOfBirth,
        address: userObject.address,
        city: city,
        country: country,
        phone: phone,
        postalCode: postalCode,
        ip: userObject.ip,
      };

      const response = await axiosInstance.patch(`user/${id}`, updateData);
      toast.success("User updated successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
      const updatedUser = { ...userObject, ...updateData };
      localStorage.setItem("userDetails", JSON.stringify(updatedUser));
      setUserObject(updatedUser);
    } catch (error) {
      toast.error(
        "Failed to update user: " +
          (error.response?.data?.message || error.message),
        { position: "top-center", autoClose: 1000 }
      );
      console.error(
        "Update User error:",
        error.response?.data || error.message
      );
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      const user = JSON.parse(storedUserDetails);
      setUserObject(user);
      setRole(user.role || "");
      setCountry(user.country || "");
      setCity(user.city || "");
      setPostalCode(user.postalCode || "");
      setDateOfBirth(user.dateOfBirth || "");
      const formattedPhone = user.phone?.phoneNumber
        ? `+${user.phone.phoneNumber}`
        : "";
      setPhone(formattedPhone);
      if (user.profilePhoto)
        setProfilePhoto(`data:image/png;base64,${user.profilePhoto}`);
      if (user.passportPhoto)
        setPassportPhoto(`data:image/png;base64,${user.passportPhoto}`);
    } else {
      getUserDetails();
    }
  }, [id]);

  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find((c) => c.iso2 === country);
      const newCities = selectedCountry?.states || [];
      setCities(newCities);
      if (!newCities.some((c) => c.name === city)) {
        setCity("");
      }
    }
  }, [country, countries]);

  const handleFileUpload = (event, setImageFunction) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageFunction(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!userObject) return <Loading/>;

  const CustomPhoneInput = React.forwardRef((props, ref) => (
    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      label="Phone"
      variant="outlined"
    />
  ));

  return (
    <div className="p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3 p-3">
          <img
            src={profilePhoto}
            alt="User Avatar"
            className="w-full mb-3 rounded-md border-2"
          />
          <input
            type="file"
            id="uploadProfile"
            className="hidden"
            onChange={(e) => handleFileUpload(e, setProfilePhoto)}
          />
          <label htmlFor="uploadProfile">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
              className="!bg-mainColor w-full"
            >
              Upload Profile Picture
            </Button>
          </label>
        </div>

        <div className="md:col-span-9 pt-5 px-3">
          <h1 className="font-bold text-3xl md:text-5xl text-slate-700">
            {userObject.firstName} {userObject.lastName}
          </h1>
          <p className="text-slate-500 text-xl md:text-2xl">
            {userObject.email}
          </p>
        </div>
      </div>

      <div className="p-6 mt-9 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            fullWidth
            label="User ID"
            variant="outlined"
            value={userObject.id}
            disabled
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={userObject.email}
            disabled
          />

          <FormControl fullWidth>
            <FormLabel>Country</FormLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={countriesLoading}
            >
              {countriesLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                countries.map((c) => (
                  <MenuItem key={c.iso2} value={c.iso2}>
                    {c.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>City</FormLabel>
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!cities.length}
            >
              {cities.length > 0 ? (
                cities.map((s) => (
                  <MenuItem key={s.name} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Select a country first</MenuItem>
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Postal Code"
            variant="outlined"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            fullWidth
            label="Birth Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <FormControl fullWidth>
            <FormLabel>Role</FormLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Phone</FormLabel>
            <PhoneInput
              international
              defaultCountry="US"
              value={phone}
              onChange={setPhone}
              inputComponent={CustomPhoneInput}
            />
          </FormControl>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Passport Upload</h2>
          {passportPhoto ? (
            <img
              src={passportPhoto}
              alt="Passport"
              className="w-40 h-28 rounded-md border-2"
            />
          ) : (
            <p className="text-gray-500">No passport was uploaded</p>
          )}
        </div>

        <div className="w-25 m-auto mb-9">
          <input
            type="file"
            id="uploadPassport"
            className="hidden"
            onChange={(e) => handleFileUpload(e, setPassportPhoto)}
          />
          <label htmlFor="uploadPassport">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
              className="!bg-mainColor !mt-5 w-fit-content"
            >
              Upload Passport
            </Button>
          </label>
        </div>

        <Button
          variant="contained"
          className="mt-4 !bg-green-500 hover:bg-green-600 text-white w-full"
          fullWidth
          onClick={updateUser}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <CircularProgress size={24} className="!text-white" />
          ) : (
            "Update User"
          )}
        </Button>
      </div>
    </div>
  );
}
