import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
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
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>
      <p className="text-sm text-center">
        ¿No tenés cuenta?{" "}
        <Link to="/register" className="underline">
          Registrate
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
