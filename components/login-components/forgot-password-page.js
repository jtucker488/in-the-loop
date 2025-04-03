"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { IoIosArrowBack } from "react-icons/io"; // Import the arrow icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function ForgotPasswordPage({ setPage }) {
  const [email, setEmail] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Send the password reset email
  async function create(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessfulCreation(true);
      setError("");
      console.log("Password reset email sent to:", email);
    } catch (err) {
      console.error("Error sending password reset email:", err.message);
      setError(err.message);
    }
  }

  return (
    <div
      style={{
        maxWidth: "500px",
      }}
      className="flex flex-col bg-neutral-800 p-4 rounded-lg mt-[150px] mx-auto"
    >
      {!successfulCreation && (
        <p className="text-2xl item-center mt-0 mb-10 text-center">
          Forgot Password?
        </p>
      )}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
        onSubmit={create}
      >
        {!successfulCreation && (
          <>
            <p className="text-lg text-center">
              Enter the email associated with this account and we will send you
              a password reset email.
            </p>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              placeholder="e.g john@doe.com"
              value={email}
              className="bg-neutral-700 font-normal w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex flex-row justify-center">
              <button className="bg-brand-blue w-[60%] rounded-full text-lg px-4 py-2">
                Send Password Reset Email
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <p className="text-lg text-center text-green-500">
              Password reset email sent successfully! Please check your inbox.
            </p>
          </>
        )}
      </form>

      {/* Back to Login with White Arrow */}
      <div
        className="flex justify-start items-center mt-4 cursor-pointer"
        onClick={() => setPage("login")}
      >
        <ArrowBackIcon />{" "}
      </div>
    </div>
  );
}
