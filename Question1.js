import * as fs from "fs";

function readFileContent(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error(`Error reading file: ${err.code}: ${err.path}`);
      } else {
        console.error(`Error reading file: ${err.message}`);
      }
    } else {
      console.log(`File content of ${filePath}:\n${data}`);
    }
  });
}

// Test Cases
readFileContent("file1.txt");
readFileContent("empty-file.txt");
readFileContent("nonexistent-file.txt");
