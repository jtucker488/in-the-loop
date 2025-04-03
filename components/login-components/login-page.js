"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import EmailInputLogin from "./email-input-login";
import PasswordInputLogin from "./password-input-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FcGoogle } from "react-icons/fc";
import AppleIcon from "@mui/icons-material/Apple";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginPage({ setPage }) {
  const dispatch = useDispatch();
  const redux_info = useSelector((state) => state.login);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
 


  const onSubmit = async () => {
    try {
      const { email, password } = redux_info; // Ensure redux_info contains email and password
      if (!email || !password) {
        setErrorMessage("Email and password are required.");
        return;
      }
  
      // Use await to handle the asynchronous call
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      // Successfully signed in
      console.log("Login successful!", userCredential);
      router.push("/organizer-events"); // Redirect after successful login
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
      console.error("Login error:", error.message);
    }
  };


  return (
    <div className="flex justify-center py-16">
      <div className="flex flex-col gap-4 px-8 bg-neutral-900 w-[700px] rounded">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 pb-8 w-[300px]">
            <h1 className="text-white text-xl font-bold mb-8 inline-flex justify-center">
              Log in
            </h1>
            {/* <button
              type="button"
              className="rounded-full w-[300px] text-white text-sm font-semibold border border-neutral-400 flex items-center gap-12 px-4 py-3 cursor-pointer hover:border-white"
            >
              <FcGoogle />
              <p className="text-base">Log in with Google</p>
            </button>
            <button
              type="button"
              className="rounded-full w-[300px] text-white text-sm font-semibold border border-neutral-400 flex items-center gap-12 px-4 py-3 cursor-pointer hover:border-white"
            >
              <FacebookIcon style={{ color: "#1877F2" }} />
              <p className="text-base">Log in with Facebook</p>
            </button>
            <button
              type="button"
              className="rounded-full w-[300px] text-white text-sm font-semibold border border-neutral-400 flex items-center gap-12 px-4 py-3 cursor-pointer hover:border-white"
            >
              <AppleIcon />
              <p className="text-base">Log in with Apple</p>
            </button>

            <hr className="my-6 border-t border-neutral-500" /> */}

            {/* Email Input */}
            <EmailInputLogin />
            <PasswordInputLogin />

            {/* Error Message Display */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <button
              type="submit"
              onClick={onSubmit}
              className="create-button rounded bg-brand-blue w-full text-input-text-color py-2 px-4"
            >
              Sign in
            </button>
            <a onClick={() => setPage("forgotPassword")}>
              <p className="text-base hover:text-brand-blue underline cursor-pointer">
                Forgot Password
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
