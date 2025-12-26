import { useState } from "react";
import socket from "../services/socket";
import "../styles/client.css";

function DashboardPage() {
  const [file, setFile] = useState(null);
  const pairingCode = localStorage.getItem("pairingCode");

  const sendMedia = () => {
    if (!file) return;

    const type = file.type.startsWith("video") ? "video" : "image";

    // Upload file first
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("displayId", "0");

    fetch("http://localhost:5000/api/media/upload", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        socket.emit("send-media", {
          pairingCode,
          media: {
            type,
            url: `http://localhost:5000${data.media.url}`
          }
        });
      });
  };

  return (
    <div className="client-screen">
      <h1>TV Dashboard</h1>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={sendMedia}>Send to TV</button>
    </div>
  );
}

export default DashboardPage;
