# 🚀 Quick Deployment Guide — Luxe Interior

**Designed by Pritam Naskar (Rehan'Z Digital Network)**

This is a **static website** (HTML/CSS/JS) — no server-side code, no database, no build process needed.

---

## ⚡ Fastest Deploy: Netlify Drop (2 minutes)

1. Go to **[netlify.com](https://netlify.com)** (free account)
2. Click **"Add new site" → "Deploy manually"**
3. **Drag the entire `luxe-interior` folder** into the drop zone
4. ✅ **Done!** Your site is live at `https://random-name-12345.netlify.app`

### Optional: Custom Domain
- Go to **Site settings → Domain management → Add custom domain**
- Follow DNS instructions from your domain provider

---

## 📦 Alternative Deployments

### GitHub Pages (Free)
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/luxe-interior.git
git push -u origin main

# 2. Enable Pages
# Go to repo Settings → Pages
# Source: main branch / root folder
# Site will be at: https://YOUR_USERNAME.github.io/luxe-interior
```

### Vercel (Free)
```bash
npm i -g vercel
cd luxe-interior
vercel
# Follow prompts
```

### Cloudflare Pages (Free)
1. Push to GitHub (see above)
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect GitHub repo
4. Build settings:
   - **Build command:** (leave empty)
   - **Build output:** `.`
5. Deploy

---

## 🔧 Before You Deploy

### 1. Update Contact Information
Edit `index.html` and replace:
- **Phone:** `+91 98765 43210` → Your phone number
- **Email:** `hello@luxeinterior.in` → Your email
- **Address:** `12B Camac Street, Kolkata` → Your address
- **WhatsApp:** Line 1053, replace `919876543210`

### 2. Update Sitemap & Robots.txt
- `sitemap.xml`: Replace `yourdomain.com` with your actual domain
- `robots.txt`: Replace `yourdomain.com` with your actual domain

### 3. Replace Portfolio Images (Optional)
- Create `assets/` folder
- Add your project images
- Replace Unsplash URLs in `index.html` with your images

### 4. Test Locally First
```bash
# Simple server:
python3 -m http.server 8000
# Or:
npx http-server . -p 8000

# Visit: http://localhost:8000
```

---

## 📝 Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Check contact form submission
- [ ] Verify WhatsApp button works
- [ ] Test on mobile devices
- [ ] Run Google PageSpeed Insights
- [ ] Add Google Analytics (optional)
- [ ] Set up form backend (Formspree/Netlify Forms)
- [ ] Submit sitemap to Google Search Console
- [ ] Add custom domain (if applicable)
- [ ] Enable HTTPS (auto on Netlify/Vercel)

---

## 🎯 Connect Contact Form

The form currently shows a success message locally. To actually receive emails:

### Option 1: Formspree (Easiest)
1. Go to [formspree.io](https://formspree.io)
2. Sign up for free
3. Create a new form
4. Copy your form endpoint
5. In `index.html`, line ~850, change:
   ```html
   <form class="contact-form" id="contact-form" 
         action="https://formspree.io/f/YOUR_FORM_ID" 
         method="POST">
   ```
6. Remove the JavaScript form handler in `js/main.js` (lines 315-365)

### Option 2: Netlify Forms
1. Add `netlify` attribute to form in `index.html`:
   ```html
   <form class="contact-form" name="contact" netlify>
   ```
2. Add hidden field:
   ```html
   <input type="hidden" name="form-name" value="contact" />
   ```
3. Deploy to Netlify
4. Go to **Site settings → Forms** to see submissions

---

## 🌐 Custom Domain Setup

### Netlify
1. **Site settings → Domain management → Add custom domain**
2. Add your domain (e.g., `luxeinterior.in`)
3. Follow DNS instructions:
   - **CNAME record:** `www` → `your-site.netlify.app`
   - **A record:** `@` → Netlify's IP (shown in dashboard)
4. Wait for DNS propagation (5 mins – 48 hrs)
5. Netlify auto-provisions SSL certificate

### Cloudflare (Optional — for better performance)
1. Transfer your domain's nameservers to Cloudflare
2. Add DNS records as instructed by your host
3. Enable **Cloudflare proxy** (orange cloud icon)
4. Free CDN + DDoS protection

---

## 📊 Analytics Setup

### Google Analytics
Add before `</head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your GA4 tracking ID.

---

## 🐛 Common Issues

### Site Not Loading After Deploy
- Clear browser cache (Ctrl+Shift+R)
- Check build logs for errors
- Verify all file paths are correct (case-sensitive on Linux servers)

### Images Not Showing
- Check image URLs are correct
- Verify images are in the repo
- Check browser console for 404 errors

### Custom Cursor Not Working
- Normal behavior on mobile (cursor disabled for touch devices)
- Check `js/main.js` is loading
- Works best in Chrome/Firefox

---

## 💡 Pro Tips

1. **Compress Images:** Use [TinyPNG](https://tinypng.com) before uploading
2. **Enable Caching:** Already configured in `netlify.toml`
3. **Monitor Performance:** Use [Google PageSpeed Insights](https://pagespeed.web.dev)
4. **SEO:** Submit sitemap to [Google Search Console](https://search.google.com/search-console)
5. **Backup:** Keep a copy of your code on GitHub

---

**Need help?** Check the full README.md for detailed guides.

🚀 **Your luxury interior design website is ready to impress clients!**
