import Link from "next/link";
import GoalHero from "@/components/GoalHero";
import ModernCalculator from "@/components/ModernCalculator";
import FeatureTabs from "@/components/FeatureTabs";
import { PARTNERS, SERVICES, TESTIMONIALS, TOOLS, WHY, SITE, tel } from "@/content/site";
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  Star,
  Phone,
  MessageCircle,
  Clock,
  Layers,
} from "lucide-react";

const SERVICE_TAGS: Record<string, string> = {
  "mutual-funds": "Wealth Creation",
  "goal-based-mutual-fund-investing": "Life Milestones",
  pms: "HNI Direct Equity",
  retirement: "Monthly Income / SWP",
  "child-marriage": "Future Security",
  education: "Higher Studies",
  bonds: "Fixed Income",
};

const SERVICE_DESCS: Record<string, string> = {
  "mutual-funds":
    "Participate in India's economic growth through equity, hybrid, debt, and liquid funds tailored to your risk horizon.",
  "goal-based-mutual-fund-investing":
    "Map your SIPs and lumpsum portfolios to concrete milestones like home purchase, emergency funds, and financial independence.",
  pms:
    "Discretionary and non-discretionary portfolio management services for high net-worth individuals and corporate treasuries.",
  retirement:
    "Build an inflation-indexed retirement nest egg engineered to generate steady, tax-efficient monthly pension cashflows.",
  "child-marriage":
    "Ring-fenced disciplined compounding strategy to celebrate your child's wedding milestone completely debt-free.",
  education:
    "Ensure top-tier university education in India and abroad without financial strain through target-date SIP investments.",
  bonds:
    "Preserve capital and secure predictable recurring yields with government securities, sovereign gold bonds, and AAA corporate debt.",
};

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

      {/* 3. Services Section - Modern All-Services Card Grid */}
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

          <div className="svc-cards-grid">
            {SERVICES.map((s) => (
              <div className="svc-card-modern" key={s.slug}>
                <div className="svc-card-top">
                  <div className="svc-card-icon-bubble">
                    <img src={s.icon} alt={s.label} className="svc-card-icon-img" />
                  </div>
                  <span className="svc-card-badge">{SERVICE_TAGS[s.slug] || "Investment"}</span>
                </div>

                <h3 className="svc-card-title">{s.label}</h3>
                <p className="svc-card-desc">
                  {SERVICE_DESCS[s.slug] ||
                    "Tailored distribution and systematic execution designed for your financial journey."}
                </p>

                <div className="svc-card-features">
                  <div className="svc-card-feat-item">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    <span>100% Paperless Execution</span>
                  </div>
                  <div className="svc-card-feat-item">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    <span>AMFI Compliant Guidance</span>
                  </div>
                </div>

                <div className="svc-card-footer">
                  <Link href={`/${s.slug}`} className="svc-card-btn">
                    <span>Explore Service</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Calculator Showcase */}
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

      {/* 6. Digital Tools Section */}
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

      {/* 10. Simple & Clean CTA Section */}
      <section className="section simple-cta-section" id="consultation">
        <div className="wrap">
          <div className="simple-cta-card">
            <div className="simple-cta-text">
              <h2>Ready to Begin Your Financial Journey?</h2>
              <p>
                Speak directly with our AMFI-registered team in Khambhat to align your mutual fund investments with your life goals.
              </p>
            </div>
            <div className="simple-cta-actions">
              <Link href="/contact" className="btn btn-primary simple-cta-btn">
                <span>Talk to Our Experts</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Hello%20Shah%20Financial%20Services,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost simple-wa-btn"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
