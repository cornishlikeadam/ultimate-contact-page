# 🌌 The Ultimate Contact Link Landing Page

An ultra-refined, high-performance personal contact hub and link landing page designed for **Kendren J. Cornish** (Applied AI Designer & Technologist at SCAD).

Engineered to surpass standard Linktree / Bento link pages with instant vCard generation, live local timezone clock, scannable QR code generator, interactive message composer, multi-theme engine, sound feedback, confetti effects, and an in-page live customizer that lets you edit and export new versions right in your browser.

---

## ✨ Superpowers & Highlights

- **🍱 3 Dynamic View Layouts**:
  - **Bento Grid**: Interactive card tiles highlighting flagship projects, tech capabilities, and direct sync channels.
  - **Streamlined Link List**: Clean, ultra-fast mobile-optimized list view with animated hover states and category badges.
  - **Digital vCard Pass**: Apple Wallet / NFC-style digital contact pass with magnetic chip graphics and instant contact download.
- **📥 1-Click vCard (.VCF) Generation**: Generates an RFC 2426 standard `.vcf` file containing your full name, title, organization, phone, email, website, and note. Instantly imports into Apple Contacts (iOS/macOS) and Google Contacts (Android).
- **📱 Built-In QR Code Engine**: Generates a high-contrast QR code directly in the browser (100% offline, zero tracking) with a 1-click PNG download button and Web Share API support.
- **🕒 Live Time Sync Widget**: Displays the live local time in Savannah, GA (EST/EDT) with an active availability status indicator.
- **✉️ Direct Message Modal**: Choose inquiry topics (AI Collaboration, Google Student Ambassador, Speaking, Coffee Chat) to generate pre-filled priority ProtonMail links or copy clean message drafts.
- **🎨 4 Curated Visual Themes**:
  - **Obsidian Dark** (OLED slate with glowing violet/indigo mesh gradients)
  - **Studio Light** (Clean architectural minimalist gallery aesthetic)
  - **Cyber Violet** (Electric violet, magenta, and cyan glow)
  - **Terminal Emerald** (Deep slate with cyberpunk matrix green accents)
- **⚙️ Built-In In-Page Customizer & Exporter**: Click the gear icon to modify your name, title, bio, contact details, links, or avatar. You can preview changes live, save them to `localStorage`, or click **"🚀 Export Standalone index.html"** to download an updated version ready to deploy!
- **🔊 Synthesized Micro-Interactions & Confetti**:
  - Web Audio API synthesized mechanical pop sounds (zero external audio files, mute toggle included).
  - Physics particle confetti celebration when saving contact or submitting messages.

---

## 🚀 Quick Start (Running Locally)

Because this landing page is built with pure web standards (HTML5, modern CSS3, and vanilla JavaScript), you do not need Node.js, npm, or any build tools to run it.

### Method 1: Just Open in Browser
Double-click `index.html` in your file finder, or open it with Safari, Chrome, or Firefox.

### Method 2: Local HTTP Server (Recommended)
From this directory:

```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node
npx serve .
```
Then visit: `http://localhost:8080`

---

## 🌐 1-Minute Free Deployment Guide

### Option 1: GitHub Pages (Free, Custom Domain Support)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ultimate contact page"
   ```
2. Create a repository on GitHub (e.g. `kendren-links` or `contact`).
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/cornishlikeadam/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository settings, navigate to **Pages** -> Source: **Deploy from a branch** (`main` / root).
5. (Optional) Under **Custom domain**, enter `contact.kendren.us` or `links.kendren.us`.

### Option 2: Vercel
```bash
# Run in this directory
npx vercel
```
Follow the prompt (select default settings). It will deploy in under 10 seconds.

### Option 3: Cloudflare Pages
1. Go to the Cloudflare dashboard -> **Workers & Pages** -> **Create application** -> **Pages**.
2. Connect your GitHub repository or drag-and-drop this entire folder.
3. Build command: *(leave empty)*, Output directory: `.`

---

## 🛠️ Customizing Your Links & Profile

### In the Browser (Easiest)
1. Open the page in your browser.
2. Click the **⚙️ (Settings)** icon in the top right.
3. Edit your name, bio, phone, email, and avatar URL.
4. Click **Save & Apply Changes**.
5. Click **🚀 Export Standalone index.html** to download the updated file.

### In Code (`app.js`)
Open `app.js` and modify the `DEFAULT_STATE` object:
- `profile`: Edit your personal information, bio, and social handles.
- `links`: Add, reorder, or delete link items, custom badges (`"Flagship"`, `"New"`, `"Open Source"`), categories (`"projects"`, `"connect"`, `"profiles"`), and icons (`"globe"`, `"github"`, `"linkedin"`, `"sparkles"`, `"calendar"`, `"mail"`, `"phone"`).

---

## 📁 File Structure

```
ultimate-contact-page/
├── index.html       # Primary semantic markup, modals, and views
├── style.css        # Responsive styling, glassmorphism, and 4 theme definitions
├── app.js           # Application logic, vCard generator, live clock, and state
├── qrcode.min.js    # Zero-dependency client-side QR code generator
└── README.md        # Documentation and deployment instructions
```

---

*Designed and crafted for Kendren J. Cornish · Applied Artificial Intelligence.*
