import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from "../../components/Logo";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ResendOTP, VerifyOTP } from "../../redux/slices/auth";

// Yup schema for validation
const otpSchema = yup.object().shape({
  otp: yup
    .array()
    .of(yup.string().matches(/^\d$/, "Must be a digit"))
    .length(4, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

export default function OTPVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: ["", "", "", ""] },
  });

  const inputRefs = useRef([]);
  const email = new URLSearchParams(location.search).get("email");

  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); // Automatically focus on the first input
    }
  }, []);

  // Timer effect for disabling the resend button
  useEffect(() => {
    if (resendDisabled) {
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) return prev - 1;
          setResendDisabled(false); // Enable the button when timer hits 0
          return 0;
        });
      }, 1000);

      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }
  }, [resendDisabled]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      // Valid digit input
      setValue(`otp[${index}]`, value, { shouldValidate: true });
      if (index < 3) {
        inputRefs.current[index + 1]?.focus(); // Shift focus to next input
      }
    } else if (value === "") {
      // Handle backspace key
      setValue(`otp[${index}]`, "");
      if (index > 0 && e.nativeEvent.inputType === "deleteContentBackward") {
        inputRefs.current[index - 1]?.focus(); // Shift focus to previous input
      }
    }
  };

  const handleResendOTP = async () => {
    // Reset the timer and disable the button
    setResendDisabled(true);
    setTimer(60);

    try {
      dispatch(ResendOTP(email));
      console.log("OTP resent successfully");
    } catch (error) {
      console.error("Error resending OTP", error);
    }
  };

  const onSubmit = async (data) => {
    const otp = data.otp.join(""); // Combine the 4 digits into one string
    try {
      // Send OTP and email to your API
      dispatch(VerifyOTP({ email, otp }, navigate));
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  return (
    <div className="overflow-hidden px-4 dark:bg-boxdark-2 sm:px-8">
      <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="no-scrollbar overflow-y-auto py-20">
          <div className="mx-auto w-full max-w-[480px]">
            <div className="text-center">
              <Link to="/" className="mx-auto mb-10 inline-flex">
                <Logo />
              </Link>

              <div className="bg-white p-4 shadow-14 rounded-xl dark:bg-boxdark lg:p-7.5 xl:p-12.5">
                <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-black dark:text-white capitalize">
                  Verify your account
                </h1>

                <p className="mb-7.5 font-medium">
                  Enter the 4-digit code sent to the registered email: {email}.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center gap-4.5">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Controller
                        key={index}
                        name={`otp[${index}]`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            ref={(el) => (inputRefs.current[index] = el)} // Assign refs to inputs
                            type="text"
                            maxLength="1"
                            className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Backspace" &&
                                getValues(`otp[${index}]`) === ""
                              ) {
                                // Shift focus to previous input if current is empty on backspace
                                inputRefs.current[index - 1]?.focus();
                              }
                            }}
                          />
                        )}
                      />
                    ))}
                  </div>

                  {errors.otp && (
                    <p className="mt-2 text-red-600">{errors.otp.message}</p>
                  )}

                  <p className="mb-5 mt-4 text-left font-medium text-black dark:text-white space-x-2 flex flex-row items-center">
                    <div>Did not receive a code?</div>
                    <button
                      type="button"
                      className="text-primary"
                      onClick={handleResendOTP}
                      disabled={resendDisabled}
                    >
                      Resend {resendDisabled && `(${timer}s)`}
                    </button>
                  </p>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary p-[13px] font-bold text-gray hover:bg-opacity-90"
                  >
                    Verify
                  </button>

                  <span className="mt-5 block text-red">
                    Don't share the verification code with anyone!
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
