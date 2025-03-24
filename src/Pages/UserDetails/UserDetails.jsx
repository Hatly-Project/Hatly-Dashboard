import React, { useEffect, useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import loginImage from "../../assets/Images/loginImage.png";
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
import "react-phone-number-input/style.css";
import { useParams } from "react-router-dom";
import Loading from "../../Componente/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserDetails } from "../../redux/Slices/UserDetailsSlice";
import PhoneInputComponent from "../../Componente/PhoneInputComponent/PhoneInputComponent";
import { useCountries } from "../../context/CountriesProvider";

export default function UserDetails() {
  const { id } = useParams();
  const { countries, loading: countriesLoading } = useCountries();
  const state = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(loginImage);
  const [passportPhoto, setPassportPhoto] = useState("");
  const [countryCode, setCode] = useState("");
  const [dialCode, setDialCode] = useState("");

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [ id]);

  useEffect(() => {
    if (state.user) {
      setRole(state.user.role ?? "");
      setCountry(state.user.country ?? "");
      setCity(state.user.city ?? "");
      setPostalCode(state.user.postalCode ?? "");
      setDateOfBirth(state.user.dateOfBirth ?? "");
      setPhone(state.user.phone?.phoneNumber ?? "");
      setProfilePhoto(state.user.profilePhoto ?? loginImage);
      setPassportPhoto(state.user.passportPhoto ?? "");
      setCode(state.user.phone?.countryCode ?? "");
      setDialCode(state.user.phone?.dialCode ?? "");
    }
    console.log(state.user, "state.user");
    
    if (state.UserDetailsError) {
      toast.error(state.UserDetailsError);
    }
    if (state.updateError) {
      toast.error(state.updateError);
    }
    if (state.success) {
      toast.success("User details updated successfully");
    }
  }, [state]);

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

  const updateUser = () => {
    let updatedPhone = phone;
    if (!phone.startsWith("+")) {
      updatedPhone = `+${dialCode}${phone}`;
      setPhone(updatedPhone);
    }

    console.log("Updated Phone:", updatedPhone);
    console.log("updateUser");

    dispatch(
      updateUserDetails({
        userId: id,
        role: role,
        country: country,
        city: city,
        postalCode: postalCode,
        dateOfBirth: dateOfBirth,
        phone: updatedPhone,
        profilePhoto: profilePhoto,
        passportPhoto: passportPhoto,
      })
    );
  };

  const handleFileUpload = (event, setImageFunction) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageFunction(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePassportUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPassportPhoto(reader.result.split(",")[1]);
      console.log(passportPhoto, "passportPhoto");
      
      reader.readAsDataURL(file);
    }
  };

  

  if (state.UserDetailsLoading) return <Loading />;

  return (
    <div className="w-full">
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
          {state.UserDetailsLoading ? (
            <div className="flex justify-center items-center w-full mb-3 rounded-md border-2 h-60 bg-gray-200">
              <Loading />
            </div>
          ) : (
            <img
              src={profilePhoto !== null ? profilePhoto : loginImage}
              alt="User Avatar"
              className="w-full mb-3 rounded-md border-2"
            />
          )}
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
            {state.user.firstName} {state.user.lastName}
          </h1>
          <p className="text-slate-500 text-xl md:text-2xl">
            {state.user.email}
          </p>
        </div>
      </div>

      <div className="p-6 mt-9 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            fullWidth
            placeholder="User ID"
            variant="outlined"
            value={state.user?.id ?? ""}
            disabled
          />
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            value={state.user.email}
            disabled
          />

          <FormControl fullWidth>
            <FormLabel>Country</FormLabel>
            <Select
              value={country ?? ""}
              onChange={(e) => setCountry(e.target.value)}
              disabled={countriesLoading || !countries.length}
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
              value={city ?? ""}
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
            placeholder="Postal Code"
            variant="outlined"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            fullWidth
            placeholder="YYYY-MM-DD"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={dateOfBirth || ""}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <FormControl fullWidth>
            <FormLabel>Role</FormLabel>
            <Select
              value={role ?? ""}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <PhoneInputComponent
            initialPhone={dialCode && phone ? `+${dialCode}${phone}` : ""}
            onPhoneChange={(value) => {
              setPhone(value);
              const parsedDialCode = value?.split(" ")[0].replace("+", "");
              setDialCode(parsedDialCode);
              console.log("Phone Updated:", value);
            }}
          />
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
            onChange={handlePassportUpload}
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
          disabled={state.updateLoading}
        >
          {state.updateLoading ? (
            <CircularProgress size={24} className="!text-white" />
          ) : (
            "Update User"
          )}
        </Button>
      </div>
    </div>
  );
}
