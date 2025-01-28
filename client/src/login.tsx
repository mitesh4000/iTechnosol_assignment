import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./Layouts/authLayout";
import CustomInput from "./components/customInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted", { email, password });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your account to continue your journey with us."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <CustomInput
            id="email"
            type="email"
            // placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={""} // required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <CustomInput
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full">
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
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
