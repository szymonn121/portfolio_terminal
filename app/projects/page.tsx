"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!swiperInstance) return;

      if (e.key === "ArrowLeft") {
        swiperInstance.slidePrev();
      } else if (e.key === "ArrowRight") {
        swiperInstance.slideNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [swiperInstance]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  return (
    <div className="min-h-screen bg-terminal-dark py-8">
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl text-glow mb-2">
            [PROJECTS.DIR]
          </h1>
          <p className="text-lg md:text-xl text-terminal-dim">
            Project {activeIndex + 1} of {projects.length} | Use arrows or swipe to navigate
          </p>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Keyboard, Mousewheel]}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        keyboard={{
          enabled: true,
          onlyInViewport: false,
        }}
        mousewheel={{
          forceToAxis: true,
        }}
        navigation={{
          enabled: true,
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        breakpoints={{
          640: {
            slidesPerView: 1.15,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 1.25,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1.3,
            spaceBetween: 40,
          },
        }}
        className="w-full"
        style={{ height: "70vh" }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="h-full flex items-center justify-center px-2 py-4 sm:p-4">
              <div className="dos-box p-4 sm:p-6 md:p-8 w-full h-full flex flex-col max-w-5xl overflow-y-auto">
                {/* Project Screenshot */}
                <div className="relative w-full aspect-video mb-4 sm:mb-6 bg-terminal-dim border-2 border-terminal-green overflow-hidden flex-shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority={activeIndex === project.id - 1}
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-terminal-dark/80 to-transparent" />
                </div>

                {/* Project Info */}
                <div className="flex-1 space-y-3 sm:space-y-4 min-h-0">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl text-glow font-bold">
                    {project.title}
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm md:text-base border border-terminal-green bg-terminal-dark text-terminal-green"
                      >
                        [{tag}]
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith('/') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="dos-box px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg md:text-xl hover:bg-terminal-green hover:text-terminal-dark transition-all duration-300"
                      >
                        {project.liveUrl.startsWith('/') ? '[VIEW GALLERY]' : '[LIVE DEMO]'}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dos-box px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg md:text-xl hover:bg-terminal-green hover:text-terminal-dark transition-all duration-300"
                      >
                        [GITHUB]
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Instructions */}
      <div className="container mx-auto px-4 mt-8">
        <div className="text-center text-terminal-dim">
          <p className="text-base md:text-lg">
            ◄ PREV | ► NEXT | Click & Drag | Touch Swipe
          </p>
        </div>
      </div>

      {/* Custom Swiper Navigation Styles */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }

        @media (min-width: 641px) {
          .swiper-button-next,
          .swiper-button-prev {
            color: var(--terminal-green);
            background: rgba(0, 0, 0, 0.8);
            width: 50px;
            height: 50px;
            border: 2px solid var(--terminal-green);
            border-radius: 0;
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 20px;
            font-weight: bold;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: var(--terminal-green);
            color: var(--terminal-dark);
          }
        }

        .swiper-slide {
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .swiper-slide-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
