import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { UpdatePassword } from "../../redux/slices/user";
import { LogoutUser } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

// Validation schema using yup
const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters"),
});

export default function UpdatePasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogout = () => {
    dispatch(LogoutUser(navigate));
  };

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
    dispatch(UpdatePassword(data, handleLogout));
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-6">
      {/* Rest of the profile form */}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:max-w-150">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5.5 p-6.5">
            {/* Current Password */}
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Current Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("currentPassword")}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.currentPassword && (
                <p className="text-red text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New password */}
            <div>
              <label className="mb-3 block text-black dark:text-white">
                New password
              </label>

              <input
                type="password"
                placeholder="Choose New Password"
                {...register("newPassword")}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.newPassword && (
                <p className="text-red text-sm">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary py-3 px-6 text-white transition hover:bg-opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
