---
style: creative-bold
accent-color: "#FF6B35"
animations: moderate
---

# Frontend Slides
## Create Stunning HTML Presentations with Zero Dependencies

---

## The Problem
### Most presentation tools force you to choose:

* **Design quality** OR ease of use
* **Dependencies** OR modern features
* **Templates** OR customization
* **Describe your vision** OR see what you get

---

## The Solution
### Frontend Slides: Show, Don't Tell

A Claude Code skill that creates beautiful, animation-rich HTML presentations through **visual exploration**

---

## Core Philosophy

### 🎯 Zero Dependencies
Single HTML files. No npm, no build tools, no frameworks. Works in 10 years.

### 👁️ Show, Don't Tell
Pick from visual previews instead of describing abstract preferences.

### ✨ Anti-AI-Slop
12 curated distinctive styles. Every presentation feels custom-crafted.

### 📱 Production Quality
Accessible, responsive, well-commented code you can customize.

---

## How It Works

### 1. Tell Claude What You Need
"Create a pitch deck for my AI startup"

### 2. Describe Your Content
Slides, messages, target feeling

### 3. See Visual Previews
Compare 3 generated style options

### 4. Get Your Presentation
Opens automatically in browser

---

## 12 Curated Styles

### Dark Themes
* **Bold Signal** - Confident, high-impact, vibrant
* **Electric Studio** - Clean, professional, split-panel
* **Creative Voltage** - Energetic, retro-modern, neon
* **Dark Botanical** - Elegant, sophisticated, warm

### Light Themes
* **Notebook Tabs** - Editorial, organized, colorful
* **Pastel Geometry** - Friendly, approachable, pills
* **Split Pastel** - Playful, modern, two-color
* **Vintage Editorial** - Witty, personality-driven

---

## Specialty Styles

### Neon Cyber
Futuristic, particle backgrounds, neon glow

### Terminal Green
Developer-focused, hacker aesthetic

### Swiss Modern
Minimal, Bauhaus-inspired, geometric

### Paper & Ink
Literary, drop caps, pull quotes

---

## PowerPoint Conversion

### Transform PPT to Web in 4 Steps

1. **Extract** - All text, images, and notes
2. **Preview** - Confirm extracted content
3. **Style** - Pick your visual aesthetic
4. **Generate** - HTML with all original assets

---

## Key Features

### 📐 Viewport Fitting (Non-Negotiable)
Every slide fits exactly in 100vh. No scrolling, ever.

### 🎨 Distinctive Design
Curated fonts, bold colors, atmospheric backgrounds

### 🎬 Rich Animations
CSS-only micro-interactions and page load choreography

### 📝 Well-Commented Code
Future-you will thank present-you

---

## Use Cases

### Perfect For:
* 🚀 Startup pitch decks
* 📊 Product launches
* 🎓 Teaching and tutorials
* 💼 Conference talks
* 📢 Internal presentations

### Why Choose HTML?
* Works offline forever
* Easy to embed and share
* Lightweight (50-200KB)
* Full control over design

---

## Installation

### Via Plugin Marketplace
```bash
/plugin marketplace add zarazhangrui/frontend-slides
/plugin install frontend-slides@frontend-slides
```

### Then Use It
```
/frontend-slides
```

That's it! 🎉

---

## Architecture

### Progressive Disclosure Design

**Main skill file**: Concise workflow map (~180 lines)

**Supporting files loaded on-demand**:
* Style presets (12 themes)
* Viewport responsive CSS
* HTML template structure
* Animation patterns
* PPT extraction script

Following OpenAI's "harness engineering" principle

---

## Share Your Work

### Deploy to Live URL
```bash
bash scripts/deploy.sh ./my-deck/
```
One command → permanent Vercel URL

### Export to PDF
```bash
bash scripts/export-pdf.sh ./presentation.html
```
For email, Slack, Notion, or printing

---

## Design Philosophy

### "You don't need to be a designer to make beautiful things"

You just need to **react to what you see**

### "Dependencies are debt"

A single HTML file will work in 10 years

### "Generic is forgettable"

Every presentation should feel **custom-crafted**

---

## Technical Excellence

### Viewport Constraints
* Every slide: `height: 100vh; overflow: hidden`
* Font sizes: `clamp(min, preferred, max)`
* Images: `max-height: min(50vh, 400px)`
* Breakpoints: 700px, 600px, 500px
* Reduced motion support

### Content Density Limits
Enforced max content per slide type. Overflow? Auto-split into multiple slides.

---

## Why Frontend Slides?

### ❌ Generic AI Templates
Purple gradients, Inter font, predictable layouts

### ✅ Curated Distinctive Design
Bold choices, unique fonts, atmospheric depth

### ❌ Describe What You Want
"Make it modern and professional..."

### ✅ Show and Pick
Here are 3 options. Which speaks to you?

---

## Requirements

### Essential
* Claude Code CLI

### Optional (for features)
* Python + `python-pptx` (PPT conversion)
* Node.js + Vercel (URL deployment)
* Playwright (PDF export)

All optional dependencies install automatically when needed

---

## Created With

### Vibe Coding Philosophy

Building beautiful things without being a traditional software engineer

### Made by @zarazhangrui
With Claude Code

### MIT License
Use it, modify it, share it

---

## Get Started Today

### 1. Install the skill
```bash
/plugin marketplace add zarazhangrui/frontend-slides
/plugin install frontend-slides@frontend-slides
```

### 2. Create your first deck
```
/frontend-slides
```

### 3. Pick a style you love

### 4. Share with the world 🚀

---

## Thank You

### Questions? Ideas? Contributions?

**GitHub**: github.com/zarazhangrui/frontend-slides

**Try it now**: `/frontend-slides`

Let's make the web beautiful, one presentation at a time ✨
