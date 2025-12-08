"use client";

import React from "react";

interface SpotifyEmbedProps {
  playlistId?: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  // User's Spotify profile: https://open.spotify.com/user/31cxpjaxjwegeqnyfb5dylp6xh7u?si=e21090a1c677482b
  // Replace with your Spotify playlist ID or keep user profile
  playlistId = "37i9dQZF1DX0XUsuxWHRQd",
}) => {
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  return (
    <div className="dos-box p-4" role="region" aria-label="Spotify music player">
      <div className="text-xl md:text-2xl mb-4 text-terminal-dim">
        ╔════════════════════════════════════════╗
        <br />
        ║ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;NOW PLAYING &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;║
        <br />
        ╚════════════════════════════════════════╝
      </div>

      <div className="relative w-full" style={{ paddingBottom: "380px" }}>
        <iframe
          src={embedUrl}
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full border-2 border-terminal-green"
          title="Spotify playlist"
        />
      </div>

      <div className="mt-4 text-sm md:text-base text-terminal-dim text-center">
        [STREAMING FROM SPOTIFY.EXE]
      </div>
    </div>
  );
};

export default SpotifyEmbed;
