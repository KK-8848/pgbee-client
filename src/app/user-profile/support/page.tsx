"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function TermsPage() {

  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center mb-6">
                <button className='mb-4 text-gray-600 hover:text-gray-800 hover:cursor-pointer' onClick={() => router.push('/profile')}>
                    <Image src="/back.svg" alt="Back" width={16} height={16} className="inline-block mr-2" />
                </button>
        <div className="flex-1 text-center">
          <span className="text-2xl font-extrabold text-yellow-400">Pg</span>
          <span className="text-2xl font-extrabold text-black">Bee</span>
        </div>
        {/* Placeholder to center the logo */}
        <div className="w-8" />
      </div>

      {/* Content Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 overflow-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Get Support</h1>
        <p className="text-sm sm:text-base text-gray-700 mb-4">
          Please read these terms and conditions carefully before using our service.
        </p>

        <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm sm:text-base">
          <li>
            <strong>Age Requirement:</strong> You must be at least 18 years old to register
            and use our platform.
          </li>
          <li>
            <strong>Account Responsibility:</strong> You are responsible for all activity under
            your account and agree to keep your login credentials secure.
          </li>
          <li>
            <strong>Accurate Information:</strong> All personal information you provide must be
            accurate and up to date.
          </li>
          <li>
            <strong>Content License:</strong> By posting content you grant us a worldwide,
            royalty-free license to use, display, and distribute it.
          </li>
          <li>
            <strong>Prohibited Conduct:</strong> You agree not to misuse the service (no spam,
            abuse, hacking, or harmful behavior).
          </li>
          <li>
            <strong>Termination:</strong> We may suspend or terminate your account for breaches
            of these terms, without notice.
          </li>
          <li>
            <strong>Warranty Disclaimer:</strong> The service is provided “as is” without any
            warranties. Use at your own risk.
          </li>
          <li>
            <strong>Changes to Terms:</strong> We may update these terms at any time; continued
            use constitutes acceptance of the new terms.
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