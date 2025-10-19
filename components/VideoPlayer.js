// components/VideoPlayer.js
export default function VideoPlayer({
  src,
  width = "100%",
  height = "100%",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "none",
  style = {},
}) {
  return (
    <video
      width={width}
      height={height}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      style={{ outline: "none", ...style }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}