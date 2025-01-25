import React from "react";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
  <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
        <Logo />
        <p className="max-w-xs mt-4 text-sm text-white">
          Bringing you the best digital experience.
        </p>
        <div className="flex mt-8 space-x-6 text-white">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
            <span className="sr-only">Facebook</span>
            {/* SVG Icon */}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
            <span className="sr-only">Instagram</span>
            {/* SVG Icon */}
          </a>
          {/* Other Social Links */}
        </div>
      </div>
      <div>
        <h5 className="font-bold">Quick Links</h5>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bold">Contact</h5>
        <p className="mt-4 text-sm">123 Digital Ave, Suite 100<br />City, State 12345</p>
        <p className="mt-2 text-sm">Email: support@example.com</p>
      </div>
    </div>
  </div>
</footer>

  );
}

export default Footer;
