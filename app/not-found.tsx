import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="wrap">
        <img src="/img/misc/logo.png" alt="Shah Financial Services" style={{ height: 120, margin: "0 auto 24px" }} />
        <h1 style={{ fontSize: 72 }}>404</h1>
        <p style={{ margin: "12px 0 28px" }}>Sorry, Page Not Found. The page you requested could not be found.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">Go To Home</Link>
          <Link href="/contact" className="btn btn-ghost">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
