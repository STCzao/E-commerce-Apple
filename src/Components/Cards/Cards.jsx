import CardItem from "./CardItem";

const Cards = ({ busqueda, title, id }) => {
  if (!busqueda || busqueda.length === 0) {
    return null;
  }

  {
    /* Consultamos si busqueda contiene algun valor o si existe una 
    coincidencia con los valores obtenidos de carditem */
  }

  return (
    <div className="text-center mt-20" id={id}>
      {title && <div className="text-5xl font-semibold mb-12">{title}</div>}
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {busqueda.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
      {/* Utilizamos el metodo map para devolver un valor y recibimos card como parametro */}
    </div>
  );
};

export default Cards;
