import Link from "next/link";
import GoalHero from "@/components/GoalHero";
import ModernCalculator from "@/components/ModernCalculator";
import FeatureTabs from "@/components/FeatureTabs";
import LeadForm from "@/components/LeadForm";
import ContactInfo from "@/components/ContactInfo";
import { PARTNERS, SERVICES, TESTIMONIALS, TOOLS, WHY, SITE } from "@/content/site";
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  ArrowRight,
  Phone,
  Sparkles,
  Star,
  Users,
  Compass,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* 1. Hero Carousel */}
      <GoalHero />

      {/* 2. Regulatory & Trust Ribbon */}
      <div className="ribbon-redesign">
        <div className="wrap ribbon-flex">
          <div className="ribbon-item">
            <ShieldCheck size={18} className="ribbon-icon" />
            <span>
              AMFI Registered Mutual Fund Distributor <b>ARN-173086</b>
            </span>
          </div>
          <div className="ribbon-item">
            <Award size={18} className="ribbon-icon" />
            <span>
              APMI Registered PMS Distributor <b>APRN-04142</b>
            </span>
          </div>
          <div className="ribbon-item">
            <CheckCircle2 size={18} className="ribbon-icon" />
            <span>
              Founded in <b>2007</b> · Khambhat, Gujarat
            </span>
          </div>
        </div>
      </div>

      {/* 3. Redesigned Services Showcase */}
      <section className="section white" id="services">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Our Services</span>
            <h2>Complete Wealth &amp; Investment Solutions</h2>
            <p>
              From goal-based mutual fund SIPs to bespoke PMS strategies, we distribute institutional-quality financial
              products backed by continuous monitoring.
            </p>
          </div>

          <div className="svc-modern-grid">
            {SERVICES.map((s) => (
              <Link href={`/${s.slug}`} className="svc-modern-card" key={s.slug}>
                <div className="svc-card-icon-bubble">
                  <img src={s.icon} alt={s.label} />
                </div>
                <h3 className="svc-card-title">{s.label}</h3>
                <p className="svc-card-desc">
                  Tailored distribution and systematic execution designed for your financial journey.
                </p>
                <div className="svc-card-bottom">
                  <span className="svc-link-text">Explore Service</span>
                  <ArrowRight size={16} className="svc-arrow-icon" />
                </div>
              </Link>
            ))}

            <div className="svc-modern-card svc-cta-highlight">
              <div className="cta-highlight-inner">
                <span className="cta-mini-badge">Expert Consultation</span>
                <h3>Need Custom Financial Guidance?</h3>
                <p>Speak directly with our AMFI-registered distributor to map your portfolio to life goals.</p>
                <Link href="/contact" className="btn btn-gold">
                  <span>Talk to Our Team</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Calculator Layout Redesign (Matching Image 1) */}
      <section className="section calculator-showcase-section" id="calculator">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Interactive Compounding</span>
            <h2>Experience The Power Of Compounding</h2>
            <p>
              Forecast your capital growth with our Lumpsum &amp; SIP calculators, featuring Rule of 72 doubling
              benchmarks and year-by-year compounding progressions.
            </p>
          </div>

          <ModernCalculator initialMode="lumpsum" showModeSwitcher={true} />

          <div className="calculator-more-link-row">
            <span>Looking for STP, SWP, Retirement, or Loan calculators?</span>
            <Link href="/calculator" className="btn btn-ghost">
              <span>View All 14 Calculators Hub</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Shah Financial Services */}
      <section className="section white">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Our Value Proposition</span>
            <h2>Why Investors Trust Shah Financial Services</h2>
            <p>17+ years of transparent distributor relationships, guided by client interests and AMFI ethics.</p>
          </div>

          <div className="why-modern-grid">
            {WHY.map((w, idx) => (
              <div className="why-modern-card" key={w.label}>
                <div className="why-icon-container">
                  <img src={w.icon} alt={w.label} />
                </div>
                <h3>{w.label}</h3>
                <p>
                  {idx === 0 && "Tailored mutual fund scheme recommendations aligned strictly to your risk appetite."}
                  {idx === 1 && "Goal-linked portfolio customization for education, marriage, and retirement."}
                  {idx === 2 && "Bank-grade encrypted digital execution via official AMFI & RTA portals."}
                  {idx === 3 && "Anytime, anywhere mobile app and web access to review live portfolio returns."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Tools & Utilities Section */}
      <section className="section" id="tools">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Digital Tools</span>
            <h2>Empowering Investors With Modern Tools</h2>
            <p>Everything you need to evaluate, monitor, and optimize your financial health.</p>
          </div>

          <div className="tools-modern-grid">
            {TOOLS.map((t) => (
              <article className="tool-modern-card" key={t.title}>
                <div className="tool-top-row">
                  <div className="tool-icon-bubble">
                    <img src={t.icon} alt={t.title} />
                  </div>
                  <span className="tool-pill">Online Tool</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <Link href={t.href} className="tool-action-link">
                  <span>Open Tool</span>
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Features Tabs Section */}
      <section className="section white">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Investor Experience</span>
            <h2>Top Platform Features We Provide</h2>
            <p>Experience institutional grade portfolio tracking and smooth digital execution.</p>
          </div>
          <FeatureTabs />
        </div>
      </section>

      {/* 8. Client Testimonials */}
      <section className="section testimonials-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Client Feedback</span>
            <h2>What Our Valued Investors Say</h2>
            <p>Stories of financial discipline and wealth creation from our family of investors.</p>
          </div>

          <div className="testimonials-modern-grid">
            {TESTIMONIALS.map((t) => (
              <figure className="testi-card" key={t.name}>
                <div className="testi-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <blockquote className="testi-quote">“{t.text}”</blockquote>
                <figcaption className="testi-author">
                  <div className="author-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong className="author-name">{t.name}</strong>
                    <span className="author-role">{t.role}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Partners & Leadership Team */}
      <section className="section white">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Leadership</span>
            <h2>The Partners Behind Shah Financial Services</h2>
            <p>Committed to ethical financial distribution and personalized family wealth advisory.</p>
          </div>

          <div className="partners-modern-grid">
            {PARTNERS.map((p) => (
              <div className="partner-modern-card" key={p.name}>
                <div className="partner-avatar-circle">
                  <span>{p.name.replace(/^(Mr|Mrs)\.\s*/, "").charAt(0)}</span>
                </div>
                <h4 className="partner-name">{p.name}</h4>
                <p className="partner-role">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Contact / Consultation Section */}
      <section className="section contact-home-section" id="contact">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Get In Touch</span>
            <h2>Begin Your Financial Journey Today</h2>
            <p>Reach out to our office in Khambhat, Gujarat or drop an online enquiry.</p>
          </div>

          <div className="contact-modern-grid">
            <ContactInfo />
            <div className="contact-form-holder">
              <LeadForm showService={true} subject="Website Homepage Consultation Enquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
