import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import UseAuth from '../../hooks/UseAuth';
import SocialLogin from './SocialLogin/SocialLogin';



const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUser, loading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = async ({ email, password }) => {
    try {
      const result = await signUser(email, password);
      console.log('Logged in user:', result.user);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error.message);
      if (error.code === 'auth/account-exists-with-different-credential') {
        alert('This email is already registered with Google. Please use Google login instead.');
      } else if (error.code === 'auth/invalid-credential') {
        alert('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        alert('No user found with this email.');
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-8 font-inter">
      <div className="w-full max-w-md bg-gray-900/80 border border-gray-700/50 rounded-2xl shadow-xl backdrop-blur-lg p-8">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-8">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <FaEnvelope className="absolute left-3 top-11 text-gray-500" />
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 text-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <FaLock className="absolute left-3 top-11 text-gray-500" />
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 7, message: 'Minimum 7 characters required' }
              })}
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 text-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a className="text-sm text-purple-400 hover:text-purple-300 transition-all cursor-pointer">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 font-medium text-white rounded-full shadow-md transition-all bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging in...
              </span>
            ) : 'Login'}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-8">
         <SocialLogin />
        </div>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-400 mt-8">
          Don’t have an account?{' '}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-all">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
