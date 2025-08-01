"use client";

import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!captchaChecked) {
      alert("Please verify that you're not a robot.");
      valid = false;
    }

    if (valid) {
      setIsLoading(true);
      try {
        const success = await login(email, password);
        if (success) {
          setShowModal(true);
          setEmail("");
          setPassword("");
          setCaptchaChecked(false);
        } else {
          alert("Invalid credentials. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        router.push("/dashboard");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal, router]);

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center relative">
      {/* Logo Heading */}
       <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 mt-4">
             <Image src="/PgBee.png" alt="PgBee Logo" width={120} height={50} />
           </div>

      {/* Login Card */}
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl z-10">
        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
          <button onClick={() => router.push("/auth/signup")} className="w-1/2 py-2 bg-white text-black font-medium">Sign up</button>
          <button className="w-1/2 py-2 bg-black text-white font-medium">Log in</button>
        </div>

    

        <div className="flex items-center justify-center mb-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        <div className="mb-2">
          <label className="block text-sm mb-1 text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <div className="text-right mb-4">
          <a href="#" className="text-sm text-gray-500 hover:underline">Forgot Your Password?</a>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1 text-gray-700">Verify Captcha</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
            <input type="checkbox" checked={captchaChecked} onChange={() => setCaptchaChecked(!captchaChecked)} />
            <span className="text-sm">I’m not a robot</span>
            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="h-6 ml-auto" />
          </div>
        </div>

        <button 
          onClick={handleLogin} 
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700">Login successful!</p>
          </div>
        </div>
      )}
    </div>
  );
}
