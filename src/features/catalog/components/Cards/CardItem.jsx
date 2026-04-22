import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CardItem = ({ card, featured = false }) => {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, on: false });
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientY - r.top) / r.height - 0.5) * 6;
    const y = -((e.clientX - r.left) / r.width - 0.5) * 6;
    setTilt({ x, y, on: true });
  };

  const tiltStyle = tilt.on
    ? { transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
    : {};

  if (featured) {
    return (
      <div ref={ref}
        className="relative h-full min-h-[380px] rounded-2xl overflow-hidden cursor-pointer select-none transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/40"
        style={tilt.on ? tiltStyle : {}}
        onClick={() => setFlipped(!flipped)}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt(t => ({ ...t, on: false }))}
      >
        <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>

          {/* Frente */}
          <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-10 bg-white">
              <img src={card.image} alt={card.name} className="max-h-64 object-contain drop-shadow-md" />
            </div>
            <div className="md:w-56 flex flex-col justify-between p-6 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Destacado</span>
                <p className="text-xl font-semibold text-gray-900 leading-snug mt-2">{card.name}</p>
              </div>
              <div>
                <p className="text-sm font-mono text-gray-500">{card.price}</p>
                <p className="text-[11px] text-gray-300 mt-4">Click para ver más →</p>
              </div>
            </div>
          </div>

          {/* Reverso */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between p-8 bg-white rounded-2xl overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-3">{card.name}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-gray-600">{card.price}</span>
              <Link to="/compra" onClick={e => e.stopPropagation()}>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Comprar
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full h-80 cursor-pointer select-none transition-all duration-300"
      style={tilt.on ? tiltStyle : {}}
      onClick={() => setFlipped(!flipped)}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt(t => ({ ...t, on: false }))}
    >
      <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>

        {/* Frente */}
        <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-black/10 transition-shadow duration-300">
          <div className="flex-1 flex items-center justify-center p-5 bg-white">
            <img src={card.image} alt={card.name} className="h-full max-h-40 w-full object-contain drop-shadow-sm" />
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <p className="font-medium text-gray-900 text-sm">{card.name}</p>
            <p className="text-xs font-mono text-gray-400 mt-0.5">{card.price}</p>
          </div>
        </div>

        {/* Reverso */}
        <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col justify-between bg-white rounded-2xl p-5 shadow-sm [transform:rotateY(180deg)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-5 mt-2">{card.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-gray-600">{card.price}</span>
            <Link to="/compra" onClick={e => e.stopPropagation()}>
              <button className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
                Comprar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
