# Portfolio Website Setup Guide

Since Node.js was not detected on your system, I have manually generated the complete source code for your portfolio website. Follow these steps to get it running.

## 1. Install Node.js
You need Node.js to run this project.
- Download it here: [https://nodejs.org/](https://nodejs.org/)
- Install the **LTS** version.
- After installation, restart your terminal (or computer) to ensure `node` and `npm` commands work.

## 2. Install Dependencies
Open a terminal (Command Prompt or PowerShell) in this folder and run:

```bash
npm install
```

This will download React, Tailwind CSS, Framer Motion, and other tools.

## 3. Run the Website
To start the development server:

```bash
npm run dev
```

Then open the link shown in the terminal (usually `http://localhost:5173`) in your browser.

## Customization
- **Images**: I used Unsplash placeholders. Replace the URLs in `src/components/Hero.jsx`, `About.jsx`, and `Portfolio.jsx` with your own images.
- **Text**: Edit the text in the components to match your real experience and bio.
- **Colors**: Change colors in `tailwind.config.js` if you want a different theme.
