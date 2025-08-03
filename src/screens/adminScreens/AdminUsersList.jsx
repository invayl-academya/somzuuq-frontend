import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  deleteUserById,
  getAllUsers,
  updateUserAdmiStatus,
} from "@/redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminUsersList = () => {
  const {
    users,
    isLoading: loadingUsers,
    error: userError,
    usersFetched,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // console.log("users", users);
  useEffect(() => {
    if (!usersFetched) {
      dispatch(getAllUsers());
    }
  }, [dispatch, usersFetched]);
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        All Users
      </h2>

      {loadingUsers ? (
        <Loading />
      ) : userError ? (
        <div className="text-red-500 text-center font-medium">{userError}</div>
      ) : users?.length === 0 ? (
        <div className="text-gray-500 text-center">No users found</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Clearance</th>
                <th className="px-6 py-4">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                        Admin
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
                        Customer
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{user.orders?.length || 0}</td>
                  {user && user.isAdmin ? (
                    <td className="px-6 py-4">
                      <Button
                        className={`bg-slate-500 ${
                          user.isAdmin ? "bg-orange-500" : "bg-green-400"
                        }`}
                        variant="outline"
                        onClick={() =>
                          dispatch(updateUserAdmiStatus(user._id))
                            .unwrap()
                            .then(() => {
                              dispatch(getAllUsers());
                              toast.success("Updated user Status");
                            })
                        }
                      >
                        {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                      </Button>
                    </td>
                  ) : (
                    <td className="px-6 py-4">
                      <Button>No Clearance </Button>
                    </td>
                  )}

                  <td className="px-6 py-4">
                    <Button
                      onClick={() =>
                        dispatch(deleteUserById(user._id))
                          .unwrap()
                          .then((res) => {
                            dispatch(getAllUsers());
                            toast.success(
                              res?.data || "Deleted user succesfully"
                            );
                          })
                      }
                    >
                      Delete{" "}
                    </Button>
                  </td>
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
