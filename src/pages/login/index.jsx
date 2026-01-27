/** @format */
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FiLock, FiLogIn, FiUser } from "react-icons/fi";

import Button from "components/ui/Button";
import Input from "components/ui/Input";
import Link from "components/ui/Link";
import { clearAuthError, login } from "store/slices/authSlice";
import { isValidPassword, isValidUsername } from "utils/AuthValidation";

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ password: "", username: "" });
  const navigate = useNavigate();

  const { isAuthenticated, status, error } = useSelector((state) => state.auth);
  const isLoading = status === "loading";

  const passwordError = (formData.password && !isValidPassword(formData.password)) ? "Password is not Valid":"";
  const usernameError = (formData.username && !isValidUsername(formData.username)) ? "Username is no Valid": "";

  const isAllNotValid = !formData.password || !formData.username || usernameError || passwordError;

  // Handling validation and updatinig input value everytime
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Updating input value on every key pressed
    setFormData((prev) => ({ ...prev, [name]: value }));
  
  };

  // Handling submit button in better way
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    dispatch(clearAuthError());
    dispatch(login(data));
  };

  // Handling the demo data and making the validation true
  const handleDemoData = () => {
    setFormData({ username: "mor_2314", password: "83r5^_" });
  };

  // Navigating to the dashboard when user is already logged
  useEffect(() => {
    if (isAuthenticated) {
      confirm("You have successfully logged in or logged already")
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-page w-full min-h-screen flex flex-col items-center justify-center mt-12">
      <div className="bg-surface w-90 max-w-100 shadow-lg flex flex-col rounded-2xl relative border border-subtle">
        <div className="absoulute inset-0 bg-primary/10 w-full rounded-t-2xl p-4 text-center shadow-xs">
          <h2 className="text-lg md:text-xl lg:text-2xl text-main">
            Welcome Back
          </h2>
          <p className="text-base md:text-lg text-muted">
            Sign in to Manage your account
          </p>
        </div>
        <div className="flex-1 px-4 pt-8 pb-4">
          {error && <span className="text-error font-bold">{error}</span>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label={"Enter your username:"}
              leftSpanEl={<FiUser />}
              id={"username"}
              placeholder="mdmunna84880"
              autoComplete="username"
              name="username"
              value={formData.username}
              error={usernameError}
              onChange={handleInputChange}
            />
            <Input
              label={"Enter your password:"}
              leftSpanEl={<FiLock />}
              id={"password"}
              type="password"
              placeholder={"mdmunna@universe"}
              autoComplete="current-password"
              name="password"
              value={formData.password}
              error={passwordError}
              onChange={handleInputChange}
            />
            <Button
              variant="primary"
              leftIcon={<FiLogIn />}
              type="submit"
              disabled={isAllNotValid}
              loading={isLoading}
            >
              Sign In{" "}
            </Button>
          </form>
        </div>
        <div className="w-full text-center">
          <p>
            No account?{" "}
            <Link variant="nav" href="/signup">
              Create one
            </Link>
          </p>
        </div>
        <div className="border-t mx-4 mt-4 border-main/60" />
        <div className="bg-accent/40 m-4 rounded-md p-4">
          <h3>Demo Mode</h3>
          <Button
            variant="transparent"
            className={"p-0"}
            onClick={handleDemoData}
          >
            Tap to auto-fill (mor_2314)
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
