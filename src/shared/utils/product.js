export const getProductName  = (p) => p?.name  ?? p?.nombreProducto ?? "";
export const getProductPrice = (p) => p?.price ?? p?.precio ?? 0;
export const getProductImage = (p) => p?.image ?? p?.imagenes?.[0]?.url ?? "";
