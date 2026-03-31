import { writeDB } from "../../lib/db";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    writeDB([]);

    return res.status(200).json({
      success: true,
    });
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}