"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function GamePhotosPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch list of images from the games folder
    fetch("/api/images/games")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <section className="dos-box p-6">
        <h1 className="text-4xl md:text-5xl text-glow mb-4">
          [GAME_PHOTOGRAPHY.DIR]
        </h1>
        <p className="text-lg md:text-xl text-terminal-dim">
          Screenshots and moments captured from virtual worlds
        </p>
        <p className="text-base md:text-lg text-terminal-dim mt-2">
          Total images: {images.length}
        </p>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="dos-box p-8 text-center text-xl md:text-2xl">
          <div className="animate-pulse">LOADING IMAGES...</div>
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && images.length > 0 && (
        <section className="dos-box p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video border-2 border-terminal-green bg-terminal-dim cursor-pointer hover:border-terminal-glow transition-all group overflow-hidden"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`Game photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-terminal-dark/0 group-hover:bg-terminal-dark/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-terminal-green opacity-0 group-hover:opacity-100 text-xl md:text-2xl font-bold">
                    [CLICK TO ENLARGE]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading && images.length === 0 && (
        <section className="dos-box p-8 text-center">
          <div className="text-2xl md:text-3xl text-terminal-dim mb-4">
            NO IMAGES FOUND
          </div>
          <p className="text-lg md:text-xl">
            Add your game screenshots to:
          </p>
          <p className="text-base md:text-lg text-terminal-green mt-2 font-mono">
            public/images/games/
          </p>
        </section>
      )}

      {/* Modal for Full Image View */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-terminal-dark/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Full size game photo"
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              className="absolute top-4 right-4 dos-box px-6 py-3 text-xl md:text-2xl hover:bg-terminal-green hover:text-terminal-dark transition-all"
              onClick={() => setSelectedImage(null)}
            >
              [CLOSE]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
