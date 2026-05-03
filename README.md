# 🏛️ Luxe Interior — Premium Interior Design Studio Website

> **Designed & Developed by Pritam Naskar (Rehan'Z Digital Network)**
> 
> A high-end, conversion-focused website for a luxury interior design agency. Production-ready, fully responsive, and built with premium aesthetics.

---

## ✨ Features

### 🎨 Design & UI
- **Luxury Aesthetic** — Sophisticated dark theme with gold accents, Cormorant Garamond + DM Sans typography
- **Custom Cursor** — Premium dual-cursor system (dot + ring) with hover interactions
- **Glassmorphism Effects** — Modern depth and layering throughout
- **Smooth Animations** — Scroll-reveal, parallax hero, marquee ribbons, animated counters
- **Responsive Design** — Mobile-first with 4 breakpoints (420px / 680px / 980px / 1180px)

### 🧩 Sections
- ✅ **Hero Section** — Full-screen parallax background, animated badge, vertical text accent
- ✅ **Marquee Ribbon** — Auto-scrolling service highlights
- ✅ **About Section** — Dual-image layout, animated stats counters, company pillars
- ✅ **Services Grid** — 4 detailed service cards with hover effects
- ✅ **Portfolio Gallery** — Masonry grid with category filters + lightbox viewer
- ✅ **Why Choose Us** — 6-item benefits grid with icon cards
- ✅ **CTA Banner** — Conversion-focused section with parallax background
- ✅ **Testimonials Carousel** — Auto-playing slider with pagination dots
- ✅ **Contact Form** — Lead generation with validation + success state
- ✅ **Footer** — Multi-column layout with social links

### 🚀 Interactive Features
- Sticky navbar with scroll state
- Smooth scroll to anchor links
- Portfolio category filtering (All / Residential / Commercial / Renovation)
- Lightbox image viewer with keyboard navigation (←/→/Esc)
- Testimonials auto-carousel (5s interval, touch swipe support)
- Contact form client-side validation
- Floating WhatsApp button with expand-on-hover

### ⚡ Performance
- Lazy image loading
- Intersection Observer for scroll reveals
- CSS-only animations (GPU-accelerated)
- Minimal JavaScript footprint (~340 lines)
- Optimized Unsplash images (preloaded CDN)

---

## 📁 Project Structure

```
luxe-interior/
├── index.html          # Main HTML file (complete single-page site)
├── css/
│   └── style.css       # Complete stylesheet (~1200 lines)
├── js/
│   └── main.js         # All JavaScript functionality
├── assets/             # (Optional) Add logo, favicon, etc.
├── README.md           # This file
└── .gitignore
```

---

## 🚀 Quick Start — Local Development

### Option 1: Direct Open
```bash
# Just open index.html in your browser
open index.html
```

### Option 2: Live Server (Recommended)

**Using Python:**
```bash
python3 -m http.server 8000
# Open: http://localhost:8000
```

**Using Node.js:**
```bash
npx serve .
# or
npx live-server --port=8000
```

**Using VS Code:**
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

---

## 🌐 Deployment Guide

### Deploy to Netlify (Free, 1-Click)

1. Go to [netlify.com](https://www.netlify.com/)
2. Drag the `luxe-interior` folder onto the dashboard
3. Done! Live at `https://random-name.netlify.app`

### Deploy to Vercel

```bash
npx vercel
# Follow prompts
```

### Deploy to GitHub Pages

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Luxe Interior website"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main

# 2. Enable Pages in repo Settings → Pages → Deploy from main
```

---

## 🎨 Customization Guide

### Change Colors
Edit `css/style.css` (lines 10-28):

```css
:root {
  --obsidian:  #0c0b09;   /* Background */
  --gold:      #c9a84c;   /* Accent */
  --ivory:     #f5f0e8;   /* Text */
}
```

### Change Fonts
Replace Google Fonts link in `index.html` and update CSS variables.

### Update Images
Replace Unsplash URLs in `index.html` with your own images in `assets/`.

### Update Content
Search and replace in `index.html`:
- `Luxe Interior` → Your business name
- `+91 98765 43210` → Your phone
- `hello@luxeinterior.in` → Your email
- `12B Camac Street, Kolkata` → Your address

---

## 📞 Contact

**Developer:** Pritam Naskar  
**Brand:** Rehan'Z Digital Network

---

**Luxe Interior v1.0.0**  
Designed & Developed by Pritam Naskar (Rehan'Z Digital Network)
