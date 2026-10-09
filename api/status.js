// Vercel Serverless Function: /api/status
// Public JSON endpoint consumed by the iPhone Scriptable widget and external followers

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const currentStatus = {
    tag: "🟢 IN THE LAB",
    now: "Building Creative AI workflows & Gemini workshops at SCAD",
    next: "Remotion & Manim animation engine with Rhubarb lip sync",
    push_message: "Vouch milestone: 14 approved reviews on the wall. Drop yours today!",
    updated_at: new Date().toISOString(),
    insider_count: 42,
    vouch_count: 14,
    vouch_target: 25,
    owner: {
      name: "Kendren J. Cornish",
      handle: "@KJ",
      title: "Applied AI Designer & Technologist",
      team: "SCAD Lacrosse #14"
    },
    links: {
      card: "https://ultimate-contact-page.vercel.app/card",
      vouch: "https://ultimate-contact-page.vercel.app/vouch",
      wall: "https://ultimate-contact-page.vercel.app/wall",
      portfolio: "https://kendren.us"
    }
  };

  return res.status(200).json(currentStatus);
}
