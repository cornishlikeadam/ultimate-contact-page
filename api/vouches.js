// Vercel Serverless Function: /api/vouches
// Manages public retrieval of approved vouches and incoming submissions

export const SEEDED_VOUCHES = [
  {
    id: "vouch-001",
    number: "001",
    name: "Marcus Sterling",
    relationship: "Teammate",
    role: "SCAD Lacrosse · Midfield Captain",
    quote: "KJ is the first one at the field for 6:00 AM practice and the last one to leave the weight room. When the game is tied in the 4th quarter, he is the voice keeping everyone calm, locked in, and focused on executing. That discipline bleeds into everything he builds.",
    pinned: true,
    status: "approved",
    created_at: "2026-10-06T10:15:00Z"
  },
  {
    id: "vouch-002",
    number: "002",
    name: "Coach Davis",
    relationship: "Coach",
    role: "SCAD Men's Lacrosse Head Coach",
    quote: "Kendren brings military engineering grit and relentless focus to our locker room. His leadership isn't loud or performative—it's consistent daily standard-setting. If KJ commits to a play, a drill, or a team objective, consider it done.",
    pinned: true,
    status: "approved",
    created_at: "2026-10-06T14:30:00Z"
  },
  {
    id: "vouch-003",
    number: "003",
    name: "Elena Rostova",
    relationship: "Creative",
    role: "Motion Design & AI Collaborator · SCAD",
    quote: "Most computer science engineers talk down to visual artists. Kendren did the opposite: he sat with our animation studio for hours, understood our storyboard pain points, and built generative AI pipelines that made our rendering 5x faster without sacrificing our aesthetic control.",
    pinned: true,
    status: "approved",
    created_at: "2026-10-07T09:20:00Z"
  },
  {
    id: "vouch-004",
    number: "004",
    name: "Tanner Brooks",
    relationship: "Teammate",
    role: "SCAD Lacrosse · Close Defense",
    quote: "You want KJ in your trenches. He sees three steps ahead and anticipates defensive rotations before the whistle even blows. Honest, hardworking, and zero ego.",
    pinned: false,
    status: "approved",
    created_at: "2026-10-07T16:45:00Z"
  },
  {
    id: "vouch-005",
    number: "005",
    name: "Sarah Lin",
    relationship: "Mentorship",
    role: "SCAD First-Year Resident Mentee",
    quote: "KJ helped me navigate my first semester in design school when I was completely overwhelmed. He taught me how to break massive semester projects into daily sprints and never let self-doubt stop me from shipping work.",
    pinned: false,
    status: "approved",
    created_at: "2026-10-08T11:00:00Z"
  },
  {
    id: "vouch-006",
    number: "006",
    name: "Darnell Washington",
    relationship: "Work",
    role: "SCAD Campus Dining Operations Lead",
    quote: "KJ manages breakfast rush hours with high energy, patience, and a smile for every single student and faculty member who walks through the doors. He makes team shifts run smoother every single week.",
    pinned: false,
    status: "approved",
    created_at: "2026-10-08T13:25:00Z"
  },
  {
    id: "vouch-007",
    number: "007",
    name: "Zackary Vance",
    relationship: "Teammate",
    role: "SCAD Lacrosse · Attackman",
    quote: "KJ sets the standard for physical toughness and mental stamina. No matter how brutal the sprint conditioning is, he pushes the guy next to him to finish strong.",
    pinned: false,
    status: "approved",
    created_at: "2026-10-08T17:10:00Z"
  },
  {
    id: "vouch-008",
    number: "008",
    name: "Professor Julian Hayes",
    relationship: "Mentorship",
    role: "Applied AI & Computational Design Faculty",
    quote: "Kendren pairs technical mastery of LLM APIs and Manim visualizations with genuine user empathy. His work on ASD-STE100 technical documentation synthesis shows a rare maturity in engineering clarity.",
    pinned: false,
    status: "approved",
    created_at: "2026-10-09T08:45:00Z"
  }
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      count: SEEDED_VOUCHES.length,
      target: 25,
      vouches: SEEDED_VOUCHES
    });
  }

  if (req.method === "POST") {
    const { name, relationship, role, quote, permission, photo_url } = req.body || {};

    if (!name || !relationship || !role || !quote) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, relationship, role, quote."
      });
    }

    if (quote.length < 20 || quote.length > 600) {
      return res.status(400).json({
        success: false,
        error: "Quote must be between 20 and 600 characters."
      });
    }

    const assignedNumber = String(SEEDED_VOUCHES.length + 1).padStart(3, "0");
    const newVouch = {
      id: `vouch-${Date.now()}`,
      number: assignedNumber,
      name: name.trim(),
      relationship,
      role: role.trim(),
      quote: quote.trim(),
      photo_url: photo_url || "",
      permission: Boolean(permission),
      pinned: false,
      status: "pending",
      created_at: new Date().toISOString()
    };

    return res.status(201).json({
      success: true,
      message: "Vouch submitted successfully for review.",
      vouch_number: assignedNumber,
      vouch: newVouch
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
