"use client";

import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <div className="app">
      <div className="login">
        <div className="" />
        <div className="container mx-auto justify-center text-center h-96 w-96 bg-neutral-200 mt-20">
          <div className=" pt-4 flex container mx-auto flex-col text-center justify-center">
            <h1>Sign In</h1>
          </div>
          <button
            className="mt-4 border-2 p-2 border-black"
            onClick={() => signInWithGoogle()}
          >
            Click
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
