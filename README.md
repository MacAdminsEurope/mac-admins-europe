# Mac Admins Europe 2026 Website

A modern, responsive conference website built with [Astro](https://astro.build/).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```text
├── public/              # Static assets (images, favicon, videos)
│   ├── favicon-96x96.png
│   ├── favicon.svg
│   └── video-header.mp4
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts (header, footer)
│   │   └── Layout.astro     # Main layout with nav, footer, analytics
│   ├── pages/           # Website pages
│   │   ├── index.astro      # Homepage with circular video logo
│   │   ├── program.astro    # Program/schedule
│   │   ├── speakers.astro   # Speakers
│   │   ├── sponsors.astro   # Sponsors
│   │   ├── location.astro   # Venue & travel info
│   │   ├── tickets.astro    # Ticket information
│   │   ├── contact.astro    # Contact page
│   │   ├── coc.astro        # Code of Conduct
│   │   └── privacy.astro    # Privacy Policy (GDPR compliant)
│   └── styles/          # Global CSS
│       └── global.css       # All styles consolidated in one file
└── astro.config.mjs     # Astro configuration
```

## 🎨 Customization

### Colors

Edit `src/styles/global.css` to change the color scheme:

- `--eu-blue`: Primary blue (#003399)
- `--eu-gold`: Accent gold (#FFCC00)

### Content

Edit the `.astro` files in `src/pages/` to update content.

### Images & Videos

- Add images to `public/images/` and reference them in your pages
- Videos should be placed in `public/` for direct access
- Current video: `public/video-header.mp4` (1280x720px, embedded in homepage)

### CSS Architecture

All CSS is consolidated into a single file for optimal performance:

- **`src/styles/global.css`** - Contains all styles:
  - CSS variables (colors, spacing, typography)
  - Base/reset styles
  - Layout styles (header, footer, navigation)
  - Page-specific styles (hero, speakers, program, etc.)
  - Responsive breakpoints
- No inline `<style>` blocks in `.astro` files
- Single CSS file reduces HTTP requests and improves load times

## 🚀 Deploy to GitHub Pages

The project is pre-configured for automated deployment via GitHub Actions.

1. **Check Configuration**:
   - Ensure `astro.config.mjs` has the correct `site` and `base` path for your repository.
   - Current base: `/mac-admins-europe` (Update this if your repo name is different).

2. **Enable GitHub Actions**:
   - Go to Repository Settings → **Pages**
   - Under "Build and deployment", select **GitHub Actions** as the source.

3. **Deploy**:
   - Push to the `public` branch.
   - The workflow in `.github/workflows/deploy.yml` will automatically build and deploy the site.

## 📝 Adding Content

### Add a Speaker

Edit `src/pages/speakers.astro` and add a new speaker card.

### Add a Session

Edit `src/pages/program.astro` to add sessions to the schedule.

### Add a Sponsor

Edit `src/pages/sponsors.astro` to add sponsor logos.

## 🛠 Built With

- [Astro](https://astro.build/) - Static site generator
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) - Typography
- CSS Custom Properties - Styling

## 📄 License

MIT License - Feel free to use and modify for your own conference!

---

**Mac Admins Europe** - For the community, by the community 🇪🇺