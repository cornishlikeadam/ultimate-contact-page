// Scriptable iOS Home-Screen Widget for Kendren Cornish (@KJ)
// Fetches live status feed from: https://ultimate-contact-page.vercel.app/api/status
// Displays: Status Tag (e.g. 🟢 IN THE LAB), Now, Next, and Vouch Milestone count

const ENDPOINT_URL = "https://ultimate-contact-page.vercel.app/api/status";

async function createWidget() {
  const req = new Request(ENDPOINT_URL);
  let data;
  try {
    data = await req.loadJSON();
  } catch (e) {
    data = {
      tag: "🟢 IN THE LAB",
      now: "Creative AI workflows at SCAD",
      next: "Manim & Remotion Animation Pipeline",
      vouch_count: 14,
      vouch_target: 25,
      owner: { name: "Kendren J. Cornish", handle: "@KJ" }
    };
  }

  const widget = new ListWidget();
  widget.backgroundColor = new Color("#090b10");
  widget.setPadding(16, 16, 16, 16);

  // Header row
  const headerRow = widget.addStack();
  headerRow.layoutHorizontally();

  const brandText = headerRow.addText("NOT2L8 · " + (data.owner?.handle || "@KJ"));
  brandText.textColor = new Color("#818cf8");
  brandText.font = Font.boldSystemFont(11);

  headerRow.addSpacer();

  const statusPill = headerRow.addText(data.tag || "🟢 ACTIVE");
  statusPill.textColor = new Color("#10b981");
  statusPill.font = Font.semiboldSystemFont(11);

  widget.addSpacer(8);

  // Now Section
  const nowLabel = widget.addText("NOW");
  nowLabel.textColor = new Color("#94a3b8");
  nowLabel.font = Font.mediumSystemFont(10);

  const nowText = widget.addText(data.now || "Building AI pipelines");
  nowText.textColor = new Color("#ffffff");
  nowText.font = Font.boldSystemFont(13);
  nowText.lineLimit = 2;

  widget.addSpacer(6);

  // Next Section
  const nextLabel = widget.addText("NEXT");
  nextLabel.textColor = new Color("#94a3b8");
  nextLabel.font = Font.mediumSystemFont(10);

  const nextText = widget.addText(data.next || "Next sprint milestone");
  nextText.textColor = new Color("#cbd5e1");
  nextText.font = Font.systemFont(12);
  nextText.lineLimit = 2;

  widget.addSpacer(8);

  // Footer / Milestone bar
  const footerRow = widget.addStack();
  footerRow.layoutHorizontally();

  const countText = footerRow.addText(`Vouches: ${data.vouch_count || 14} / ${data.vouch_target || 25}`);
  countText.textColor = new Color("#a855f7");
  countText.font = Font.semiboldSystemFont(11);

  footerRow.addSpacer();

  const tapText = footerRow.addText("Open Pass →");
  tapText.textColor = new Color("#64748b");
  tapText.font = Font.systemFont(10);

  widget.url = data.links?.card || "https://ultimate-contact-page.vercel.app/card";

  return widget;
}

const widget = await createWidget();
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
