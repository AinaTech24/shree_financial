const fs = require('fs');
const path = require('path');

const legalPath = path.join(__dirname, '..', 'content', 'legal.json');
const legal = JSON.parse(fs.readFileSync(legalPath, 'utf8'));

if (!legal['rights-obligations']) {
  legal['rights-obligations'] = {
    title: 'Rights & Obligations Of Investors',
    html: '<div><h3>Rights and Obligations of Mutual Fund Investors</h3><p>As an investor in mutual funds distributed by Shah Financial Services, you are entitled to key statutory rights and have specific responsibilities under SEBI and AMFI guidelines:</p><h4>Rights of Investors</h4><ul><li>Right to receive prompt allotment confirmation via email and SMS within prescribed timelines from AMC and RTA.</li><li>Right to receive periodic Consolidated Account Statements (CAS) showing transaction history and current portfolio valuations.</li><li>Right to receive dividend/IDCW payouts and redemption proceeds within SEBI mandated settlement cycles (T+2/T+3).</li><li>Right to inspect statutory documents including Scheme Information Document (SID), Statement of Additional Information (SAI), Key Information Memorandum (KIM), and Annual Reports.</li><li>Right to lodge grievances and receive prompt resolution through the distributor’s Grievance Redressal Officer or through SEBI SCORES portal.</li></ul><h4>Obligations of Investors</h4><ul><li>Ensure full compliance with KYC norms, providing accurate PAN, Aadhaar, bank details, and contact credentials.</li><li>Keep contact details (email, mobile number, bank account) updated with AMC and RTA.</li><li>Make informed investment choices based on your risk tolerance, financial goals, and liquidity horizon.</li><li>Read scheme documents carefully to understand investment objectives, benchmark, expense ratios, and risk-o-meter rating.</li><li>Avoid cash transactions; make payments exclusively through authorized banking channels (Net Banking, UPI, NEFT/RTGS).</li></ul></div>'
  };
}

if (!legal['dos-donts']) {
  legal['dos-donts'] = {
    title: "Do's and Don'ts for Investors",
    html: "<div><h3>Do's and Don'ts for Mutual Fund & Securities Investors</h3><h4>Do's</h4><ul><li>Do verify the AMFI Registration Number (ARN) of the distributor before transacting (Shah Financial Services ARN-173086).</li><li>Do assess your risk profile and select schemes that match your investment horizon and liquidity requirements.</li><li>Do opt for nomination in all mutual fund folios to safeguard family interests.</li><li>Do monitor your portfolio periodically and rebalance when life goals or asset allocations change.</li><li>Do ensure that the bank account linked for redemption is an active, verified account in your name.</li><li>Do carefully read all scheme-related documents including SID, KIM, and factsheets before investing.</li></ul><h4>Don'ts</h4><ul><li>Don't issue cash payments or third-party cheques for investments.</li><li>Don't sign blank application forms, transaction slips, or redemption requests.</li><li>Don't share your net banking passwords, OTPs, or confidential credentials with anyone, including distributors.</li><li>Don't base investment decisions solely on short-term past performance or market rumors.</li><li>Don't invest emergency funds in high-risk equity schemes with volatile short-term returns.</li></ul></div>"
  };
}

fs.writeFileSync(legalPath, JSON.stringify(legal, null, 2), 'utf8');
console.log('legal.json updated successfully!');

