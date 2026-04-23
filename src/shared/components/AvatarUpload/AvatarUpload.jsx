import { useRef, useState } from "react";

const CLOUD_NAME   = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AvatarUpload = ({ currentImg, initial = "?", onUploaded }) => {
  const inputRef  = useRef(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(currentImg ?? null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", UPLOAD_PRESET);
      form.append("folder", "apple-store/avatars");

      const res  = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: form }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message ?? "Upload failed");

      setPreview(data.secure_url);
      onUploaded(data.secure_url);
    } catch (err) {
      setPreview(currentImg ?? null);
      onUploaded(null, err.message);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      aria-label="Cambiar foto de perfil"
      className="relative w-20 h-20 rounded-full border-2 border-black/10 bg-[#f5f5f7] overflow-hidden shrink-0 flex items-center justify-center shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
    >
      {preview ? (
        <img src={preview} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="text-3xl font-semibold text-[#1d1d1f]/25">{initial}</span>
      )}

      {/* Overlay hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
        {loading ? (
          <svg className="animate-spin w-5 h-5 text-white opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a1 1 0 001 1h16a1 1 0 001-1v-2.5M16 6l-4-4-4 4M12 2v13" />
          </svg>
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </button>
  );
};

export default AvatarUpload;
