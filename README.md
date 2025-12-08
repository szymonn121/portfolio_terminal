# 🖥️ Retro CRT Terminal Portfolio

A multi-page portfolio website with retro DOS/terminal aesthetics and CRT kinescope visual effects. Built with Next.js, TypeScript, and Tailwind CSS.

![Terminal Portfolio](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

## ✨ Features

- 📟 **Retro CRT Aesthetic**: Authentic terminal look with scanlines, phosphor glow, and screen curvature effects
- 🎨 **Multi-Page Architecture**: Separate routes for Home, About, Projects, and Photo Galleries
- ⌨️ **Interactive Command Prompt**: Working terminal with commands (help, about, projects, skills, social, etc.)
- ⌨️ **Full Keyboard Navigation**: Arrow keys, tab navigation, and accessibility features
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🎭 **Typing Animation**: DOS-style boot sequence with typing effects
- 🎵 **Spotify Integration**: Embedded music player on the About page
- 🖼️ **Interactive Project Slider**: Fullscreen slider with peek view of adjacent slides
- 📸 **Photo Galleries**: Dedicated pages for game and real-world photography
- 🐳 **Docker Ready**: Full containerization with CI/CD pipeline
- ♿ **Accessible**: Semantic HTML, ARIA labels, and focus management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Run the development server**
   ```powershell
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### 1. Personal Information

#### Homepage (`app/page.tsx`)

Replace the intro text and quick info:

```typescript
// Line 11-20: Update introduction text
const introLines = [
  "C:\\PORTFOLIO> SYSTEM.EXE /BOOT",
  "Initializing system...",
  "Loading profile data...",
  "",
  "WELCOME TO MY DIGITAL DOMAIN",
  "",
  "Hello, I'm Szymon Kubiak - A Full Stack Developer", 
  "Specializing in modern web technologies and terminal aesthetics.",
  "",
  "Type 'help' for available commands...",
];

// Line 63-88: Update contact information
<div>
  <span className="text-terminal-dim">Location:</span> [Your City, Country]
</div>
<div>
  <span className="text-terminal-dim">Email:</span>{" "}
  <a href="mailto:your.email@example.com">
    your.email@example.com
  </a>
</div>
```

### 2. Skills Section

Edit `components/Skills.tsx` (Line 6-13):

```typescript
const skillsData = [
  { name: "JavaScript/TypeScript", level: 95 }, // ← Update these
  { name: "React/Next.js", level: 90 },
  { name: "Node.js", level: 85 },
  // Add or remove skills as needed
];
```

### 3. About Page

Edit `app/about/page.tsx`:

```typescript
// Line 10-25: Update personal information
const aboutData = {
  name: "Szymon Kubiak",
  title: "Full Stack Developer",
  bio: [
    "I'm a passionate developer...", // ← Update your bio
  ],
  interests: ["Web Development", "System Design", ...],
  experience: "5+ years",
  education: "Bachelor's in Computer Science",
};

// Line 28-37: Update music preferences
const musicData = {
  genres: ["Electronic", "Synthwave", ...],
  favoriteArtists: ["Daft Punk", "Kavinsky", ...],
};
```

### 4. Spotify Playlist

Edit `components/SpotifyEmbed.tsx` (Line 11):

1. Go to your Spotify playlist
2. Click **Share** → **Copy link**
3. Extract the playlist ID from the URL
   - Example: `https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M`
   - ID: `37i9dQZF1DXcBWIGoYBM5M`
4. Replace the `playlistId` default value:

```typescript
playlistId = "37i9dQZF1DXcBWIGoYBM5M", // ← Replace with your playlist ID
```

### 5. Projects

#### Update Project Data

Edit `data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "Your Project Title", // ← Change
    description: "Your project description...", // ← Change
    image: "/images/project-1.jpg", // ← Update path
    tags: ["Next.js", "TypeScript", ...], // ← Update tags
    liveUrl: "https://your-project.com", // ← Your live URL
    githubUrl: "https://github.com/you/repo", // ← Your GitHub URL
  },
  // Add more projects...
];
```

#### Replace Project Screenshots

1. Add your project images to `public/images/`
2. Name them: `project-1.jpg`, `project-2.jpg`, etc.
3. Recommended size: 1200×675px (16:9 aspect ratio)

### 6. Color Scheme

Edit `tailwind.config.ts` to change colors:

```typescript
colors: {
  terminal: {
    green: "#00FF41",  // ← Main terminal color
    dim: "#0F3D0F",    // ← Dim/secondary color
    dark: "#000000",   // ← Background color
    glow: "#00FF4180", // ← Glow effect color (with transparency)
  },
},
```

For alternative color schemes:
- **Amber**: `green: "#FFB000"`, `dim: "#3D2800"`
- **Blue**: `green: "#00D4FF"`, `dim: "#00293D"`
- **White**: `green: "#FFFFFF"`, `dim: "#666666"`

### 7. Font

The default font is **VT323**. To change it:

1. Edit `app/globals.css` (Line 1):
   ```css
   @import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
   ```

2. Update `tailwind.config.ts`:
   ```typescript
   fontFamily: {
     mono: ["YourFont", "Courier New", "monospace"],
   },
   ```

Alternative monospace fonts: `Courier Prime`, `IBM Plex Mono`, `Share Tech Mono`, `Roboto Mono`

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with TerminalLayout wrapper
│   ├── page.tsx            # Homepage (/)
│   ├── about/
│   │   └── page.tsx        # About page (/about)
│   ├── projects/
│   │   └── page.tsx        # Projects page (/projects)
│   └── globals.css         # Global styles with CRT effects
├── components/
│   ├── CRTOverlay.tsx      # Scanlines and grain effects
│   ├── Navigation.tsx      # Top navigation menu
│   ├── TerminalLayout.tsx  # Global layout wrapper
│   ├── CommandPrompt.tsx   # Fake command prompt with blinking cursor
│   ├── Skills.tsx          # DOS-style skill bars
│   ├── SpotifyEmbed.tsx    # Spotify iframe embed
│   └── TypingText.tsx      # Typing animation component
├── data/
│   └── projects.ts         # Project data array
├── public/
│   └── images/             # Project screenshots
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Styling Components

All components use Tailwind CSS. Key custom classes:

- `.crt-screen` - Adds vignette effect
- `.scanlines` - Animated scanline overlay
- `.grain` - Noise/grain effect
- `.text-glow` - Terminal glow effect
- `.dos-box` - DOS-style bordered box
- `.progress-bar` - Skill progress bars
- `.blink` - Blinking cursor animation

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

```powershell
# Build for production
npm run build

