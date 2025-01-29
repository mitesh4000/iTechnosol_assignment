import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import AuthLayout from "./Layouts/authLayout";
import CustomInput from "./components/customInput";
import { loginInput } from "./interface/login.interface";
export default function LoginPage() {
  let navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const loginInputSchema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .required("Password is required")
      .min(6, "Too short")
      .max(50, "Too long"),
  });
  const formik = useFormik({
    validationSchema: loginInputSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: loginInput) => {
      try {
        const response = await axios.post(
          "http://localhost:3200/auth/login",
          values
        );
        localStorage.setItem("token", response.data.token);
        navigate("/");
        console.log(response.data);
      } catch (error: AxiosError | unknown) {
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

  const displayError = (err: string) => {
    setError(err);
    const timeoutId = setTimeout(() => {
      setError(null);
    }, 2000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your account to continue your journey with us."
    >
      {error ? (
        <div className="bg-red-100 rounded p-2">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <CustomInput
            id="email"
            type="email"
            // placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={""} // required
            label="email"
            error={formik.errors.email || ""}
          />
        </div>
        <div className="space-y-2">
          <CustomInput
            id="password"
            name="password"
            type="password"
            label="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password || ""}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-lime-400 hover:bg-lime-300 py-2 rounded"
        >
          Log in
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        {/* <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Forgot password?
        </Link> */}
      </div>
      <div className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-lime-500 hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
