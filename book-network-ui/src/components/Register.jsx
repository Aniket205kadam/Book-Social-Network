import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../services/AuthService";
import Input from "./Input";
import Button from "./Button";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const registrationHandler = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await authService.register(data);
      if (response === 202) {
        navigate(`/email-verification/${data.email}`)
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                        relative z-10"
    >
      <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
        Sign up to create account
      </p>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link
          to="/authentication/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(registrationHandler)} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8" >
        <div className="relative">
          <Input
            type="text"
            label="Firstname"
            placeholder="aniket"
            {...register("firstname", {
              required: true,
            })}
          />
        </div>
        <div className="relative">
          <Input
            label="Lastname: "
            type="text"
            placeholder="kadam"
            {...register("lastname", {
              required: true,
            })}
          />
        </div>
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
              <span>Create Account</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
