"use client";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailValid, setEmailValid] = useState<null | boolean>(null);
  const [showModal, setShowModal] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignup = async () => {
    if (!firstName || !lastName) {
      alert("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (!agreeTerms) {
      alert("You must agree to the terms to sign up.");
      return;
    }


    try {
      await fetchDetails();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  useEffect(() => {
    if (email === "") {
      setEmailValid(null);
    } else {
      setEmailValid(validateEmail(email));
    }
  }, [email]);



  const role = "student";

  const fetchDetails = async () => {
    // REAL BACKEND CALL:
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.73:8080"}/auth/signup`, {
        name: `${firstName} ${lastName}`,
        email,
        password,
        role
      });

      if (response.status === 201) {
        setShowModal(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setAgreeTerms(false);
        router.push("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      alert("Something went wrong. Please try again.");
      setShowModal(false);
    }
  };
  
  const handleGoogleSignup = () => {
    // Redirect to backend Google OAuth endpoint
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.73:8080";
    window.location.href = `${baseURL}/auth/google`;
  };

  return (
    <div className="relative min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center overflow-hidden">
      {/* Logo Heading */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 mt-4">
        <Image src="/PgBee.png" alt="PgBee Logo" width={120} height={50} />
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl z-10">
        {/* Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
          <button className="w-1/2 py-2 bg-black text-white font-medium">Sign up</button>
          <button
            onClick={() => router.push("/login")}
            className="w-1/2 py-2 bg-white text-black font-medium"
          >
            Log in
          </button>
        </div>

        {/* Google Sign Up */}
        <button onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded-xl mb-6 hover:bg-gray-100">
          <FcGoogle size={24} />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center mb-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* First and Last Name */}
        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label className="block text-sm mb-1 text-gray-700">
  First name <span className="text-red-500">*</span>
</label>

            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1 text-gray-700">
  Last name <span className="text-red-500">*</span>
</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-2">
           <label className="block text-sm mb-1 text-gray-700">
  Email <span className="text-red-500">*</span>
</label>

          <input
            type="email"
            placeholder="Enter your email address"
            className={`w-full px-4 py-2 border ${emailValid === false ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 ${emailValid === false ? "focus:ring-red-500" : "focus:ring-black"}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailValid === false && (
            <p className="text-red-500 text-sm mt-1">❌ Please enter a valid email address</p>
          )}
          {emailValid === true && (
            <p className="text-green-600 text-sm mt-1">✅ Valid email address</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">
  Password <span className="text-red-500">*</span>
</label>

          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md pr-4 focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 mb-6 text-sm">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
            className="mt-1"
          />
          <p className="text-gray-700">
            By creating an account, I agree to the{" "}
             <a href="/terms" className="text-blue-600 underline">Terms of use</a> and{" "}
            <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>. 
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800"
          disabled={!agreeTerms}
        >
          Sign Up
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700">Creating your account...</p>
          </div>
        </div>
      )}
    </div>
  );
}