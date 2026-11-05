import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Counter from "@/components/Counter";
import { PARTNERS } from "@/content/site";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Shah Financial Services",
  description:
    "Learn about Shah Financial Services — founded in 2007 in Khambhat, Gujarat. Meet our team of dedicated partners guiding families with ethical mutual fund and PMS distribution.",
};

export default function About() {
  return (
    <>
      <PageHero
        title="About Shah Financial Services"
        sub="17+ years of ethical wealth distribution, disciplined investing, and client-first commitment."
        trail={[{ label: "Home", href: "/" }]}
      />

      {/* Firm Overview Section */}
      <section className="section">
        <div className="wrap about-top">
          <div className="prose">
            <span className="eyebrow">Our Legacy &amp; Heritage</span>
            <h2 style={{ fontSize: "clamp(26px, 4.5vw, 38px)", margin: "12px 0 20px" }}>Guiding Investors Since 2007</h2>
            <p>
              Shah Financial Services is a Partnership Firm established in 2007, registered under the Indian Partnership
              Act, 1932, with its registered head office at A-111/112, Siddh Sagar Complex, First Floor, Near Railway
              Station, Khambhat-388620, Gujarat.
            </p>
            <p>
              With over 17 years of experience in the financial services industry, we specialize in mutual fund
              distribution and PMS distribution. Our team of experienced partners serves clients across Gujarat and
              beyond, assisting families with goal-based mutual fund investing, systematic investment plans (SIPs), and
              tailored portfolio monitoring.
            </p>
            <p>
              We operate through official digital execution portals including the NSE MF Invest Platform and MF Utility
              (MFU), powered by Redvision and Advisor Khoj backoffice software and Sanchay CRM for seamless investor
              support.
            </p>
          </div>
          <img src="/img/misc/about.png" alt="Shah Financial Services office" />
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="section white">
        <div className="wrap mvv">
          <div className="mvv-card">
            <img src="/img/misc/OUR-MISSION.png" alt="Our Mission" />
            <h3>Our Mission</h3>
            <p>
              To be the trusted pathway to financial success for every Indian family. We provide disciplined guidance,
              unwavering ethical support, and reliable financial execution to help you achieve your life milestones.
            </p>
          </div>
          <div className="mvv-card">
            <img src="/img/misc/OUR-VISION.png" alt="Our Vision" />
            <h3>Our Vision</h3>
            <p>
              To witness a financially independent and empowered society where every individual&apos;s financial dreams
              are realized through structured compounding and objective distribution guidance.
            </p>
          </div>
          <div className="mvv-card">
            <img src="/img/misc/OUR-VALUE.png" alt="Our Value" />
            <h3>Our Values</h3>
            <p>
              Transparency, trustworthiness, client-centricity, and relentless excellence. We earn trust through complete
              integrity and measure our success exclusively by the success of our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section sip">
        <div className="wrap" style={{ position: "relative" }}>
          <div className="sec-head center">
            <span className="eyebrow">Our Milestones</span>
            <h2>Proud Numbers of Trust &amp; Growth</h2>
            <p style={{ color: "#d6d8f4" }}>Serving over 5,000+ satisfied families across generations.</p>
          </div>
          <div className="stats">
            <div className="stat">
              <Counter to={6500} />
              <span>Happy Clients</span>
            </div>
            <div className="stat">
              <Counter to={500} suffix=" Cr" />
              <span>Assets Under Facilitation</span>
            </div>
            <div className="stat">
              <Counter to={40} />
              <span>Combined Years of Experience</span>
            </div>
            <div className="stat">
              <Counter to={15} />
              <span>Global Client Reach</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Team Members Section - Modern Cards like Image 4 */}
      <section className="section white" id="team">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Leadership &amp; Distribution Team</span>
            <h2>The Partners Behind Shah Financial Services</h2>
            <p>
              Meet our team of experienced, certified professionals committed to ethical mutual fund distribution and
              disciplined family milestone guidance.
            </p>
          </div>

          <div className="team-cards-grid">
            {PARTNERS.map((p) => (
              <div className="team-member-card" key={p.name}>
                <div className="member-image-wrap">
                  <img
                    src={p.image || "/img/misc/user.gif"}
                    alt={p.name}
                    className="member-portrait-img"
                    loading="lazy"
                  />
                  {p.badge && <span className="member-badge-floating">{p.badge}</span>}
                </div>

                <div className="member-card-body">
                  <span className="member-exp-tag">{p.exp || "10+ YEARS EXPERIENCE"}</span>
                  <h3 className="member-name">{p.name}</h3>
                  <h4 className="member-role">{p.role}</h4>
                  <p className="member-bio">{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="section about-cta-section">
        <div className="wrap">
          <div className="about-cta-box">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Start Your Journey
            </span>
            <h2>Ready to Begin Your Mutual Fund Journey?</h2>
            <p>
              Speak directly with our AMFI-registered team in Khambhat to map your portfolio to your life goals.
            </p>
            <div className="about-cta-actions">
              <Link href="/contact" className="btn btn-primary">
                <span>Connect With Our Team</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/calculator" className="btn btn-ghost">
                <span>Explore 20 Calculators</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
