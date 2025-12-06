# Portfolio Application

A modern, interactive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Custom design with beautiful animations
- 🌙 Dark mode support
- 📱 Fully responsive
- ♿ Accessibility-focused
- 🎭 Custom cursor interaction
- 🎯 Category-based portfolio filtering
- 📧 Contact form
- 🖼️ Image galleries with fallbacks

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Notifications:** Sonner

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── figma/       # Figma-specific components
│   │   └── ui/          # shadcn/ui components
│   ├── lib/             # Utility functions
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── guidelines/          # Project guidelines
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <repo-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Colors

The color scheme is defined in `src/styles/globals.css` using CSS custom properties. You can customize the colors by modifying the `:root` and `.dark` variables.

### Fonts

The project uses:
- **Plus Jakarta Sans** - Primary font
- **Cowkids** - Display/accent font

Fonts are imported in `globals.css` via Google Fonts and custom font sources.

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Deployment

This project can be deployed to any static hosting service:

- **Vercel:** `vercel --prod`
- **Netlify:** Connect your GitHub repo
- **GitHub Pages:** Use GitHub Actions
- **Cloudflare Pages:** Connect your repo

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]
