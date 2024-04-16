import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({ firstName: "",lastName: "", password: "", email: "" })

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }
  const submit = async (e) => {
    e.preventDefault();
    console.log(Inputs);
    try {
        const response = await axios.post("http://localhost:5555/api/auth/register", Inputs);
        navigate("/login");
    } catch (error) {
        console.log(" Status is --> ",error.response.status);
        // if(error.response.status === 500) alert(" Khel lia ");
        alert(error.response.data.message);
    }
    
    
        

    
  }

  return (
    <div className="container-fluid h-100 ">
      <div className="row h-100 justify-content-center align-items-center signup">
        <div className="col-md-10 col-lg-6 col-xl-6">
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Sign Up</h3>
              <form>
                {/* Username Input */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    firstName
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={change}
                    value={Inputs.firstName}
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your firstName"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    lastName
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={change}
                    value={Inputs.lastName}
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your lastName"
                  />
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={change}
                    value={Inputs.email}
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
                    type="password"
                    name="password"
                    value={Inputs.password}
                    onChange={change}
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Signup Button */}
                <button type="submit" className="btn btn-secondary w-100" onClick={submit}>
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
