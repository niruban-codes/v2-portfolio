import "./styles/About.css";
import { config } from "../config";

const About = () => {
  // 1. Get the text safely
  const rawText = config.about?.description || "";

  // 2. CLEAN THE TEXT:
  // Replace invisible "non-breaking spaces" (\u00A0) with real spaces,
  // then split by any whitespace.
  const words = rawText
    .replace(/\u00A0/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{config.about?.title || "About Me"}</h3>

        {/* THE FIX: 
            - We use a <div> instead of <p> to dodge all global paragraph styles.
            - We use 'display: flex' with 'gap'. This forces the browser 
              to put 8px of empty space between every word span.
        */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // Allows text to wrap to the next line
            gap: "8px", // FORCE PHYSICAL GAP (Adjust this number if needed)
            rowGap: "2px", // Space between lines
            alignItems: "baseline", // Keeps text aligned nicely

            // Typography
            color: "white",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "24px",
            fontWeight: "400",
            lineHeight: "1.6",
            width: "100%",
          }}
        >
          {words.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
