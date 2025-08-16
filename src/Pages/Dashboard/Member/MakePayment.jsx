import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // ✅ secure axios
import UseAuth from '../../../hooks/UseAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MakePayment = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure(); // ✅ use secure axios
  const [month, setMonth] = useState('');
  const navigate = useNavigate();

  const { data: agreements = [], isLoading } = useQuery({
    queryKey: ['agreements', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreementsCollection?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const agreement = Array.isArray(agreements)
    ? agreements.find(
        (item) =>
          item.email?.toLowerCase() === user?.email?.toLowerCase()
      )
    : null;

  const handlePayClick = (e) => {
    e.preventDefault();
    if (!month) {
      Swal.fire('Error', 'Please select a month.', 'error');
      return;
    }
    if (!agreement) {
      Swal.fire('Error', 'No agreement found for payment.', 'error');
      return;
    }

    navigate('/dashboard/paymentForm', { state: { agreement, month } });
  };

  if (isLoading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (!agreement) {
    return <p className="text-white text-center">No agreement found for your email.</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg text-white mt-10">
      <h2 className="text-2xl font-bold mb-4">Make Rent Payment</h2>
      <form className="space-y-4" onSubmit={handlePayClick}>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={agreement.email}
            readOnly
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div>
          <label>Floor</label>
          <input
            type="text"
            value={agreement.floor}
            readOnly
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div>
          <label>Block</label>
          <input
            type="text"
            value={agreement.block}
            readOnly
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div>
          <label>Apartment No</label>
          <input
            type="text"
            value={agreement.apartmentNo}
            readOnly
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div>
          <label>Rent</label>
          <input
            type="text"
            value={agreement.rent}
            readOnly
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div>
          <label>Select Month</label>
          <select
            className="w-full bg-gray-800 p-2 rounded"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select month</option>
            <option value="July 2025">July 2025</option>
            <option value="August 2025">August 2025</option>
            <option value="September 2025">September 2025</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-2 rounded font-bold"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default MakePayment;
