import { techMarqueeItems } from "@/lib/tech-marquee-data";

export function TechMarquee() {
  // Duplicate array 3 times to ensure smooth infinite loop without visual seams
  const items = [...techMarqueeItems, ...techMarqueeItems, ...techMarqueeItems];

  return (
    <section className="tech-marquee-section" aria-label="Core Engineering Tech Stack">
      <div className="site-container tech-marquee-header">
        <span className="marquee-eyebrow">Enterprise &amp; AI Stack</span>
        <h3 className="marquee-title">Technologies powering production systems</h3>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-fade-left" aria-hidden="true" />
        <div className="marquee-fade-right" aria-hidden="true" />

        <div className="marquee-track">
          {items.map((tech, idx) => (
            <div key={`${tech.name}-${idx}`} className="marquee-card">
              <span
                className="marquee-icon"
                style={{ color: tech.color }}
                dangerouslySetInnerHTML={{ __html: tech.svg }}
              />
              <div className="marquee-info">
                <span className="marquee-name">{tech.name}</span>
                <span className="marquee-cat">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
