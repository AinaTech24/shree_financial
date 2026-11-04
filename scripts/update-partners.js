const fs = require('fs');
let code = fs.readFileSync('content/site.ts', 'utf8');

const target = `export const PARTNERS = [
  { name: "Mr. Ronak Nalinkumar Shah", role: "Partner & Grievance Redressal Officer" },
  { name: "Mr. Bhavik Nalinkumar Shah", role: "Partner" },
  { name: "Mr. Rishi Ronak Shah", role: "Partner" },
  { name: "Mrs. Reena Ronak Shah", role: "Partner" },
  { name: "Mrs. Hetal Bhavik Shah", role: "Partner" },
  { name: "Mrs. Neelaben Nalinkumar Shah", role: "Partner" },
];`;

const replacement = `export interface Partner {
  name: string;
  role: string;
  image?: string;
  badge?: string;
  exp?: string;
  bio?: string;
}

export const PARTNERS: Partner[] = [
  {
    name: "Mr. Ronak Nalinkumar Shah",
    role: "Founder & Managing Partner",
    image: "/img/team/ronak-shah.jpg",
    badge: "AMFI Registered MFD",
    exp: "17+ YEARS EXPERIENCE",
    bio: "Dedicated to empowering families across Gujarat and India through disciplined mutual fund distribution, risk-mapped asset allocation, and patient long-term compounding.",
  },
  {
    name: "Mr. Bhavik Nalinkumar Shah",
    role: "Partner & Head of Operations",
    image: "/img/team/bhavik-shah.jpg",
    badge: "APMI PMS Distributor",
    exp: "15+ YEARS EXPERIENCE",
    bio: "Leading institutional PMS execution and digital transaction infrastructure, ensuring seamless compliance, portfolio tracking, and operational excellence for our clients.",
  },
  {
    name: "Mr. Rishi Ronak Shah",
    role: "Partner & Wealth Advisor",
    image: "/img/team/rishi-shah.jpg",
    badge: "NISM Series V-A Certified",
    exp: "8+ YEARS EXPERIENCE",
    bio: "Specializing in milestone-based financial planning, next-generation investor onboarding, and goal-targeted SIP portfolios for higher education and wealth creation.",
  },
  {
    name: "Mrs. Reena Ronak Shah",
    role: "Partner & Client Relationship Head",
    image: "/img/team/reena-shah.jpg",
    badge: "NISM Certified Distributor",
    exp: "14+ YEARS EXPERIENCE",
    bio: "Fostering enduring family relationships through personalized financial goal tracking, regular reviews, and compassionate support across life milestones.",
  },
  {
    name: "Mrs. Hetal Bhavik Shah",
    role: "Partner & Administration",
    image: "/img/team/hetal-shah.jpg",
    badge: "Compliance & KYC Lead",
    exp: "12+ YEARS EXPERIENCE",
    bio: "Championing frictionless digital onboarding, Central KYC verification, and meticulous regulatory compliance across all AMFI and SEBI frameworks.",
  },
  {
    name: "Mrs. Neelaben Nalinkumar Shah",
    role: "Senior Founding Partner",
    image: "/img/team/neelaben-shah.jpg",
    badge: "Founding Partner",
    exp: "17+ YEARS LEGACY",
    bio: "Providing visionary stewardship, ethical principles, and values of investor-first integrity that have guided Shah Financial Services since its inception in 2007.",
  },
];`;

const normCode = code.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');

if (normCode.includes(normTarget)) {
  const updated = normCode.replace(normTarget, replacement);
  fs.writeFileSync('content/site.ts', updated, 'utf8');
  console.log('Successfully updated PARTNERS in content/site.ts!');
} else {
  console.error('Target not found in content/site.ts');
}

