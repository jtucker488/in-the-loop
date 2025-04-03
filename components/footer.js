// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 In The Loop. All rights reserved.</p>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-4">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;