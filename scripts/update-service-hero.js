const fs = require('fs');
let code = fs.readFileSync('components/DedicatedServiceView.tsx', 'utf8');

const target = `<div className="service-hero-grid">
            <div className="service-hero-content">
              <div className="service-category-badge">
                <Sparkles size={14} className="sparkle-icon" />
                <span>{meta.categoryBadge}</span>
              </div>

              <h1 className="service-hero-title">{service.title}</h1>

              <p className="service-hero-lead">{meta.heroSubtitle}</p>

              <div className="service-trust-tags">
                <span className="trust-tag">
                  <ShieldCheck size={16} /> AMFI Registered (ARN-173086)
                </span>
                <span className="trust-tag">
                  <CheckCircle2 size={16} /> 100% Paperless Process
                </span>
                <span className="trust-tag">
                  <Award size={16} /> Serving Since 2007
                </span>
              </div>

              <div className="service-cta-row">
                <Link href="/contact" className="btn btn-primary">
                  <span>Start Investing Today</span>
                  <ArrowRight size={16} />
                </Link>
                <a href={tel(SITE.phones[0])} className="btn btn-ghost">
                  <Phone size={16} />
                  <span>Call: {SITE.phones[0]}</span>
                </a>
              </div>
            </div>

            {/* Quick Consultation Card */}
            <div className="service-hero-card">
              <div className="hero-lead-card">
                <h3>Get Personal Advice</h3>
                <p>Have questions about {service.title}? Speak with an experienced AMFI registered distributor.</p>
                <LeadForm showService={false} subject={\`Enquiry: \${service.title}\`} />
              </div>
            </div>
          </div>`;

const replacement = `<div className="service-hero-clean-container">
            <div className="service-category-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>{meta.categoryBadge}</span>
            </div>

            <h1 className="service-hero-title">{service.title}</h1>

            <p className="service-hero-lead">{meta.heroSubtitle}</p>

            <div className="service-trust-tags">
              <span className="trust-tag">
                <ShieldCheck size={16} /> AMFI Registered (ARN-173086)
              </span>
              <span className="trust-tag">
                <CheckCircle2 size={16} /> 100% Paperless Process
              </span>
              <span className="trust-tag">
                <Award size={16} /> Serving Since 2007
              </span>
            </div>
          </div>`;

const normCode = code.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');

if (normCode.includes(normTarget)) {
  const updated = normCode.replace(normTarget, replacement);
  fs.writeFileSync('components/DedicatedServiceView.tsx', updated, 'utf8');
  console.log('Successfully updated DedicatedServiceView.tsx!');
} else {
  console.error('Target not found in DedicatedServiceView.tsx');
}

