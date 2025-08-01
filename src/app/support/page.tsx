"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

export default function GetSupportPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center mb-6">
        <button
          type="button"
          aria-label="Go back to profile"
          className="mb-4 text-gray-600 hover:text-gray-800 hover:cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <Image
            src="/back.svg"
            alt="Back"
            width={16}
            height={16}
            className="inline-block mr-2"
          />
        </button>
        <div className="flex-1 px-60 text-center">
          <Image src="/PgBee.png" alt="PgBee Logo"  width={120} height={50} />
        </div>
        {/* Placeholder to center the logo */}
        <div className="w-8" />
      </div>

      {/* Content Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 overflow-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Get Support</h1>
        <p className="text-sm sm:text-base text-gray-700 mb-6">
          We&apos;re here to help! If you have any questions or issues, please check
          out our frequently asked questions below or contact us directly.
        </p>

        <h2 className="text-lg font-semibold mb-3">Frequently Asked Questions</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm sm:text-base mb-6">
          <li>
            <strong>How do I reset my password?</strong> You can reset your
            password by clicking the &quot;Forgot Password&quot; link on the login page.
          </li>
          <li>
            <strong>How can I update my profile information?</strong> Navigate to your
            profile page and click the &quot;Edit Profile&quot; button to update your
            details.
          </li>
          <li>
            <strong>What are the payment options?</strong> We accept all major credit
            cards, debit cards, and UPI payments.
          </li>
        </ol>

        <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
        <p className="text-sm sm:text-base text-gray-700 mb-4">
          If you can&apos;t find the answer you&apos;re looking for, please feel free to
          reach out to our support team.
        </p>
        <p className="text-sm sm:text-base text-gray-700">
          <strong>Email:</strong>  pgbeecompany@gmail.com
        </p>
        <p className="text-sm sm:text-base text-gray-700">
          <strong>Phone:</strong> +91 82814 80448 (Mon-Fri, 9am-6pm IST)
        </p>

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
