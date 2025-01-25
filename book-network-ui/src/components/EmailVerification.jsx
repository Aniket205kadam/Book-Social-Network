import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../services/AuthService";
import Popup from "./Popup";

function EmailVerification({ length = 6 }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const { email } = useParams();
  const [popup, setPopup] = useState();

  const emailVerificationHandler = async (data) => {
    setError("");
    try {
      let token = "";
      for (let i = 0; i < length; i++) {
        token += data[`num${i}`];
      }
      const response = await authService.activateAccount(token);
      if (response === 200) {
        navigate("/authentication/login");
      }
    } catch (error) {
      setError(error.message);
      if (error.message != "Invalid token") {
        setEmailSend(true);
      }
    }
  };

  const resendEmail = async () => {
    try {
      const response = await authService.resendEmail(email);
      if (response === 200) {
        setPopup(
          <Popup
            bgColor={`bg-green-300`}
            heading={"Resend Email Successfull"}
            msg={`Your token has been resent to your email address: ${
              email.substring(0, 3) +
              "****" +
              email.substring(email.indexOf("@"))
            }`}
          />
        );
      }
    } catch (error) {
      <Popup
          bgColor="bg-red-300"
          heading="Failed to resend email"
          msg={`${error.message}`}
        />
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>
                We have sent a code to your email{" "}
                {email.substring(0, 3) +
                  "****" +
                  email.substring(email.indexOf("@"))}
              </p>
            </div>
          </div>

          <div>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(emailVerificationHandler)}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {Array.from({ length }, (_, i) => (
                    <div key={i} className="w-16 h-16">
                      <Input
                        type="text"
                        className="w-12 h-12  flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        {...register(`num${i}`, {
                          required: true,
                        })}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <Button type="submit">Verify Account</Button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>
                    <button
                      className="flex flex-row items-center text-blue-600"
                      onClick={resendEmail}
                    >
                      Resend
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {emailSend ? (
        <Popup
          bgColor={`bg-green-100`}
          heading={"New verification Email Sent"}
          msg={`An email has been sent to your email address: ${email.substring(
            0,
            3
          )}****${email.substring(
            email.indexOf("@")
          )}. Please check your inbox and follow the instructions.`}
        />
      ) : null}
      {popup}
    </div>
  );
}

export default EmailVerification;
