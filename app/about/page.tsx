import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Counter from "@/components/Counter";
import { PARTNERS } from "@/content/site";

export const metadata: Metadata = { title: "About Us" };

export default function About() {
  return (
    <>
      <PageHero title="About Us" sub="About Shah Financial Services" />
      <section className="section">
        <div className="wrap about-top">
          <div className="prose">
            <span className="eyebrow">About Shah Financial Services</span>
            <h2 style={{ fontSize: 38, margin: "12px 0 20px" }}>About Shah Financial Services</h2>
            <p>Shah Financial Services is a Partnership Firm established in 2007, registered under the Indian Partnership Act, 1932, with its office at A-111/112, Siddh Sagar Complex, First Floor, Near Railway Station, Khambhat-388620, Gujarat. We are an AMFI Registered Mutual Fund Distributor (ARN-173086, Validity: 12-NOV-2026 To 11-NOV-2029) and an APMI Registered PMS Distributor (APRN-04142, Validity: 30-JUN-2026 to 24-JUN-2029).</p>
            <p>With over 17 years of experience in the financial services industry, we specialize in mutual fund distribution and PMS distribution. Our team of partners serves clients across Gujarat and beyond, assisting them with goal-based mutual fund investing, systematic investment plans (SIPs), and PMS product selection.</p>
            <p>We operate through the NSE MF Invest Platform (For MF &amp; SIF) and MF Utility (MFU), supported by Redvision and Advisor Khoj as our backoffice software and Sanchay CRM for client relationship management.</p>
          </div>
          <img src="/img/misc/about.png" alt="Shah Financial Services team" />
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Partners</span><h2>Our Partners</h2></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Partner Name</th><th>Designation</th></tr></thead>
              <tbody>{PARTNERS.map((p) => (<tr key={p.name}><td>{p.name}</td><td>{p.role}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Compliance</span><h2>Regulatory Registrations</h2></div>
          <div className="table-wrap">
            <table>
              <tbody>
                <tr><td><b>AMFI Registration</b></td><td>ARN-173086 | Validity: 12-NOV-2026 To 11-NOV-2029</td></tr>
                <tr><td><b>APMI Registration</b></td><td>ARN-04142 | Validity: 30-JUN-2026 to 24-JUN-2029</td></tr>
                <tr><td><b>Website</b></td><td><a href="https://shahfs.com">https://shahfs.com</a></td></tr>
              </tbody>
            </table>
          </div>
          <p className="note" style={{ marginTop: 16 }}>Shah Financial Services is an AMFI Registered Mutual Fund Distributor. We are NOT a SEBI Registered Investment Adviser under SEBI (Investment Advisers) Regulations, 2013.</p>
        </div>
      </section>

      <section className="section white">
        <div className="wrap mvv">
          <div className="mvv-card"><img src="/img/misc/OUR-MISSION.png" alt="" /><h3>Our Mission</h3><p>Our mission is to be the Pathway to financial success for every Indian. We aim to provide guidance, support, and reliable financial services, ensuring individuals across the nation can achieve their financial goals.</p></div>
          <div className="mvv-card"><img src="/img/misc/OUR-VISION.png" alt="" /><h3>Our Vision</h3><p>Our vision is to witness a financially literate India where every individual&apos;s financial dreams are realized. We strive to empower our clients through education and personalized services, fostering financial well-being.</p></div>
          <div className="mvv-card"><img src="/img/misc/OUR-VALUE.png" alt="" /><h3>Our Value</h3><p>Our core values encompass empowerment, trustworthiness, client-centricity, innovation, excellence, and sustainability. We empower individuals, earn and maintain trust through integrity, and focus on our clients&apos; success.</p></div>
        </div>
      </section>

      <section className="section sip">
        <div className="wrap" style={{ position: "relative" }}>
          <div className="sec-head center">
            <span className="eyebrow">Our Achievements</span>
            <h2>We are proud of our works</h2>
            <p style={{ color: "#d6d8f4" }}>We bring solutions to make life easier for our customers.</p>
          </div>
          <div className="stats">
            <div className="stat"><Counter to={6500} /><span>Happy Clients</span></div>
            <div className="stat"><Counter to={500} suffix=" Cr" /><span>Assets under Management</span></div>
            <div className="stat"><Counter to={40} /><span>Total Years of Experience</span></div>
            <div className="stat"><Counter to={15} /><span>Clients from Countries Outside India</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
