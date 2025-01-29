import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import AuthLayout from "./Layouts/authLayout";
import CustomInput from "./components/customInput";
import { registerInput } from "./interface/login.interface";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);

  const loginInputSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Too short")
      .max(50, "Too long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const displayError = (err: string) => {
    setError(err);
    const timeoutId = setTimeout(() => {
      setError(null);
    }, 2000);
    return () => clearTimeout(timeoutId);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: loginInputSchema,
    onSubmit: async (values: registerInput) => {
      try {
        const response = await axios.post(
          "http://localhost:3200/auth/register",
          values
        );
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          const errorMessage =
            axiosError.response?.data?.error ||
            axiosError.message ||
            "An unexpected error occurred";
          displayError(errorMessage);
        } else {
          displayError("An unexpected error occurred");
          console.error("Unknown Error:", error);
        }
      }
    },
  });

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join us today and start your journey with our platform."
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="space-y-2">
          <CustomInput
            id="userName"
            name="userName"
            label="User Name"
            type="text"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.errors.userName}
          />
        </div>
        <div className="space-y-2">
          <CustomInput
            name="email"
            id="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
        </div>
        <div className="space-y-2">
          <CustomInput
            name="password"
            label="Password"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
        </div>

        <div className="space-y-2">
          <CustomInput
            name="confirmPassword"
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600"
        >
          Sign up
        </button>
      </form>
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-lime-600 hover:underline">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}
