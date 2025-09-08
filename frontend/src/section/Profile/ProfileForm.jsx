import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserOne from "../../images/user/user-01.png";
import { Camera } from "@phosphor-icons/react";
import SelectInput from "../../components/Form/SelectInput";
import { uploadToSupabase } from "../../utils/supabase"; // Supabase utility for image upload
import { useDispatch, useSelector } from "react-redux";
import { UpdateAvatar, UpdateMe } from "../../redux/slices/user";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  jobTitle: yup.string().required("Job title is required"),
  bio: yup.string().required("Bio is required"),
  country: yup.string().required("Country is required"),
});

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [avatarUrl, setAvatarUrl] = useState(user?.avatar ? user.avatar : UserOne);
  const [imageFile, setImageFile] = useState(null);


  const defaultValues = {
    name: user?.name || "",
    jobTitle: user?.jobTitle || "",
    bio: user?.bio || "",
    country: user?.country || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // Handle avatar file change and upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file for the API call
      try {
        const publicUrl = await uploadToSupabase(file);
        console.log(publicUrl);
        setAvatarUrl(publicUrl); // Update avatar preview with the new image

        // make API call to server to update Avatar
        dispatch(
          UpdateAvatar({
            avatar: publicUrl,
          })
        );
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Make an API call to update the profile with the form data
      const profileData = {
        name: data.name,
        jobTitle: data.jobTitle,
        bio: data.bio,
        country: data.country,
        // avatarUrl, // Use the uploaded avatar URL
      };

      console.log("Profile Data:", profileData);
      dispatch(UpdateMe(profileData));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-6">
      {/* Image picker */}
      <div className="relative z-30 w-full rounded-full p-1 backdrop-blur sm:max-w-36 sm:p-3">
        <div className="relative drop-shadow-2">
          <img
            src={avatarUrl}
            alt="Profile"
            className="rounded-full h-20 w-20 object-center object-cover"
          />
          <label
            htmlFor="profile"
            className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2 p-2"
          >
            <Camera size={20} />
            <input
              type="file"
              name="profile"
              id="profile"
              className="sr-only"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* Rest of the profile form */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:max-w-150">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5.5 p-6.5">
            {/* Name */}
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.name && <p className="text-red">{errors.name.message}</p>}
            </div>

            {/* Job Title */}
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Enter your Job Title"
                {...register("jobTitle")}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.jobTitle && (
                <p className="text-red">{errors.jobTitle.message}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Bio
              </label>
              <input
                type="text"
                placeholder="Enter your bio"
                {...register("bio")}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.bio && <p className="text-red">{errors.bio.message}</p>}
            </div>

            {/* Country */}
            <SelectInput register={register} />

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
