import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), "public/images/games");
    
    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files from the directory
    const files = fs.readdirSync(imagesDirectory);
    
    // Filter only image files
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext);
    });

    // Create full paths for images
    const images = imageFiles.map((file) => `/images/games/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error reading games directory:", error);
    return NextResponse.json({ images: [] });
  }
}
