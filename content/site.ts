export const SITE = {
  name: "Shah Financial Services",
  tagline: "We are an AMFI registered Mutual Fund Distribution company founded in 2007. We specialise in Mutual Fund Distribution",
  phones: ["+91 8141112000", "+91 8141112099", "+91 8141112051"],
  email: "info@shahfs.com",
  email2: "shahfinancialservices2020@gmail.com",
  address: "A-111/112, Siddh Sagar Complex, First Floor, Near Railway Station, Khambhat-388620 Gujarat",
  mapUrl: "https://maps.app.goo.gl/x3QbSeTeV64drHVo6",
  whatsapp: "918141112000",
  playStore: "https://play.google.com/store/apps/details?id=com.shahfinancialservices.shahfinancialservices",
  appStore: "https://apps.apple.com/in/app/shah-fin-services/id6465952207",
  portalLogin: "https://portfolio.shahfs.com/Login/login/validate-user",
  gstin: "24AEGFS6153N1ZL",
  gro: { name: "Mr. Ronak Nalinkumar Shah", email: "info@shahfs.com", phone: "+91 9825423773" },
};

export const tel = (p: string) => "tel:" + p.replace(/\s/g, "");

export const SERVICES = [
  { slug: "mutual-funds", label: "Mutual Funds", icon: "/img/services/mutual-funds.png" },
  { slug: "goal-based-mutual-fund-investing", label: "Goal-Based Mutual Fund Investing", icon: "/img/services/goal-based-mutual-fund-investing.png" },
  { slug: "pms", label: "PMS", icon: "/img/services/pamaaif.png" },
  { slug: "retirement", label: "Retirement", icon: "/img/services/retirement.png" },
  { slug: "child-marriage", label: "Child Marriage", icon: "/img/services/child-marriage.png" },
  { slug: "education", label: "Education", icon: "/img/services/education.png" },
  { slug: "bonds", label: "Bonds & Postal Savings", icon: "/img/services/bonds.png" },
];

export const GOALS = [
  { title: "Dream home", text: "Comfortable haven reflecting personal aspirations, ideal for lasting memories.", img: "/img/goals/Dream-home.png", cta: "Start Dream home" },
  { title: "Dream Car", text: "Exquisite vehicle epitomizing style, performance, and personal fulfillment, cherished immensely.", img: "/img/goals/Dream-Car.png", cta: "Start Dream Car" },
  { title: "Retirement", text: "Rewarding phase, relaxation, hobbies, travel, and contentment.", img: "/img/goals/retirement.png", cta: "Start Retirement" },
  { title: "Child's Education", text: "Quality learning, growth, future opportunities, shaping tomorrow's success, parental investment.", img: "/img/goals/child-education.png", cta: "Start Child's Education" },
  { title: "Child's Marriage", text: "Family celebration, significant milestone, lifelong memories, parental support.", img: "/img/goals/child-marriage.png", cta: "Start Child's Marriage" },
  { title: "Vacation Preparation", text: "Relaxing getaway, exotic destinations, meticulous Preparation, unforgettable experiences, cherished memories", img: "/img/goals/vacation.png", cta: "Start Vacation Preparation" },
  { title: "Other Goals", text: "Varied aspirations, personal growth, financial security, happiness, and fulfillment ahead.", img: "/img/goals/Other-goals.png", cta: "Start Goals" },
];

export const WHY = [
  { label: "Best Recommendation", icon: "/img/why/badge.png" },
  { label: "Customize Investment", icon: "/img/why/brokerage.png" },
  { label: "Secured Transaction", icon: "/img/why/card-payment.png" },
  { label: "24x7 Access on web & app", icon: "/img/why/24-hours-support.png" },
];

export const TOOLS = [
  { title: "Investment Calculators", text: "Use a variety of investment calculators to estimate returns, SIP growth, and support your investment Preparation.", icon: "/img/tools/CALCULATOR.png", href: "/investment-calculators" },
  { title: "Pay Premium Online", text: "Invest in Mutual Funds online, explore options, and manage your investment portfolio effortlessly at your fingertips.", icon: "/img/tools/PAY-PREMIMUM-ONLINE.png", href: "/pay-online" },
  { title: "Financial Fitness", text: "Evaluate your current financial health with a comprehensive questionnaire, to enhance your Preparation and well-being.", icon: "/img/tools/icon19.png", href: "/financial-fitness" },
  { title: "Risk Profile", text: "Assess your risk tolerance and financial profile to customize your investments according to your risk-taking capacity.", icon: "/img/tools/INVEST-ONLINE.png", href: "/risk-profile" },
  { title: "Important Links", text: "In useful links section you can check about - Check Your KYC , NSE , BSE , AMFI , SEBI , RBI , IRDA , FPSBI , AMFI etc", icon: "/img/tools/CHECK-KYC.png", href: "/important-links" },
];

