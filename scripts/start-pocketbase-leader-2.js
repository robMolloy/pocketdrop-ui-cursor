#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const { exec } = require("child_process");
const customProcess = exec("./pocketbase-leader/pocketbase serve");

customProcess.stdout.pipe(process.stdout);
customProcess.stderr.pipe(process.stderr);

(() => {
  console.log("Process is starting...");
})();

// Handle Ctrl+C
process.on("SIGINT", () => {
  console.log("\nCtrl+C detected, running cleanup...");

  // Your cleanup function
  (() => {
    console.log("Cleaning up resources before exit...");
  })();

  // Exit the process
  process.exit(0);
});
