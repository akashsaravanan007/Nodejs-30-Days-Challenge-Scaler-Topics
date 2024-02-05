import * as path from "path";

function checkFileExtension(filePath, expectedExtension) {
  const actualExtension = path.extname(filePath);

  if (actualExtension === expectedExtension) {
    console.log(`File has the expected extension: ${expectedExtension}`);
  } else {
    console.log(
      `File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualExtension}`
    );
  }
}

// Test Cases:

checkFileExtension("test-files/demo.txt", ".txt");
checkFileExtension("test-files/demo.png", ".jpg");
