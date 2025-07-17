import React from "react"; // Ya no necesitas useState aquí
import CardItem from "./CardItem"; // Importa el nuevo componente CardItem

const Cards = ({ busqueda, title, id }) => {
  if (!busqueda || busqueda.length === 0) {
    return null;
  }

  return (
    <div className="text-center mt-20" id={id}>
      {title && <div className="text-5xl font-semibold mb-12">{title}</div>}
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {busqueda.map((card) => (
          // Renderiza CardItem para cada tarjeta, pasando la 'card' como prop
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Cards;