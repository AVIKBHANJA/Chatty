import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import socket from "../../socket/socketConnection";

const initialState = {
  isLoading: false,
  error: null,
  token: null,
  user: {},
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchUserSuccess(state, action) {
      state.user = action.payload;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logoutSuccess(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export default slice.reducer;

const { setError, setLoading, loginSuccess, logoutSuccess } =
  slice.actions;

// ** WORKING
export function RegisterUser(formValues, navigate) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    await axios
      .post(
        "/auth/signup",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);

        toast.success("OTP sent successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong!");
      })
      .finally(() => {
        dispatch(setLoading(false));
        //  do navigation logic over here
        if (!getState().auth.error) {
          navigate(`/auth/verify?email=${formValues.email}`);
        }
      });
  };
}

// ** WORKING
export function ResendOTP(email) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/auth/resend-otp",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);

        toast.success("OTP sent successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

// ** WORKING
export function VerifyOTP(formValues, navigate) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/auth/verify",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        const { token, message } = response.data;

        dispatch(loginSuccess(token));

        toast.success(message || "Email Verified successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong!");
      })
      .finally(() => {
        dispatch(setLoading(false));
        //  do navigation logic over here
        if (!getState().auth.error) {
          navigate(`/dashboard`);
        }
      });
  };
}

// ** WORKING
export function LogoutUser(navigate) {
  return async (dispatch, getState) => {
    try {
      dispatch(logoutSuccess());
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log(error);
    }
  };
}

// ** WORKING
export function LoginUser(formValues, navigate) {
  return async (dispatch, getState) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        const { token, message } = response.data;

        dispatch(loginSuccess(token));

        toast.success(message || "Logged in successfully!");
      })
      .catch(function (error) {
        console.log(error);
        dispatch(setError(error));
        toast.error(error?.message || "Something went wrong!");
      })
      .finally(() => {
        dispatch(setLoading(false));
        //  do navigation logic over here
        if (!getState().auth.error) {
          navigate(`/dashboard`);
        }
      });
  };
}
