import "./Marquee.css";

const items = [
  "iPhone", "MacBook Air", "iPad Pro", "Apple Watch",
  "AirPods Pro", "Mac mini", "iPhone 16 Pro", "MacBook Pro",
];

const Track = ({ reverse = false }) => (
  <div className={`mq-track${reverse ? " mq-reverse" : ""}`} aria-hidden="true">
    {[...items, ...items].map((item, i) => (
      <span key={i} className="mq-item">
        <span className="mq-sep" aria-hidden="true">—</span>
        {item}
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="mq-root" aria-hidden="true">
    <Track />
    <div className="mq-fade-l" />
    <div className="mq-fade-r" />
  </div>
);

export default Marquee;
