import { Link } from "react-router-dom";

const WA_NUMBER = "543816754618";

const WAIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const CardItem = ({ card }) => {
  const name  = card.name  ?? card.nombreProducto;
  const price = card.price ?? card.precio;
  const image = card.image ?? card.imagenes?.[0]?.url;

  const waMessage = encodeURIComponent(
    `Hola! Quiero consultar sobre: *${name}* (${price}). ¿Podés darme más info?`
  );

  return (
    <article className="group h-full flex flex-col bg-white rounded-2xl border border-black/[0.06] overflow-hidden hover:border-black/[0.12] hover:shadow-xl hover:shadow-black/[0.07] hover:-translate-y-0.5 transition-all duration-300">

      {/* Zona superior — navega al detalle */}
      <Link
        to={`/catalogo/${card.id}`}
        className="flex-1 flex flex-col focus-visible:outline-none"
        aria-label={`Ver detalle de ${name}`}
      >
        {/* Imagen normalizada */}
        <div className="aspect-square bg-[#f5f5f7] flex items-center justify-center p-5 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-black/15" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path strokeLinecap="round" d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-[10px] tracking-wide">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Nombre y precio */}
        <div className="px-3.5 pt-3 pb-2 flex flex-col gap-1">
          <p className="font-medium text-[#1d1d1f] text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
            {name}
          </p>
          <p className="font-semibold text-[#1d1d1f] text-sm">{price}</p>
        </div>
      </Link>

      {/* Zona de acciones — separada del Link principal */}
      <div className="px-3.5 pb-3.5 flex gap-2">
        <Link
          to={`/catalogo/${card.id}`}
          className="flex-1 py-2 rounded-full text-center text-xs font-medium bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-colors duration-200"
        >
          Ver detalle
        </Link>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar ${name} por WhatsApp`}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#25D366] hover:text-white transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <WAIcon />
        </a>
      </div>
    </article>
  );
};

export default CardItem;
