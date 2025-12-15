import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    // We use gsap.context for proper cleanup in React
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const contactTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-section",
          // Fix: Trigger earlier on mobile (95% down) vs Desktop (80% down)
          // This ensures content appears even if the section is short on mobile
          start: isMobile ? "top 95%" : "top 80%",
          end: "bottom center",
          toggleActions: "play none none none",
        },
      });

      // Animate title from bottom
      contactTimeline.fromTo(
        ".contact-section h3",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Animate contact boxes with stagger from bottom
      contactTimeline.fromTo(
        ".contact-box",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, contactRef); // Scope selector to this component

    // Clean up
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    // Added ref={contactRef} to the main container for scoping
    <div
      className="contact-section section-container"
      id="contact"
      ref={contactRef}
    >
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                {config.contact.email}
              </a>
            </p>
            <h4>Location</h4>
            <p>
              <span>{config.social.location}</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={config.contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href={config.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Customized by <span>{config.developer.fullName}</span> | Original
              Design by [Repo Author]
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
