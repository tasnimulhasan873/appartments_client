import React from 'react';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import UseAuth from '../../hooks/UseAuth';
import SocialLogin from './SocialLogin/SocialLogin';
import useAxios from '../../hooks/UseAxios';


const Register = () => {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const { createUser } = UseAuth();
  const navigate = useNavigate();
  const imgbb_api_key = 'ec38464868721c33778fd355631a2d69';

  const axiosInstance = useAxios(); // Not used for now

 const onSubmit = async (data) => {
  try {
    // 1. Upload image
    const imageFile = data.photo?.[0];
    if (!imageFile) {
      toast.error('Please select a profile photo.');
      return;
    }
    const formData = new FormData();
    formData.append('image', imageFile);

    const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbb_api_key}`, {
      method: 'POST',
      body: formData,
    });

    if (!uploadRes.ok) {
      throw new Error('Image upload failed (network)');
    }

    const uploadData = await uploadRes.json();

    if (!uploadData.success) {
      throw new Error('Image upload failed');
    }

    const imageUrl = uploadData.data.display_url;

      // 2. Create user
      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;

      // 3. Update Firebase profile
      await updateProfile(user, {
        displayName: data.name,
        photoURL: imageUrl,
      });

      // 4. Sync to backend (commented for now)
    
      await axiosInstance.post('/users', {
        email: user.email,
        name: data.name,
        photoURL: imageUrl,
      });
     

      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error.message || 'Registration failed, please try again');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-8 font-inter">
      <div className="w-full max-w-md bg-gray-900/80 border border-gray-700/50 rounded-2xl shadow-xl backdrop-blur-lg p-8">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input
              type="text"
              {...formRegister('name', { required: 'Name is required' })}
              placeholder="Enter your name"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 text-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              {...formRegister('email', { required: 'Email is required' })}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 text-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input
              type="password"
              {...formRegister('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 text-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...formRegister('photo', { required: 'Profile photo is required' })}
              className="file-input file-input-bordered w-full bg-gray-800/60 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
          </div>

    

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 font-medium text-white rounded-full shadow-md transition-all bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Register
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-8">
         <SocialLogin />
        </div>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-all">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
