import React,{ useState } from "react";

const MAGIC = "STEGANO1:";

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

export default function Decode() {
  const [file, setFile] = useState(null);
  const [decoded, setDecoded] = useState("");
  const [status, setStatus] = useState("");

  async function decodeMessage() {
    setDecoded("");
    setStatus("");

    if (!file) {
      setStatus("error|Please select a stego PNG image.");
      return;
    }

    try {
      const image = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let byteBuffer = "";
      let output = "";

      for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 4 === 0) continue;

        byteBuffer += (data[i] & 1).toString();

        if (byteBuffer.length === 8) {
          const byte = parseInt(byteBuffer, 2);
          output += String.fromCharCode(byte);
          byteBuffer = "";

          if (output.length > 1000000) break;
        }
      }

      const start = output.indexOf(MAGIC);

      if (start === -1) {
        throw new Error("No supported hidden message was found.");
      }

      const message = output
        .slice(start + MAGIC.length)
        .replace(/\0+$/, "");

      setDecoded(message);
      setStatus("success|Secret message decoded successfully.");
    } catch (error) {
      setStatus("error|" + error.message);
    }
  }

  const [type, text] = status.split("|");

  return (
    <section>
      <div className="hero decode-hero">
        <div>
          <span className="eyebrow">MODULE 02</span>
          <h2>Decode Secret Message</h2>
          <p>Extract the hidden text from a steganography image.</p>
        </div>
        <div className="hero-lock">🔓</div>
      </div>

      <div className="single-column">
        <div className="card">
          <div className="card-title">
            <div className="step-number">01</div>
            <div>
              <h3>Select Stego Image</h3>
              <p>Choose an image created by the Encode page.</p>
            </div>
          </div>

          <label className="drop-zone large">
            <span className="upload-icon">🖼️</span>
            <b>{file ? file.name : "Upload stego_image.png"}</b>
            <small>PNG recommended • Click to browse</small>
            <input
              type="file"
              accept="image/png,image/bmp"
              onChange={(e) => {
                setFile(e.target.files[0] || null);
                setDecoded("");
                setStatus("");
              }}
            />
          </label>

          <button className="primary-btn" onClick={decodeMessage}>
            🔓 Decode Message
          </button>
        </div>

        {status && (
          <div className={"alert " + type}>
            {type === "success" ? "✓ " : "⚠ "}{text}
          </div>
        )}

        <div className="card">
          <div className="card-title">
            <div className="step-number">02</div>
            <div>
              <h3>Decoded Message</h3>
              <p>The recovered secret message appears below.</p>
            </div>
          </div>

          <textarea
            className="message-box decoded"
            readOnly
            value={decoded}
            placeholder="No decoded message yet..."
          />

          {decoded && (
            <div className="success-box">
              <span>✓</span>
              <div>
                <b>Message recovered</b>
                <p>The hidden data was successfully extracted from the image.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}