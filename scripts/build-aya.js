// aya --pretty-stage=literate --pretty-format=markdown --pretty-dir=..\testout .\guide\haskeller-tutorial.aya.md

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

// callback : (file: string) -> void
function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    let child = path.join(dir, file);
    const stat = fs.statSync(child);
    if (stat.isDirectory()) {
      walk(child, callback);
    } else {
      callback(child);
    }
  }
}

// Create output directory
if (!fs.existsSync("build-aya")) fs.mkdir("build-aya", {recursive: true}, (err) => {
  if (err) throw err;
});
// Switch to source directory
process.chdir("aya");
// For each file, we call aya compiler
walk(".", (file) => {
  console.log("Compiling: " + file);
  child_process.execSync("aya --pretty-no-code-style --pretty-stage=literate --pretty-format=markdown --pretty-dir=../build-aya " + file,
    (err) => {
      if (err) throw err;
    });
});
// Put preprocessed files to src/
process.chdir("../build-aya");
walk(".", (file) => {
  console.log("Moving: " + file);
  const dest = path.resolve("../src", file);
  fs.mkdir(path.dirname(dest), {recursive: true}, (err) => {
    if (err) throw err;
    fs.copyFile(file, dest, (err) => {
      if (err) throw err;
    });
  });
});
