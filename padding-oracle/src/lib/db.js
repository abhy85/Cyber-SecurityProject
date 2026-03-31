import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

export function readDB() {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch {
    return [];
  }
}

export function writeDB(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}