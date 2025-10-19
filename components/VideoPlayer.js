// components/VideoPlayer.js
import { useRef, useEffect, useState } from 'react';

export default function VideoPlayer({
  src,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "auto", // Changed from "none" to "auto" for instant loading
  className = "",
  style = {},
  videoStyle = {},
  fallbackImage = null, // Optional poster for loading state
  onReady = null, // Callback when video is ready to play
  onError = null, // Error handling
}) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      onReady?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    // Force play if autoplay didn't work
    const handleLoadStart = () => {
      if (autoPlay && video.paused) {
        const playAttempt = video.play();
        if (playAttempt !== undefined) {
          playAttempt.catch(() => {
            // Autoplay was prevented, fallback to muted autoplay
            video.muted = true;
            video.play();
          });
        }
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);

    // Preload the video immediately
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [src, autoPlay, onReady, onError]);

  return (
    <div
      className={`video-wrapper ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000", // Fallback background
        ...style,
      }}
    >
      {hasError && fallbackImage ? (
        <img
          src={fallbackImage}
          alt="Video fallback"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          poster={fallbackImage} // Show poster while loading
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isLoaded ? 1 : 0, // Smooth transition when loaded
            transition: 'opacity 0.3s ease-in-out',
            ...videoStyle,
          }}
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}