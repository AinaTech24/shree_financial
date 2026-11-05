const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.join(__dirname, "..", "app", "globals.css"), "utf8");

let inComment = false;
let inString = false;
let stringChar = "";
let stack = [];

for (let i = 0; i < css.length; i++) {
  const c = css[i];
  const next = css[i + 1];

  if (inComment) {
    if (c === "*" && next === "/") {
      inComment = false;
      i++;
    }
    continue;
  }

  if (inString) {
    if (c === "\\") {
      i++;
      continue;
    }
    if (c === stringChar) {
      inString = false;
    }
    continue;
  }

  if (c === "/" && next === "*") {
    inComment = true;
    i++;
    continue;
  }

  if (c === '"' || c === "'") {
    inString = true;
    stringChar = c;
    continue;
  }

  if (c === "{") {
    stack.push({ char: "{", index: i });
  } else if (c === "}") {
    if (stack.length === 0) {
      console.log("Unexpected closing brace at index", i);
    } else {
      stack.pop();
    }
  }
}

if (inComment) console.log("UNCLOSED COMMENT at end of CSS!");
if (inString) console.log("UNCLOSED STRING at end of CSS!");
if (stack.length > 0) {
  console.log("UNCLOSED BRACES:", stack.length);
  for (let item of stack) {
    const snippet = css.substring(Math.max(0, item.index - 50), item.index + 50);
    console.log("Unclosed { around:", JSON.stringify(snippet));
  }
} else {
  console.log("ALL BRACES MATCHED PERFECTLY! Total length:", css.length);
}
