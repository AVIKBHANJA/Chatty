import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import SignupIllustration from "../../images/auth/signup.svg";
import { EnvelopeSimple, Lock, User } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../redux/slices/auth";

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use react-hook-form and Yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(RegisterUser(data, navigate));
    // navigate("/auth/verify");
  };

  return (
    <div className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-screen">
      <div className="flex flex-wrap items-center h-full min-h-screen">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link to="/" className="mb-5.5 inline-block">
              <Logo />
            </Link>

            <p className="2xl:px-20">
              Join Chatty & experience the modern way to connect with people
            </p>

            <span className="mt-15 inline-block">
              <img
                src={SignupIllustration}
                alt="login"
                className="w-64 h-auto object-cover object-center"
              />
            </span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 xl:px-20 4xl:px-44">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>

            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to Chatty
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">
                    <User size={24} />
                  </span>
                </div>
                {errors.name && (
                  <p className="text-red">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">
                    <EnvelopeSimple size={24} />
                  </span>
                </div>
                {errors.email && (
                  <p className="text-red">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">
                    <Lock size={24} />
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red">{errors.password.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Re-Type Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Retype your password"
                    {...register("confirmPassword")}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">
                    <Lock size={24} />
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Create account"
                  className="w-full cursor-pointer border border-primary bg-primary p-4 rounded-lg text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/auth/login" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
