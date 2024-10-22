import {useState} from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
const formSchema = z.object({
    username: z
    .string(),
    // .email({ message: "Please enter a valid email address." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});
const Register = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate()
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
    email: "",
    password: "",
  },
});

async function onSubmit(values) {
    try {
      const user = await axios.post("http://localhost:5000/api/auth/register",values)
      console.log("userrr", user);
      if(user.status === 201){
        form.reset();
        navigate("/login")
      }
    } catch (error) {
      console.log("error",error);

      setError("Invalid email or password");
    }
  }


return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-[350px] bg-white shadow-md rounded-md p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-black mb-2">Register</h2>
        <p className="text-gray-600">Enter your username, email and password to register.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            {...form.register("username")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {form.formState.errors.username && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...form.register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...form.register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Register
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-black">
          you have an account?{" "}
          <Link to="/login" className="text-blue-500 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Register