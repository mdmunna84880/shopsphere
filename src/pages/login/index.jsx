/** @format */

import Button from "components/ui/Button";
import Link from "components/ui/Link";
import InputGallery from "InputGallery";

function Login() {
  return (
    <div className="bg-page w-full min-h-screen flex flex-col items-center justify-center">
      <div className="bg-surface w-100 shadow-lg flex flex-col rounded-2xl relative">
        <div className="absoulute inset-0 bg-primary/10 w-full rounded-t-2xl p-4 text-center shadow-xs">
            <h2 className="text-lg md:text-xl lg:text-2xl text-main">Welcome Back</h2>
            <p className="text-base md:text-lg text-muted">Sign in to Manage your account</p>
        </div>
        <div className="flex-1">
            <form>
                <div>
                    <label htmlFor="email">Enter your Email</label>
                    <input type="text" id="email"/>
                </div>
                <div>
                    <label htmlFor="password">Enter your password</label>
                    <input type="password" placeholder="?mdmunna@universe" />
                </div>
                <Button variant="primary" type="submit">Sign In </ Button>
            </form>
        </div>
        <div>
            <p>No account? <Link variant="nav" href="/register">Create one</Link></p>
        </div>
        <div>
            <h3>Demo Mode</h3>
            <Button variant="secondary">Tap to auto-fill (mor_2314)</Button>
        </div>
      </div>
      <InputGallery />
    </div>
  );
}

export default Login;
