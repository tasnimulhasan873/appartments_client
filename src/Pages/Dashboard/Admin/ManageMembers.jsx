import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import NeonLoader from '../../../NeonLoader';

const ManageMembers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/users');
      const users = res.data;
      return users.filter(user => user?.role?.toLowerCase() === 'member');
    },
  });

  const mutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/api/users/demote/${email}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Member demoted to user.', 'success');
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: () => {
      Swal.fire('Error', 'Failed to remove member.', 'error');
    }
  });

  if (isLoading) {
    return <NeonLoader />;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 min-h-screen font-inter">
      <div className="max-w-6xl mx-auto bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-xl md:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 text-gray-300">
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400">
          Manage Members
        </h1>

        <div className="overflow-x-auto rounded-lg">
          {/* Mobile Cards View */}
          <div className="md:hidden space-y-4">
            {members.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                No members found.
              </div>
            ) : (
              members.map((user) => (
                <div key={user._id} className="bg-gray-800/50 rounded-lg p-4 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/7QZGsBD/avatar.png'}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border border-purple-500"
                    />
                    <div>
                      <p className="font-medium">{user.name || 'N/A'}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => mutation.mutate(user.email)}
                    className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md transition-all flex items-center justify-center"
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Remove Member
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table View */}
          <table className="hidden md:table w-full text-base text-gray-300">
            <thead className="text-left text-gray-400">
              <tr>
                <th className="py-3">User Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {members.map((user) => (
                <tr key={user._id} className="hover:bg-gray-800/50 transition-all">
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/7QZGsBD/avatar.png'}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border border-purple-500"
                    />
                    {user.name || 'N/A'}
                  </td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">
                    <button
                      onClick={() => mutation.mutate(user.email)}
                      className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md transition-all"
                    >
                      <FaTrashAlt className="inline-block mr-2" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-400 py-6">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;