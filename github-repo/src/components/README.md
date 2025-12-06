# Components Directory

This directory contains all the React components for the portfolio application.

## Structure

### Main Components (place in this directory):
- `AboutPage.tsx` - About page component
- `Achievements.tsx` - Achievements section
- `AIBadge.tsx` - AI badge component
- `AutoScrollGallery.tsx` - Auto-scrolling gallery
- `AwardStar.tsx` - Award star component
- `CategorySwitcher.tsx` - Category switching UI
- `Contact.tsx` - Contact form/section
- `CustomCursor.tsx` - Custom cursor component
- `Experience.tsx` - Experience section
- `FloatingCategoryCircles.tsx` - Floating category circles
- `Hero.tsx` - Hero section
- `Navigation.tsx` - Main navigation
- `Portfolio.tsx` - Portfolio grid/section
- `PortfolioGrid.tsx` - Portfolio grid component
- `ProjectModal.tsx` - Project modal/dialog
- `ScrollIndicator.tsx` - Scroll indicator

### Subdirectories

#### `/figma`
Contains Figma-specific components:
- `ImageWithFallback.tsx` - Image component with fallback support

#### `/ui`
Contains shadcn/ui components (all the Radix UI-based components):
- `accordion.tsx`
- `alert-dialog.tsx`
- `alert.tsx`
- `aspect-ratio.tsx`
- `avatar.tsx`
- `badge.tsx`
- And many more...

Also includes utilities:
- `use-mobile.ts` - Mobile detection hook
- Plus any other UI-related utilities

## Adding New Components

1. Create your component file in the appropriate directory
2. Use TypeScript with proper type definitions
3. Import shadcn/ui components from `@/components/ui`
4. Use the `cn()` utility from `@/lib/utils` for className merging
