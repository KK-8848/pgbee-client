"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center mb-6">
        <Link
          href="/userDashboard/userProfile"
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Back"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </Link>
        <div className="flex-1 text-center">
          <span className="text-2xl font-extrabold text-yellow-400">Pg</span>
          <span className="text-2xl font-extrabold text-black">Bee</span>
        </div>
        {/* Placeholder to center the logo */}
        <div className="w-8" />
      </div>

      {/* Content Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 overflow-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm sm:text-base text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our application.
        </p>

        <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm sm:text-base">
          <li>
            <strong>Information Collection:</strong> We collect information you provide directly
            (e.g., during sign-up), and data related to your usage.
          </li>
          <li>
            <strong>Use of Data:</strong> We use the collected data to provide and improve the
            service, enhance user experience, and ensure security.
          </li>
          <li>
            <strong>Data Sharing:</strong> We do not sell your data. We may share it with
            third-party services strictly for operations, such as analytics or hosting.
          </li>
          <li>
            <strong>Cookies and Tracking:</strong> We use cookies and similar technologies to
            track usage and preferences.
          </li>
          <li>
            <strong>Data Security:</strong> We implement security measures to protect your
            information, but no method of transmission is 100% secure.
          </li>
          <li>
            <strong>User Rights:</strong> You can request access, correction, or deletion of
            your personal data by contacting us.
          </li>
          <li>
            <strong>Policy Updates:</strong> We may update this policy. Continued use of the
            platform means you agree to the updated terms.
          </li>
        </ol>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-2 rounded-xl text-sm sm:text-base hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}