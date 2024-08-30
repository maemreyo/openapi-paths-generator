const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Function to run a command in the shell
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`, error);
    process.exit(1);
  }
};

// Step 1: Bump version using standard-version
console.log("Bumping version...");
runCommand("npx standard-version");

// Step 2: Get the new version from package.json
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const newVersion = packageJson.version;

console.log(`New version is ${newVersion}`);

// Step 3: Push the commit and tags to GitHub
console.log("Pushing new version to GitHub...");
// Push commits and tags to the correct branch (e.g., master or main)
runCommand("git push --follow-tags origin master");

console.log("Release complete!");
