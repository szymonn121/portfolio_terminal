// TODO: Replace with your own projects
// Update the image paths, titles, descriptions, tags, and URLs

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Bezpiesniowy",
    description:
      "A lightweight local music-quiz MVP where you guess songs from progressively longer audio snippets, featuring MP3 ID3 metadata reading, an admin panel, JWT authentication, and unit tests.",
    image: "/images/bezpiesniowy.png",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind"],
    liveUrl: "https://bezpiesniowy.onrender.com/",
    githubUrl: "https://github.com/szymonn121/Bezpiesniowy.pl",
  },
  {
    id: 5,
    title: "Game Photography Collection",
    description:
      "A curated collection of stunning in-game screenshots and moments captured from various video games. Showcasing the beauty of virtual worlds through photography and composition.",
    image: "/images/game-photos.png",
    tags: ["Photography", "Gaming", "Virtual", "Art"],
    liveUrl: "/game-photos",
  },
  {
    id: 6,
    title: "Real-World Photography",
    description:
      "A portfolio of real-world photographs capturing moments, landscapes, and life. Exploring light, composition, and storytelling through the lens.",
    image: "/images/real-photos.jpg",
    tags: ["Photography", "Real Life", "Art", "Portfolio"],
    liveUrl: "/real-photos",
  },
];
