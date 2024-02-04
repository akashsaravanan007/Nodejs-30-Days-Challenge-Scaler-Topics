import * as path from "path";
const __dirname = path.resolve();

function resolvePath(relativePath) {
  const absolutePath = path.resolve(__dirname, relativePath);

  console.log("Resolved Path:", absolutePath);
}

// Test Cases
resolvePath("Nodejs-30-Days-Challenge-Scaler-Topics/Day4/file.txt");
resolvePath("nonexistent-folder/file.txt");
