import React, { useState } from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({ email: "", password: "" })
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }
  const submit = async (e) => {
    e.preventDefault();
    //console.log(Inputs);


    try {
      const response = await axios.post("http://localhost:5555/api/auth/login", Inputs) 
      const token =  await response.data.token;
      const user=  await response.data.user;
      console.log(user)
      sessionStorage.setItem("token", token);

      dispatch(authActions.login({user:user}));
    
    } catch (error) {
        
    }


    
  }


  return (
    <div className="container-fluid h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="md:col-span-10 lg:col-span-8 xl:col-span-6">
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Sign In</h3>
              <form>
                {/* Username Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    onChange={change}
                    value={Inputs.email}
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    value={Inputs.password}
                    onChange={change}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Sign In Button */}
                <button onClick={submit} type="submit" className="btn btn-secondary w-full">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;