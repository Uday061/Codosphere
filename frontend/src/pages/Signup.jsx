import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({ firstName: "", lastName: "", password: "", email: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/api/auth/register", Inputs);
      navigate("/login");
    } catch (error) {
      console.log(" Status is --> ",error.response.status);
      alert(error.response.data.message);
    }

  };

  return (
   

    <div className="min-h-screen flex justify-center items-center bg-blue-100 bg-custom-bg bg-cover bg-center bg-fixed min-h-screen overflow-hidden" >
      <div className="max-w-md w-full p-8 bg-blue-200 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onChange={change}
              value={Inputs.firstName}
              className="mt-1 block w-full rounded-md border-blue-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              id="firstName"
              placeholder="Enter your first name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onChange={change}
              value={Inputs.lastName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              id="lastName"
              placeholder="Enter your last name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={change}
              value={Inputs.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={Inputs.password}
              onChange={change}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button onClick={submit} type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
   
  );
};

export default Signup;
