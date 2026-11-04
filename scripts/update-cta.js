const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const target = `      {/* 10. Modern High-Impact CTA Section (Replacing Contact Page Form on Landing Page) */}
      <section className="section landing-cta-section" id="consultation">
        <div className="wrap">
          <div className="landing-cta-card">
            <div className="landing-cta-glow" />
            <div className="landing-cta-content">
              <span className="landing-cta-badge">
                <Sparkles size={14} className="text-amber-400" />
                <span>Complimentary Wealth Consultation</span>
              </span>
              <h2>Ready to Build Your Multi-Crore Financial Future?</h2>
              <p>
                Take the guesswork out of investing. Partner with Shah Financial Services for transparent,
                goal-aligned mutual fund distribution, institutional PMS execution, and continuous portfolio monitoring.
              </p>

              <div className="landing-cta-points">
                <div className="cta-point">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>100% Paperless Digital Onboarding</span>
                </div>
                <div className="cta-point">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Zero Direct Advisory Fees</span>
                </div>
                <div className="cta-point">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>AMFI Registered Distributor ARN-173086</span>
                </div>
              </div>

              <div className="landing-cta-actions">
                <Link href="/contact" className="btn btn-primary cta-main-btn">
                  <span>Talk to Our Experts</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={\`https://wa.me/\${SITE.whatsapp}?text=Hello%20Shah%20Financial%20Services,%20I%20would%20like%20to%20schedule%20a%20wealth%20consultation.\`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp cta-wa-btn"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </a>
                <a href={tel(SITE.phones[0])} className="btn btn-ghost cta-call-btn">
                  <Phone size={16} />
                  <span>Call {SITE.phones[0]}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>`;

const replacement = `      {/* 10. Simple & Clean CTA Section */}
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
                href={\`https://wa.me/\${SITE.whatsapp}?text=Hello%20Shah%20Financial%20Services,%20I%20would%20like%20to%20know%20more%20about%20your%20services.\`}
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
      </section>`;

const normCode = code.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');

if (normCode.includes(normTarget)) {
  const updated = normCode.replace(normTarget, replacement);
  fs.writeFileSync('app/page.tsx', updated, 'utf8');
  console.log('Successfully updated app/page.tsx with simple CTA!');
} else {
  console.error('Target not found in app/page.tsx');
}

