#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const { spawn } = require("child_process");
const fse = require("fs-extra");

const copyDir = async (sourceDir, destDir) => {
  try {
    await fse.ensureDir(destDir);

    await fse.copy(sourceDir, destDir, { overwrite: true });

    return { success: true };
  } catch (error) {
    console.error("Error copying seed data:", error.message);
    return { success: false };
  }
};

async function deleteDirIfExists(dirPath) {
  try {
    const exists = await fse.pathExists(dirPath);

    if (exists) await fse.remove(dirPath);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

const createTimestamp = () => {
  return new Date().toISOString();
};

const seedDir = "pocketbase-leader/pb_data_backup/seed";
const spawnDir = "./pocketbase-leader/pb_data";

const main = async () => {
  await deleteDirIfExists(spawnDir);
  await copyDir(seedDir, spawnDir);

  const pocketbase = spawn("./pocketbase-leader/pocketbase", ["serve"], {
    stdio: "inherit",
    env: { ...process.env, FORCE_COLOR: "true" },
  });

  process.on("SIGINT", async () => {
    pocketbase.kill("SIGINT");
  });

  pocketbase.on("close", async () => {
    const newDir = `./pocketbase-leader/pb_data_backup/caches/${createTimestamp()}`;
    await copyDir(spawnDir, newDir);
    await deleteDirIfExists(spawnDir);
    process.exit(0);
  });
};
main();
