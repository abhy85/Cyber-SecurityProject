import { readDB } from "../../lib/db";

export default function handler(req, res) {
  const data = readDB();
  res.json(data);
}