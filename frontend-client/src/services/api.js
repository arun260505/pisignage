export const pairDisplay = async (code) => {
  const res = await fetch("http://localhost:5000/api/display/pair", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });

  if (!res.ok) {
    throw new Error("Invalid code");
  }

  return res.json();
};

export const uploadMedia = async (file, displayId, type) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("displayId", displayId);
  formData.append("type", type);

  const res = await fetch("http://localhost:5000/api/media/upload", {
    method: "POST",
    body: formData
  });

  return res.json();
};