# Start production server
npm start
```

The build output will be in the `.next` folder.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Dependencies

- **next** - React framework with App Router
- **react** & **react-dom** - UI library
- **typescript** - Type safety
- **tailwindcss** - Utility-first CSS
- **swiper** - Touch slider for projects

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus-visible outlines
- Alt text for images
- Proper heading hierarchy

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 💡 Tips

1. **Performance**: Optimize images before adding them (use WebP format)
2. **SEO**: Update metadata in `app/layout.tsx`
3. **Analytics**: Add Google Analytics or similar in the layout
4. **Dark Mode**: The site is already dark-themed, no toggle needed
5. **Mobile**: Test on actual devices, not just browser DevTools

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t portfolio .
```

### Run Container Locally

```bash
docker run -p 3000:3000 portfolio
```

### Using Docker Compose

```bash
docker-compose up -d
```

## 🚀 CI/CD Pipeline

This project includes a GitHub Actions workflow for automatic deployment to VPS.

### Required GitHub Secrets

Configure these in your repository (Settings → Secrets → Actions):

- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub access token
- `VPS_HOST` - Your VPS IP address
- `VPS_USERNAME` - SSH username
- `VPS_SSH_KEY` - Private SSH key
- `VPS_PORT` - SSH port (default: 22)

### VPS Setup

1. Install Docker on your VPS:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

2. Configure SSH key authentication

3. (Optional) Set up Nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Deploy

Push to `main` branch to trigger automatic deployment:
```bash
git add .
git commit -m "Deploy update"
git push origin main
```

## 🐛 Troubleshooting

### Images not loading?
- Check file paths are correct
- Ensure images are in `public/images/`
- Use correct file extensions

### Swiper not working?
- Clear `.next` folder and rebuild
- Check browser console for errors
- Ensure `swiper` is installed

### Styling issues?
- Clear browser cache
- Check Tailwind classes are correct
- Verify `globals.css` is imported

### Docker build fails?
- Ensure `output: 'standalone'` is in `next.config.mjs`
- Check all dependencies are in `package.json`
- Verify `.dockerignore` is configured

## 📞 Support

If you need help customizing this portfolio, check the comments marked with `// TODO:` in the code files.

---

**Built with ❤️ and ⌨️ nostalgia**
