// components/Footer.tsx
import { FaWhatsapp, FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
   <footer className="w-full bg-gray-100 text-gray-700 py-4 px-6 flex flex-col md:flex-row justify-between items-center border-t">
      {/* Left side */}
      <div className="text-sm space-x-4 mb-2 md:mb-0">
        <span>© 2025 PGBee</span>
        <span>Privacy</span>
        <span>Terms</span>
        <span>Company details</span>
      </div>

      {/* Right side (social icons) */}
      <div className="flex space-x-4 text-lg">
        <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="hover:text-green-600"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://instagram.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-pink-600"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-blue-600"
        >
          <FaFacebook />
        </a>
        <a
          href="https://twitter.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="hover:text-black"
        >
          <FaXTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
