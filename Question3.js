import { exec } from "child_process";

function executeCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    console.log(`Command Output:\n${stdout}`);

    if (stderr) {
      console.error(`Command Error:\n${stderr}`);
    }
  });
}

// Test Cases:

executeCommand("ls -la");
executeCommand("dir");
executeCommand('echo "Hello, Node.js!"');
