// components/VideoPlayer.js
export default function VideoPlayer({
  src,
  sources = [], // array of { src: string, type: string }
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "metadata",
  poster = "/fallback.jpg", // fallback image while loading
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
        poster={poster}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          backgroundColor: "#000",
        }}
      >
        {/* Multiple sources for fallback quality */}
        {sources.length > 0 ? (
          sources.map((s, i) => (
            <source key={i} src={s.src} type={s.type} />
          ))
        ) : (
          <source src={src} type="video/mp4" />
        )}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}