import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // updated here
import Swal from 'sweetalert2';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#fff',
      '::placeholder': {
        color: '#aaa',
      },
      iconColor: '#a78bfa',
    },
    invalid: {
      color: '#f87171',
      iconColor: '#f87171',
    },
  },
  hidePostalCode: true,
};

const PaymentForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxiosSecure(); // updated here

  const stripe = useStripe();
  const elements = useElements();

  const { agreement, month } = state || {};

  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountedRent, setDiscountedRent] = useState(agreement?.rent || 0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponMessageType, setCouponMessageType] = useState(''); // 'success' or 'error'

  const applyCoupon = async () => {
    const trimmedCode = couponCode.trim();
    if (!trimmedCode) {
      setCouponMessage('Please enter a coupon code.');
      setCouponMessageType('error');
      return;
    }

    try {
      const response = await axiosInstance.get(`/coupons?code=${trimmedCode.toUpperCase()}`);

      const coupon = response.data;

      if (coupon && coupon.discount && coupon.available) {
        const discountAmount = (agreement.rent * coupon.discount) / 100;
        setDiscountedRent(agreement.rent - discountAmount);
        setCouponApplied(true);
        setCouponMessage(`Coupon applied! You saved ${discountAmount.toFixed(2)}৳.`);
        setCouponMessageType('success');
      } else {
        setCouponMessage('This coupon is not available.');
        setCouponMessageType('error');
      }
    } catch (error) {
      setCouponMessage(error.response?.data?.message || 'Invalid coupon.');
      setCouponMessageType('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return setCardError('Stripe has not loaded yet.');
    }

    setProcessing(true);
    setCardError('');
    setSuccess('');

    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError('Card element not found.');
      setProcessing(false);
      return;
    }

    try {
      const amountInCents = Math.round(discountedRent * 100);

      const { data: paymentIntentResponse } = await axiosInstance.post('/create-payment-intent', {
        amount: amountInCents,
      });

      const clientSecret = paymentIntentResponse.clientSecret;
      if (!clientSecret) throw new Error('No clientSecret from server');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: agreement.name,
            email: agreement.email,
          },
        },
      });

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        const paymentData = {
          name: agreement.name,
          email: agreement.email,
          floor: agreement.floor,
          block: agreement.block,
          apartmentNo: agreement.apartmentNo,
          rent: discountedRent,
          month,
          paymentDate: new Date(),
          status: 'paid',
          transactionId: paymentIntent.id,
        };

        const res = await axiosInstance.post('/payments', paymentData);
        if (!res.data.insertedId) {
          throw new Error('Failed to save payment data.');
        }

        setSuccess('Payment successful! Thank you.');
        Swal.fire('Success!', 'Payment completed successfully.', 'success');
        navigate('/dashboard/paymentHistory');
      } else {
        setCardError(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      setCardError(err.message || 'Payment failed');
    }

    setProcessing(false);
  };

  if (!agreement || !month) {
    return (
      <div className="text-center mt-20 text-white">
        <p>No payment information found.</p>
        <button
          onClick={() => navigate('/make-payment')}
          className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Go back to Payment Form
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg text-white mt-10">
      <h2 className="text-2xl font-bold mb-4">Complete Rent Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input readOnly value={agreement.email} className="w-full bg-gray-800 p-2 rounded" />
        <input readOnly value={agreement.floor} className="w-full bg-gray-800 p-2 rounded" />
        <input readOnly value={agreement.block} className="w-full bg-gray-800 p-2 rounded" />
        <input readOnly value={agreement.apartmentNo} className="w-full bg-gray-800 p-2 rounded" />
        <input readOnly value={`${discountedRent}৳`} className="w-full bg-gray-800 p-2 rounded" />
        <input readOnly value={month} className="w-full bg-gray-800 p-2 rounded" />

        {/* Coupon input and message */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-grow bg-gray-800 p-2 rounded"
            disabled={couponApplied}
          />
          <button
            type="button"
            onClick={applyCoupon}
            disabled={couponApplied}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-semibold"
          >
            Apply
          </button>
        </div>
        {couponMessage && (
          <p
            className={`mt-1 text-sm font-medium ${
              couponMessageType === 'success' ? 'text-green-400' : 'text-red-500'
            }`}
          >
            {couponMessage}
          </p>
        )}

        <label className="block mt-2 mb-1">Card Details</label>
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>

        <button
          type="submit"
          disabled={processing || !stripe}
          className={`w-full py-2 rounded font-bold text-white mt-4 ${
            processing
              ? 'bg-purple-700 cursor-wait'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>

        {cardError && <p className="mt-4 text-red-500 font-semibold">{cardError}</p>}
        {success && <p className="mt-4 text-green-400 font-semibold">{success}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
