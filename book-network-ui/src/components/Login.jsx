import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import authService from "../services/AuthService";
import { useDispatch } from 'react-redux';
import { login } from '../store/authenticationSlice';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const authenticationHandler = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await authService.authenticate(data);
      dispatch(login({fullName: response.fullName, jwtToken: response.token}))
      setLoading(false);
      navigate("/")
    } catch (error) {
      setError(error.message || "Error occured");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                        relative z-10"
    >
      <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
        Sign in to your account
      </p>
      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/authentication/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(authenticationHandler)} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
        <div className="relative">
          <Input
            label="Email: "
            type="email"
            placeholder="aniketrkadam205@gmail.com"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, "");
              e.target.value = value;
            }}
          />
        </div>
        <div className="relative">
          <Input
            label="Password: "
            type="password"
            placeholder="anik243@625"
            {...register("password", {
              required: true,
            })}
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, "");
              e.target.value = value;
            }}
          />
        </div>
        <div className="relative">
          <Button type="submit">
            {loading ? (
              <div>
                <div>Loading...</div>
              </div>
            ) : (
              <span>Sign in</span>
            )}
          </Button>
        </div>
        </form>
    </div>
  );
}

export default Login;
