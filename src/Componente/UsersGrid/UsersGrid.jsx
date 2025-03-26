import React, { useContext, useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { toast, ToastContainer } from "react-toastify";
import FlightIcon from "@mui/icons-material/Flight";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { setUsers } from "../../redux/Slices/usersSlice"; // Import your Redux action to update users
import { saveAs } from "file-saver";

export default function UsersGrid() {
  
  const users = useSelector((state) => state.users.users);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    user: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("ID copied to clipboard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleContextMenu = (event, user) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      user,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, user: null });
  };

  // const handleDownloadPassport = () => {
  //   console.log(contextMenu.user.passportPhoto, "contextMenu.user");
  //   // Implement the logic to download the passport photo

  //   handleCloseContextMenu();
  // };

 
const handleDownloadPassport = async () => {
  try {
    if (!contextMenu.user || !contextMenu.user.passportPhoto) {
      toast.error("No passport photo available");
      return;
    }

    const response = await axiosInstance.get(contextMenu.user.passportPhoto, {
      responseType: "blob",
    });

    saveAs(response.data, `passport_${contextMenu.user.id}.jpg`);
    toast.success("Passport photo downloaded successfully!",
      {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  } catch (error) {
    console.error("Failed to download passport:", error);
    toast.error("Failed to download passport");
  }
};

  
  const handleEditUser = () => {
    handleCloseContextMenu();
    navigate(`${contextMenu.user.id}`);
  };

  const handleDeleteUser = async () => {
    try {
      await axiosInstance.delete(`/user/${contextMenu.user.id}`);
      toast.success("User deleted successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Update the Redux state by filtering out the deleted user
      const updatedUsers = users.filter(
        (user) => user.id !== contextMenu.user.id
      );
      dispatch(setUsers(updatedUsers)); // Dispatch the updated users list to Redux

      handleCloseContextMenu();
    } catch (error) {
      toast.error("Failed to delete user", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full" onClick={handleCloseContextMenu}>
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                Info
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  <PhoneOutlinedIcon sx={{ width: "16px", height: "16px" }} />
                  <span>Phone</span>
                </div>
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  <FlagOutlinedIcon sx={{ width: "16px", height: "16px" }} />
                  <span>Country</span>
                </div>
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  <HomeOutlinedIcon sx={{ width: "16px", height: "16px" }} />
                  <span>Address</span>
                </div>
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  <DateRangeOutlinedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                  <span>DoB</span>
                </div>
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                Verified
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50"
                onContextMenu={(event) => handleContextMenu(event, user)}
              >
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600 cursor-pointer hover:text-blue-500">
                  <Tooltip
                    title="Click to copy ID"
                    onClick={() => handleCopyId(user.id)}
                    arrow
                    placement="top"
                    enterDelay={300}
                    leaveDelay={200}
                  >
                    <span>{user.id}</span>
                  </Tooltip>
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600 flex items-center gap-2">
                    {user.profilePhoto == null ? (
                      <AccountCircleOutlinedIcon
                        sx={{ width: "24px", height: "24px" }}
                      />
                    ) : (
                      <img
                        src={user?.profilePhoto}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <div>
                      <div className="text-xs md:text-sm">{user.firstName}</div>
                      <div
                        className="text-xs md:text-sm text-gray-600 cursor-pointer hover:text-blue-500"
                        onClick={() => handleCopyEmail(user.email)}
                      >
                        <Tooltip
                          title="Click to copy email"
                          arrow
                          placement="top"
                          enterDelay={300}
                          leaveDelay={200}
                        >
                          <span>{user.email}</span>
                        </Tooltip>
                      </div>
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={user.averageRating}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    </div>
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  {0 + user.phone?.phoneNumber || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {user.country && (
                      <img
                        src={`https://flagcdn.com/w40/${user.country.toLowerCase()}.png`}
                        alt={`${user.country} flag`}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span>{user.country || "N/A"}</span>
                  </div>
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  {user.city || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  {user.dateOfBirth || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  {user.role || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  {user.verify ? (
                    <TaskAltIcon className="text-green-500" />
                  ) : (
                    <HighlightOffIcon className="text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="absolute bg-white shadow-md rounded-md border border-gray-300 z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul className="py-2">
            <li
              className="px-4 py-2 flex gap-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleDownloadPassport}
            >
              <FlightIcon />
              <span>Download Passport</span>
            </li>
            <li
              className="px-4 flex gap-2 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleEditUser}
            >
              <ManageAccountsIcon />
              <span>Edit User</span>
            </li>
            <li
              className="px-4 py-2 flex gap-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={handleDeleteUser}
            >
              <PersonRemoveIcon />
              <span>Delete User</span>
            </li>
          </ul>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <div>
          <label
            htmlFor="rowsPerPage"
            className="mr-2 text-xs md:text-sm font-medium text-gray-700"
          >
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded px-2 py-1 text-xs md:text-sm"
          >
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-700 rounded disabled:opacity-50 text-xs md:text-sm"
          >
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <span className="text-xs md:text-sm text-gray-700">
            Page {currentPage} of {Math.ceil(users.length / rowsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(users.length / rowsPerPage)}
            className="px-4 py-2 text-gray-700 rounded disabled:opacity-50 text-xs md:text-sm"
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
