import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={form.nombre}
        onChange={handleChange}
        className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        required
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white rounded-full py-2 hover:bg-neutral-800 transition-colors disabled:opacity-50"
      >
        {loading ? "Registrando..." : "Crear cuenta"}
      </button>
      <p className="text-sm text-center">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="underline">
          Iniciá sesión
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
