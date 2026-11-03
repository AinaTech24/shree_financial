import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = { title: "Portfolio Login" };

export default function Page() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="login-wrap">
          <div className="login-art">
            <img className="logo-w" src="/img/misc/logo.png" alt="Shah Financial Services" />
            <div>
              <h2>Your portfolio, 24x7 on web &amp; app</h2>
              <p>Track your investments through our portfolio reporting platform.</p>
            </div>
          </div>
          <div className="login-card">
            <h1>LOGIN</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
