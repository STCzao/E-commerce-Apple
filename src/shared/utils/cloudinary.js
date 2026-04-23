/**
 * Inserta transformaciones de optimización en una URL de Cloudinary.
 * - f_auto  → WebP en Chrome/Safari, AVIF donde soportado
 * - q_auto  → calidad automática según contenido
 * - w_{n}   → redimensiona al ancho especificado (opcional)
 */
export const clOptimize = (url, { width } = {}) => {
  if (!url?.includes('/upload/')) return url ?? '';
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`);
  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
};
