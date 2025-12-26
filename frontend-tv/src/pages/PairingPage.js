import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerDisplay } from "../services/api";
import socket from "../services/socket";

function PairingPage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCode = localStorage.getItem("pairingCode");

    if (savedCode) {
      // Reuse existing pairing code
      setCode(savedCode);
      socket.emit("join-tv", savedCode);
    } else {
      // Register new TV
      registerDisplay().then((data) => {
        localStorage.setItem("pairingCode", data.pairingCode);
        setCode(data.pairingCode);
        socket.emit("join-tv", data.pairingCode);
      });
    }

    // ✅ WAIT for client to pair
    socket.on("tv-paired", () => {
      navigate("/display");
    });

    return () => {
      socket.off("tv-paired");
    };
  }, [navigate]);

  return (
    <div className="tv-screen">
      <h1>PAIR THIS TV</h1>
      <h2>{code || "Generating code..."}</h2>
      <p>Enter this code in the client dashboard</p>
    </div>
  );
}

export default PairingPage;
