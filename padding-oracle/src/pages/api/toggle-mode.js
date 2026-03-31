let vulnerable = true;

export default function handler(req, res) {
  if (req.method === "POST") {
    vulnerable = !vulnerable;
  }

  res.json({ vulnerable });
}