import React, { useState } from "react";

const MAGIC = "STEGANO1:";

function textToBits(text) {
  const bytes = new TextEncoder().encode(text);
  let bits = "";
  for (const byte of bytes) bits += byte.toString(2).padStart(8, "0");
  return bits;
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

export default function Encode() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");

  async function encodeMessage() {
    setStatus("");

      if (!file) return setStatus("error|Please select a PNG, JPG, JPEG, or BMP image.");
    if (!message.trim()) return setStatus("error|Please enter a secret message.");

    try {
      const image = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const bits = textToBits(MAGIC + message) +
        "00000000000000000000000000000000";

      const capacity = Math.floor((data.length / 4) * 3);
      if (bits.length > capacity) {
        throw new Error("Message is too large for this image.");
      }

      let bitIndex = 0;

      for (let i = 0; i < data.length && bitIndex < bits.length; i++) {
        if ((i + 1) % 4 === 0) continue;
        data[i] = (data[i] & 254) | Number(bits[bitIndex]);
        bitIndex++;
      }

      ctx.putImageData(imageData, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      setPreview(dataUrl);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "stego_image.png";
      link.click();

      setStatus("success|Message successfully hidden. stego_image.png has been downloaded.");
    } catch (error) {
      setStatus("error|" + error.message);
    }
  }

  const [type, text] = status.split("|");

  return (
    <section>
      <div className="hero">
        <div>
          <span className="eyebrow">MODULE 01</span>
          <h2>Encode Secret Message</h2>
          <p>Hide your confidential text inside an ordinary image using LSB steganography.</p>
        </div>
        <div className="hero-lock">🔐</div>
      </div>

      <div className="two-column">
        <div className="card">
          <div className="card-title">
            <div className="step-number">01</div>
            <div>
              <h3>Select Cover Image</h3>
              <p>PNG is recommended for reliable LSB storage.</p>
            </div>
          </div>

          <label className="drop-zone">
            <span className="upload-icon">☁️</span>
            <b>{file ? file.name : "Choose an image"}</b>
            <small>PNG, JPG, JPEG or BMP • Click to browse</small>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/bmp"
              onChange={(e) => {
                const selected = e.target.files[0];
                setFile(selected || null);
                setPreview("");
                setStatus("");
              }}
            />
          </label>

          {file && (
            <div className="file-chip">
              <span>✓</span> {file.name}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-title">
            <div className="step-number">02</div>
            <div>
              <h3>Enter Secret Message</h3>
              <p>Your message will be converted into binary.</p>
            </div>
          </div>

          <textarea
            className="message-box"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your secret message here..."
          />

          <button className="primary-btn" onClick={encodeMessage}>
            🔐 Encode & Download
          </button>
        </div>
      </div>

      {status && (
        <div className={"alert " + type}>
          {type === "success" ? "✓ " : "⚠ "}{text}
        </div>
      )}

      {preview && (
        <div className="card result-card">
          <div>
            <span className="eyebrow">RESULT</span>
            <h3>Stego Image Created</h3>
            <p>The secret message is now hidden inside the image.</p>
          </div>
          <img className="result-image" src={preview} alt="Encoded result" />
        </div>
      )}
    </section>
  );
}