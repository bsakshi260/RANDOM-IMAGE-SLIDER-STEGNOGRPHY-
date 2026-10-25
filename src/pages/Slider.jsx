import { useEffect, useRef, useState } from "react";

const demoImages = [
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80"
];

export default function Slider() {
  const [original, setOriginal] = useState("");
  const [stego, setStego] = useState("");
  const [position, setPosition] = useState(50);
  const [randomImage, setRandomImage] = useState(demoImages[0]);
  const frameRef = useRef(null);
  const stegoRef = useRef(null);

  useEffect(() => {
    function resize() {
      if (frameRef.current && stegoRef.current) {
        stegoRef.current.style.width = frameRef.current.clientWidth + "px";
      }
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [original, stego]);

  function chooseRandom() {
    const next = demoImages[Math.floor(Math.random() * demoImages.length)];
    setRandomImage(next);
  }

  return (
    <section>
      <div className="hero slider-hero">
        <div>
          <span className="eyebrow">MODULE 03</span>
          <h2>Random Image Slider</h2>
          <p>
            Select a candidate carrier image randomly, then compare the
            original image with its stego version.
          </p>
        </div>
        <div className="hero-lock">🎲</div>
      </div>

      <div className="card random-card">
        <div className="random-header">
          <div>
            <span className="eyebrow dark">RANDOM IMAGE SELECTION</span>
            <h3>Choose a Candidate Image</h3>
            <p>Random selection is a supporting UI feature of the steganography workflow.</p>
          </div>
          <button className="secondary-btn" onClick={chooseRandom}>🎲 Random Image</button>
        </div>

        <div className="random-preview">
          <img src={randomImage} alt="Random candidate" />
        </div>
      </div>

      <div className="card">
        <div className="upload-grid">
          <label className="mini-upload">
            <b>Original / Cover Image</b>
            <span>{original ? "Image selected ✓" : "Select cover image"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) setOriginal(URL.createObjectURL(f));
              }}
            />
          </label>

          <label className="mini-upload">
            <b>Stego Image</b>
            <span>{stego ? "Image selected ✓" : "Select hidden-message image"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) setStego(URL.createObjectURL(f));
              }}
            />
          </label>
        </div>

        {original && stego ? (
          <>
            <div className="comparison" ref={frameRef}>
              <img src={original} alt="Original cover" />
              <div className="comparison-after" style={{ width: `${position}%` }}>
                <img ref={stegoRef} src={stego} alt="Stego" />
              </div>
              <div className="comparison-line" style={{ left: `${position}%` }}>
                <div className="handle">↔</div>
              </div>
              <input
                className="comparison-input"
                type="range"
                min="0"
                max="100"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
              />
            </div>
            <div className="slider-labels">
              <span>Original / Cover</span>
              <span>Stego Image</span>
            </div>
          </>
        ) : (
          <div className="empty-slider">
            <div>↔</div>
            <h3>Upload both images</h3>
            <p>The comparison slider will become active after selecting the cover and stego images.</p>
          </div>
        )}
      </div>

      <div className="info-grid">
        <div className="info-card">
          <span>01</span>
          <h3>Image Selection</h3>
          <p>Candidate carrier images can be selected through the random image component.</p>
        </div>
        <div className="info-card">
          <span>02</span>
          <h3>Visualization</h3>
          <p>The slider provides a direct visual comparison between cover and stego images.</p>
        </div>
        <div className="info-card">
          <span>03</span>
          <h3>Steganography</h3>
          <p>The slider itself does not improve security; it supports image selection and demonstration.</p>
        </div>
      </div>
    </section>
  );
}