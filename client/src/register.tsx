import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./Layouts/authLayout";
import CustomInput from "./components/customInput";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration submitted", { name, email, password });
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join us today and start your journey with our platform."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name">Full Name</label>
          <CustomInput
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <CustomInput
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <CustomInput
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full">
          Sign up
        </button>
      </form>
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}
