import { useEffect, useState } from "react";
import socket from "../services/socket";

function DisplayPage() {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    // Listen for media sent from client
    socket.on("play-media", (mediaData) => {
      setMedia(mediaData);
    });

    // Cleanup on unmount
    return () => {
      socket.off("play-media");
    };
  }, []);

  return (
    <div className="tv-screen">
      {/* Default state */}
      {!media && (
        <h1 style={{ color: "white" }}>
          Waiting for content...
        </h1>
      )}

      {/* Image playback */}
      {media && media.type === "image" && (
        <img
          src={media.url}
          alt="display content"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      )}

      {/* Video playback */}
      {media && media.type === "video" && (
        <video
          src={media.url}
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      )}
    </div>
  );
}

export default DisplayPage;
