import { Loading } from "@/components/Loading";
import { getAllUsers } from "@/redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminUsersList = () => {
  const {
    users,
    isLoading,
    error: userError,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  console.log("users", users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="max-w-6xl w-full px-3">
      <h2 className="text-2xl font-bold text-center mb-8">all users</h2>

      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : userError ? (
        <div>{userError}</div>
      ) : users?.length === 0 ? (
        <div> No users found </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200  text-md ">
            <thead className="bg-gray-50 text-gray-600  font-semibold text-left">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">NAME</th>
                <th className="px-4 py-3">EMAIL</th>
                <th className="px-4 py-3">ROLE</th>
                <th className="px-4 py-3">Orders</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-4 py-3"> {index + 1}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>

                  <td className="px-4 py-3">
                    {user.isAdmin ? (
                      <span className="inine-block px-2 py-1 text-sm font-semibold text-green-800 bg-green-100  rounded-full">
                        Admin
                      </span>
                    ) : (
                      <span className="inine-block px-2 py-1 text-sm font-semibold text-gray-800 bg-gray-100  rounded-full">
                        Customer
                      </span>
                    )}
                  </td>
                  <td>{user.orders?.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersList;
