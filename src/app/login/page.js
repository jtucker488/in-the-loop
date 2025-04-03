"use client";

import ForgotPasswordPage from "../../../components/login-components/forgot-password-page";
import LoginPage from "../../../components/login-components/login-page";
import { useState } from "react";
const LoginDirectoryPage = () => {
  const [page, setPage] = useState("login");
  return (
    <>
      {page === "login" && <LoginPage setPage={setPage} />}
      {page === "forgotPassword" && <ForgotPasswordPage setPage={setPage}/>}
    </>
  );
};

export default LoginDirectoryPage;
