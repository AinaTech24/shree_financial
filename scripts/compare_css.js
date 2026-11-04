const fs = require("fs");
const { execSync } = require("child_process");

const headCss = execSync("git show 1dabdf7:app/globals.css", { maxBuffer: 10 * 1024 * 1024 }).toString();
const incomingCss = execSync("git show f79a62d:app/globals.css", { maxBuffer: 10 * 1024 * 1024 }).toString();

console.log("headCss length:", headCss.length);
console.log("incomingCss length:", incomingCss.length);

// Let's find section headings in both
function findSections(css) {
  const matches = [...css.matchAll(/\/\* =+ *\r?\n\s*([A-Z0-9 &()\-]+)\r?\n/g)];
  return matches.map(m => m[1].trim());
}

console.log("HEAD sections:", findSections(headCss));
console.log("Incoming sections:", findSections(incomingCss));