export const FEATURES = [
  { title: "Portfolio Analysis", text: "Track your investments through our portfolio reporting platform.", icon: "/img/misc/investor-portfolio-analysis-icon.png", img: "/img/misc/investor-portfolio-analysis.webp" },
  { title: "Invest Online", text: "We offer a 100% paperless process of investment. It takes a few seconds to register a SIP or Purchase an ELSS.", icon: "/img/misc/investor-invest-online-icon.png", img: "/img/misc/invest-online.webp" },
  { title: "Goal Tracker", text: "Give purpose to your investments, you can map all your investments with the goal like child education, marriage or retirement.", icon: "/img/misc/investor-goal-report-icon.png", img: "/img/misc/goal-tracker.webp" },
  { title: "Research", text: "Select from diversified mutual fund schemes based on your risk profile and goals.", icon: "/img/misc/investor-research-icon.png", img: "/img/misc/research.webp" },
];

export const TESTIMONIALS = [
  { name: "Ajay", role: "Web Developer", text: "Impressed with their financial expertise. They've made a significant difference in my investments, and their strategies have maximized my returns." },
  { name: "Sumit", role: "Web Developer", text: "Impressed with their financial expertise, they've boosted my investments and guided me to success. I highly recommend their services." },
  { name: "Priyanka", role: "Web Developer", text: "Incredible support and guidance – they've helped me achieve financial stability and growth quickly. I'm a highly satisfied client." },
];

export interface Partner {
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
];

export const CONTACT_SERVICES = [
  "Mutual Funds",
  "Financial Preparation",
  "PMS & AIF",
  "Child Marriage Preparation",
  "Education Preparation",
  "Bonds & Postal Savings",
  "Life Insurance",
  "General Insurance",
  "Health Insurance",
  "Other",
];

export const SIP_NOTE =
  "For illustration purposes only. Actual returns may vary. Maximum assumed CAGR: 12% as per firm policy (AMFI cap: 13%). Mutual Fund investments are subject to market risks.";

export const DISCLOSURE = [
  "Mutual Fund investments are subject to market risks. Please read the scheme information and other related documents carefully before investing. Past performance is not indicative of future returns.",
  "Portfolio Management Services are subject to market risks. Please read the Disclosure Document of the PMS provider carefully before investing. Past performance is not indicative of future returns.",
  "Shah Financial Services receives commission from Asset Management Companies for mutual fund distribution. Commission details are available on our Commission Disclosure page.",
  "Shah Financial Services makes no warranties or representations, express or implied, on products offered through this platform. It accepts no liability for any damages or losses, however caused, in connection with the use of, or reliance on, its products or related services.",
];

export const REGISTRATIONS = [
  "AMFI Registered Mutual Fund Distributor ( ARN- 173086 ) (Validity: 12-NOV-2026 To 11-NOV-2029)",
  "Registered SIF Distributor (ARN-173086) (Validity: 30-JUN-2026 to 24-JUN-2029) (EUIN - E560879) (Validity: 24-SEP-2025 to 23-SEP-2028)",
  "APMI Registered PMS Distributor (APRN-04142) (Validity: 30-Jun-2026 to 29-Jun-2029)",
];

