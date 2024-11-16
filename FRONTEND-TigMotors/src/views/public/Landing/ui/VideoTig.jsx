import React, { useState } from "react";
import "../../../../styles/VideoTig.css"; 
import thumbnail from "../../../../assets/images/Tig-Imagen-Fondo.png";
import videoSource from "../../../../assets/videos/video_tig.mp4"; 

export default function VideoTig() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen">
      {!showVideo ? (
        <div className="thumbnail-wrapper">
          <img
            src={thumbnail}
            alt="Miniatura del video"
            className="thumbnail"
          />
          <button
            className="play-button"
            onClick={() => setShowVideo(true)}
          >
            Reproducir Video
          </button>
        </div>
      ) : (
        <div className="video-wrapper">
          <video
            className="video-player"
            controls
            autoPlay
          >
            <source
              src={videoSource}
              type="video/mp4"
            />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      )}
    </div>
  );
}
