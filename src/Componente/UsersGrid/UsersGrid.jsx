import React, { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

export default function UsersGrid() {
  const users = useSelector((state) => state.users.users);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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

  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full">
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
                  <PhoneOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                  <span>Phone</span>
                </div>
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  <FlagOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                  <span>Country</span>
                </div>
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  <HomeOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                  <span>Address</span>
                </div>
              </th>
              <th className="px-4 py-2 border-b text-left text-xs md:text-sm font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  <DateRangeOutlinedIcon sx={{ width: '16px', height: '16px' }} />
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
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">{user.id}</td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {user.profilePhoto == null ? (
                      <AccountCircleOutlinedIcon sx={{ width: '24px', height: '24px' }} />
                    ) : (
                      <img src={user?.profilePhoto} className="w-6 h-6 rounded-full" />
                    )}
                    <div>
                      <div className="text-xs md:text-sm">{user.firstName}</div>
                      <div className="text-xs md:text-sm">{user.email}</div>
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={user.averageRating}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  0{user.phone?.phoneNumber || 'N/A'}
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {user.country && (
                      <img
                        src={`https://flagcdn.com/w40/${user.country.toLowerCase()}.png`}
                        alt={`${user.country} flag`}
                        className="w-6 h-4"
                      />
                    )}
                    <span>{user.country || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  {user.city || 'N/A'}
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  {user.dateOfBirth || 'N/A'}
                </td>
                <td className="px-4 py-2 border-b text-xs md:text-sm text-gray-600">
                  {user.role || 'N/A'}
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
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <div>
          <label htmlFor="rowsPerPage" className="mr-2 text-xs md:text-sm font-medium text-gray-700">
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