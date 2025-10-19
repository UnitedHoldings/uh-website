// components/VideoPlayer.js
export default function VideoPlayer({
  src,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "none",
  className = "",
  style = {},
}) {
  return (
    <div
      className={`video-wrapper ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <video
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}