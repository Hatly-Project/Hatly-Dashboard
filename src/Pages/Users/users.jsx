import React, { useEffect } from 'react';
import UsersGrid from '../../Componente/UsersGrid/UsersGrid';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/Slices/usersSlice';
import UserNav from '../../Componente/UserNav/UserNav';

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-col w-full ">
        {/* Navigation Bar */}
        <UserNav />

        {/* Main Content */}
        <div className="flex flex-col flex-grow pt-4 md:pt-6 lg:pt-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <UsersGrid />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}