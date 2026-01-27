/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Button from "components/ui/Button";
import Input from "components/ui/Input";
import Link from "components/ui/Link";
import { clearAuthError, login, register } from "store/slices/authSlice";
import { isValidEmail, isValidPassword, isValidUsername } from "utils/AuthValidation";
import { useIdGenerator } from "hooks/useIdGenerator";
import { FiLock, FiMail, FiUser, FiUserPlus } from "react-icons/fi";

function SignUp() {
  const dispatch = useDispatch();
  const getId = useIdGenerator()
  // Tracking form data and updating the form
  const [formData, setFormData] = useState({ id: getId(), username: "", password: "", confirmPass: "",   email: ""});
  const navigate = useNavigate();
  // Authentication state from store
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);
  const isLoading = status === "loading";
  // Initial validation field

  // Handling validation and updatinig input value everytime
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Updating input value on every key pressed
    setFormData((prev) => ({ ...prev, [name]: value }));   
  };
  // Validation logic
  const usernameError = formData.username && !isValidUsername(formData.username) ? "Username is no Valid":"";
  const passwordError = formData.password && !isValidPassword(formData.password) ? "Password is not Valid":"";
  const confirmPassError = formData.confirmPass && formData.password !== formData.confirmPass ? "Confirm Password is not matching":"";
  const emailError = formData.email && !isValidEmail(formData.email) ? "Email is not Valid": "";
  // Tracking valid or not to disable the button
  const isAllNotValid = !formData.username || !formData.password || !formData.confirmPass || !formData.email || usernameError || passwordError || confirmPassError || emailError;

  // Handling submit button and loged in using fakestore user
  const handleSubmit = (e) => {
    e.preventDefault();
    // Destructuring the credential from formdata
    const {id, username, password, email} = formData;
    // Clearing authentication error
    dispatch(clearAuthError());
    // Dispatching register to simulate registration
    dispatch(register({id, username, password, email}))
    .unwrap()
    .then(()=>{
      alert("You have successfully simulated the signup form")
      const shouldLogin = confirm("You are going to sign in using fakestore username and password")
      if(shouldLogin) dispatch(login({username: "mor_2314", password: "83r5^_"}));
    })
    .catch((err)=>{
      console.error("Failed to register:", err);
    })
  };
  // Navigating to the dashboard when user is logged or already logged
  useEffect(() => {
    if (isAuthenticated) {
      confirm("You have successfully logged in or already logged via fakestore users")
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="bg-page w-full min-h-screen flex flex-col items-center justify-center mt-12">
      <div className="bg-surface w-90 max-w-100 shadow-lg flex flex-col rounded-2xl relative border border-subtle">
        <div className="absoulute inset-0 bg-primary/10 w-full rounded-t-2xl p-4 text-center shadow-xs">
          <h2 className="text-lg md:text-xl lg:text-2xl text-main">
            Create Account
          </h2>
          <p className="text-base md:text-lg text-muted">
            Join us to start shopping
          </p>
        </div>
        <div className="flex-1 px-4 pt-8 pb-4">
          {error && <span className="text-error font-bold">{error}</span>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Username field */}
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
            {/* Email field */}
            <Input
              label={"Enter your email address:"}
              leftSpanEl={<FiMail />}
              id={"email"}
              placeholder="mdmunna19434@gmail.com"
              autoComplete="email"
              name="email"
              value={formData.email}
              error={emailError}
              onChange={handleInputChange}
            />
            {/* Password field */}
            <Input
              label={"Enter your new password:"}
              leftSpanEl={<FiLock />}
              id={"password"}
              type="password"
              placeholder={"mdmunna898@3"}
              autoComplete="new-password"
              name="password"
              value={formData.password}
              error={passwordError}
              onChange={handleInputChange}
            />
            {/* Confirm Password field */}
            <Input
              label={"Confirm your entered password:"}
              leftSpanEl={<FiLock />}
              id={"confirmPassword"}
              type="password"
              placeholder={"mdmunna898@3"}
              autoComplete="new-password"
              name="confirmPass"
              value={formData.confirmPass}
              error={confirmPassError}
              onChange={handleInputChange}
            />
            {/* Submit button */}
            <Button
              variant="primary"
              leftIcon={<FiUserPlus />}
              type="submit"
              disabled={isAllNotValid}
              loading={isLoading}
            >
              Sign Up{" "}
            </Button>
          </form>
        </div>
        <div className="w-full text-center">
          <p className="pb-8">
            Already have an account
            <Link variant="nav" href="/login" className={"pl-2 hover:underline"}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
