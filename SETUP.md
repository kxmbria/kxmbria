# Setup Guide - Migrating from Figma Make to GitHub

This guide will help you transfer your portfolio project from Figma Make to a GitHub repository.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js 18+ installed
- Code editor (VS Code recommended)

## 🚀 Step-by-Step Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `portfolio`)
4. Choose "Public" or "Private"
5. **Do NOT** initialize with README (we have one already)
6. Click "Create repository"

### 2. Set Up Local Repository

Open your terminal and run:

```bash
# Navigate to where you want your project
cd ~/Desktop

# Create a new directory
mkdir portfolio
cd portfolio

# Initialize git
git init

# Copy all the config files from this download into this directory
# (All the files you just downloaded)

# Add all files to git
git add .

# Make your first commit
git commit -m "Initial commit: Project setup"

# Connect to GitHub (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Add Your Component Files

Now you need to copy your components from Figma Make:

#### Main Components (go in `src/components/`)
- AboutPage.tsx
- Achievements.tsx
- AIBadge.tsx
- AutoScrollGallery.tsx
- AwardStar.tsx
- CategorySwitcher.tsx
- Contact.tsx
- CustomCursor.tsx
- Experience.tsx
- FloatingCategoryCircles.tsx
- Hero.tsx
- Navigation.tsx
- Portfolio.tsx
- PortfolioGrid.tsx
- ProjectModal.tsx
- ScrollIndicator.tsx

#### Figma Components (go in `src/components/figma/`)
- ImageWithFallback.tsx

#### UI Components (go in `src/components/ui/`)
- All your shadcn/ui components (accordion.tsx, alert.tsx, button.tsx, etc.)
- use-mobile.ts
- utils.ts (if you have one in the ui folder)

### 4. Add Other Files

If you have these files in Figma Make, copy them over:

- `guidelines/Guidelines.md` → Goes in `guidelines/` folder
- `Attributions.md` → Goes in project root
- Any images/assets → Create a `public/` folder and put them there

### 5. Install Dependencies

```bash
npm install
```

This will install all the packages listed in `package.json`.

### 6. Test Locally

```bash
npm run dev
```

Open your browser to `http://localhost:5173` to see your site!

### 7. Fix Any Import Errors

If you see import errors, you may need to update import paths:

**Before (Figma Make):**
```tsx
import { Button } from "./ui/button"
```

**After (GitHub setup):**
```tsx
import { Button } from "@/components/ui/button"
```

The `@/` is an alias that points to the `src/` directory.

### 8. Push Your Components to GitHub

After adding all your files:

```bash
git add .
git commit -m "Add all components and assets"
git push
```

## 🎨 Verifying Everything Works

### Checklist

- [ ] All components are in the correct folders
- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts without errors
- [ ] Site loads in browser at localhost:5173
- [ ] No TypeScript errors in terminal
- [ ] All images load correctly
- [ ] Custom cursor works
- [ ] Dark mode toggle works
- [ ] Navigation works
- [ ] Contact form works

## 🐛 Common Issues

### Issue: "Cannot find module '@/components/...'"

**Solution:** Make sure you have the path alias set up in:
- `vite.config.ts` (already configured)
- `tsconfig.json` (already configured)

### Issue: "Module not found: sonner"

**Solution:** Run `npm install` again to ensure all dependencies are installed.

### Issue: Fonts not loading

**Solution:** The fonts are loaded from CDN in `globals.css`, so you need an internet connection for them to work.

### Issue: TypeScript errors

**Solution:** Make sure all your component files have proper TypeScript types. You can run `npm run build` to see all TypeScript errors.

## 📦 Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

## 🌐 Deployment Options

### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import your repository
4. Vercel will auto-detect Vite and deploy!

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`

### GitHub Pages
Add to your `package.json`:
```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO",
```

Then:
```bash
npm install --save-dev gh-pages
```

Add to scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Run:
```bash
npm run deploy
```

## 🆘 Need Help?

If you run into issues:
1. Check the error message carefully
2. Google the error (Stack Overflow usually has answers)
3. Check that all files are in the right folders
4. Make sure `node_modules` exists (run `npm install` if not)
5. Try deleting `node_modules` and running `npm install` again

## 📝 Next Steps

Once everything is working:
1. Update the README.md with your project details
2. Add screenshots to the README
3. Update the `<title>` in `index.html`
4. Add a favicon to the `public/` folder
5. Consider adding a license file
6. Set up continuous deployment with Vercel or Netlify

Good luck! 🚀
