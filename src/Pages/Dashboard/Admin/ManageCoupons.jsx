import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // ✅ secure version

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure(); // ✅ get secured axios instance
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ code: '', discount: '', description: '' });

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons'); // ✅ uses secure axios
      return res.data;
    },
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post('/coupons', form); // ✅ post with token
      Swal.fire({ icon: 'success', title: 'Coupon Added' });
      setIsModalOpen(false);
      setForm({ code: '', discount: '', description: '' });
      queryClient.invalidateQueries(['coupons']);
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Failed to add coupon' });
    }
  };

  const toggleAvailability = async (id) => {
    try {
      await axiosSecure.put(`/coupons/${id}/toggle`); // ✅ toggle with token
      Swal.fire({
        icon: 'success',
        title: 'Availability updated!',
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(['coupons']);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update availability',
      });
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
          Manage Coupons
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg shadow-md transition-all"
        >
          + Add Coupon
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="text-sm text-purple-300 border-b border-gray-700/50">
            <tr>
              <th className="py-3 px-4">Coupon Code</th>
              <th className="py-3 px-4">Discount (%)</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Availability</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="py-4 px-4" colSpan="4">
                  Loading...
                </td>
              </tr>
            ) : (
              coupons.map((c) => (
                <tr key={c._id} className="border-b border-gray-700/40">
                  <td className="py-3 px-4">{c.code}</td>
                  <td className="py-3 px-4">{c.discount}%</td>
                  <td className="py-3 px-4">{c.description}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleAvailability(c._id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.available
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {c.available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-xl text-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
              Add New Coupon
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-1">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  required
                  value={form.code}
                  onChange={handleInput}
                  placeholder="SUMMER25"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  required
                  value={form.discount}
                  onChange={handleInput}
                  placeholder="25"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  value={form.description}
                  onChange={handleInput}
                  placeholder="Applicable for summer season purchases."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg shadow-md transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