export const POLICY_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "AMFI Risk Factors", href: "/risk-factors" },
  { label: "Terms & Conditions", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Investor Charter", href: "/investor-charter" },
  { label: "Fund Selection & Suitability Policy", href: "/fund-selection-policy" },
  { label: "Client Onboarding & KYC Policy", href: "/client-onboarding" },
  { label: "Rights & Obligations Of Investors", href: "/rights-and-obligations" },
  { label: "Do's and Don'ts for Investors", href: "/dos-and-donts" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "AMFI Code of Conduct", href: "/AMFI_Code-of-Conduct.pdf", external: true },
  { label: "SEBI Circulars", href: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7&smid=0", external: true },
  { label: "KIM / SID / SAI", href: "https://www.sebi.gov.in/filings/mutual-funds.html", external: true },
  { label: "Factsheet", href: "https://www.amfiindia.com/online-center/download-factsheets", external: true },
  { label: "Scheme-Wise Commission Disclosure", href: "/scheme-wise-commission" },
  { label: "Registration Disclosure", href: "/registration-disclosure" },
];

export type Calc = { slug: string; title: string; icon: string; domain: string; dir: string; cat: string; minH: string; maxH: string };
const C = (slug: string, title: string, icon: string, cat: string, minH: string, maxH: string, extra: Partial<Calc> = {}): Calc => ({
  slug, title, icon: `/img/calc/${icon}.webp`, domain: "https://redvisionassets.com", dir: "iframes", cat, minH, maxH, ...extra,
});
export const INVEST_CALCS: Calc[] = [
  C("sip-calculator", "SIP Calculator", "sip-performance", "calculator", "1200px", "820px"),
  C("lumpsum-calculator", "Lumpsum Calculator", "lumpsum", "calculator", "1200px", "820px"),
  C("stp-calculator", "STP Calculator", "stp-performance", "calculator", "1420px", "820px"),
  C("swp-calculator", "SWP Calculator", "swp-performance", "calculator", "1340px", "810px"),
  C("retirement-plan", "Retirement Corpus Calculator", "retirement", "calculator", "1560px", "1140px"),
  C("delay-plan", "Investment Delay Calculator", "delay", "calculator", "1350px", "820px"),
  C("life-insurance-plan", "Life Insurance Calculator", "life-insurance", "calculator", "1380px", "860px"),
  C("emi-plan", "EMI Calculator", "emi", "calculator", "1220px", "820px"),
  C("calculator.php", "TAX Calculator", "tax", "calculator", "850px", "850px", { domain: "https://www.redvisiontechnologies.com", dir: "iframe" }),
  C("marriage-plan", "Marriage Expense Calculator", "marriage", "calculator", "1420px", "890px"),
  C("education-plan", "Education Cost Calculator", "education", "calculator", "1420px", "910px"),
  C("house-plan", "Home Loan Calculator", "home", "calculator", "1350px", "820px"),
  C("car-plan", "Car Purchase Calculator", "car-plan", "calculator", "1350px", "850px"),
  C("vacation-plan", "Vacation Budget Calculator", "vacation", "calculator", "1430px", "820px"),
];
export const MF_CALCS: Calc[] = [
  C("sip-performance", "SIP Performance", "sip-performance", "php-performance", "920px", "680px"),
  C("stp-performance", "STP Performance", "stp-performance", "php-performance", "1210px", "720px"),
  C("swp-performance", "SWP Performance", "swp-performance", "php-performance", "1100px", "720px"),
  C("scheme-performance", "Scheme Performance", "scheme-performance", "php-performance", "920px", "700px"),
  C("fund-performance", "Fund Performance", "top-performance", "php-performance", "1200px", "480px"),
  C("nav-finder", "NAV Finder Calculator", "nav-finder", "php-performance", "970px", "680px"),
];

export const ALL_CALCS: Calc[] = [...INVEST_CALCS, ...MF_CALCS];

export const PAY_GROUPS = [
  {
    title: "General Insurance",
    items: [
      { img: "general-insurance/1.png", href: "https://www.hdfcergo.com/renew-hdfc-ergo-policy" },
      { img: "general-insurance/2.png", href: "https://www.godigit.com/login" },
      { img: "general-insurance/3.png", href: "https://www.icicilombard.com/" },
      { img: "general-insurance/4.png", href: "https://www.iffcotokio.co.in/#renew" },
      { img: "general-insurance/02.png", href: "" },
      { img: "general-insurance/6.png", href: "https://www.tataaig.com" },
    ],
  },
  {
    title: "Life Insurance",
    items: [
      { img: "life-insurance/8.png", href: "https://ebiz.licindia.in/D2CPM/#DirectPay" },
      { img: "life-insurance/4.png", href: "https://apps.tataaia.com/PG/#!/policyPayment" },
      { img: "general-insurance/02.png", href: "" },
      { img: "life-insurance/12.jpg", href: "" },
      { img: "life-insurance/7.png", href: "" },
      { img: "life-insurance/3.png", href: "https://www.aegonlife.com/pay-my-premium" },
      { img: "life-insurance/6.png", href: "https://www.maxlifeinsurance.com/cs/pay-online" },
    ],
  },
  {
    title: "Health Insurance",
    items: [
      { img: "life-insurance/12.jpg", href: "" },
      { img: "health-insurance/1.png", href: "" },
      { img: "health-insurance/2.png", href: "" },
      { img: "health-insurance/3.png", href: "https://www.hdfcergo.com/renew-hdfc-ergo-policy" },
      { img: "health-insurance/4.png", href: "https://dtcapplive.royalsundaram.in/instarenew/home" },
      { img: "health-insurance/6.png", href: "" },
    ],
  },
];

export const HEALTH_QS = [
  "Have you prepared a budget for household expenses?",
  "Do you have adequate cash in hand or at bank to maintain your lifestyle in case of job/income loss? (Adequate cash is more than 6 months regular expenses)",
  "Do you have life cover of alteast 8 times your annual income to take care of your family needs ? (Life insurance can be taken in the form of term insurance, ULIP, Endowment or money back policies)",
  "Have you taken Health Insurance for your entire family?",
  "Do you save more than 25% of your monthly income(take home salary) each month?",
  "Have you identified your financial goals and started working towards achieving them? (Child education, marriage, retirement, house purchase are all examples of financial goals. Have you identified how much money you would require for each of these goals to be met and how much time is left to achieve them)",
  "Are your investments diversified across atleast 3 asset classes (Various asset classes include Equity, Fixed income, Real estate, Gold, other commodities)",
  "Do you review and track the performance of your investment periodically? (Periodic review means checking fund performance, realigment to macro economic changes etc.)",
  "Do you know how much money you will need after retirement to maintain a desired lifestyle? (The calculation should involve the effect of inflation on all expenses for you and your dependents)",
  "Do you have a detailed written will? (A will ensures that the distribution of your wealth happens as you want it to happen)",
];

export const RISK_QS: { q: string; a: string[] }[] = [
  { q: "Do you have enough savings set aside for emergencies without touching your investments?", a: ["No, I don't have any emergency savings", "I have some savings but not enough for 3 months expenses", "I have enough for about 3 months of expenses", "I have enough for 6 months of expenses", "I have more than 6 months of expenses saved"] },
  { q: "What is your main reason for investing?", a: ["To keep my money safe without any loss", "To earn steady income and protect my money", "To grow my money moderately with some risk", "To grow my money a lot and accept some ups and downs", "To take big risks and try to earn very high returns"] },
  { q: "Which investment would you feel most comfortable keeping for the next 5 years?", a: ["Fixed deposits or PPF with guaranteed returns", "Government bonds or NSC with steady returns", "Shares of big, well-known Indian companies", "Mutual funds that invest in large and mid-size companies", "Stocks with high growth potential or international funds"] },
  { q: "How long do you plan to keep your money invested?", a: ["Less than 1 year", "1 to 3 years", "3 to 5 years", "5 to 10 years", "More than 10 years"] },
  { q: "What annual return would you be happy with, even if it goes up and down?", a: ["4% to 6% with very low risk", "6% to 8% with some safety", "8% to 12% with moderate risk", "12% to 15% with higher risk", "More than 15% with high risk"] },
  { q: "How much loss in your investments can you accept before feeling worried?", a: ["Less than 5% loss", "5% to 10% loss", "10% to 15% loss", "15% to 25% loss", "More than 25% loss"] },
  { q: "How do you usually make decisions about investing?", a: ["I prefer safe options after asking trusted experts", "I follow advice that keeps my money safe", "I like a mix of safety and growth", "I prefer advice to grow money even if risky", "I make my own choices and accept big risks"] },
  { q: "Which best describes your feelings about risk?", a: ["I want to avoid risk and keep my money safe", "I am okay with small risk for some growth", "I accept moderate risk for good growth", "I am okay with big risk for higher returns", "I want high returns and accept very high risk"] },
  { q: "If the stock market suddenly crashes, what will you do?", a: ["Take out all my money to avoid losses", "Move some money to safer places", "Keep my money invested and wait", "Buy more shares because prices are low", "Invest more in risky assets for big gains"] },
  { q: "How confident are you managing your investments when the market changes a lot?", a: ["Not confident; I prefer very safe options", "Somewhat confident; I like to be careful", "Fairly confident; I can handle ups and downs", "Very confident; I actively manage my investments", "Extremely confident; I take big risks on purpose"] },
];
