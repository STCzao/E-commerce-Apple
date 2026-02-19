import { useState } from "react";
import { Link } from "react-router-dom";

const ContactoForm = () => {
  const [result, setResult] = useState("");
  const [capturarNombre, setCapturarNombre] = useState("");
  const [capturarTelefono, setCapturarTelefono] = useState("");
  const [capturarEmail, setCapturarEmail] = useState("");
  const [capturarMensaje, setCapturarMensaje] = useState("");

  const [errors, setErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();

    let newErrors = {};
    let isValid = true;

    if (capturarNombre.trim() === "") {
      newErrors.nombre = "El nombre es obligatorio.";
      isValid = false;
    }

    if (capturarTelefono.trim() === "") {
      newErrors.telefono = "El teléfono es obligatorio.";
      isValid = false;
    } else if (!/^\d{10,15}$/.test(capturarTelefono)) {
      newErrors.telefono = "Ingrese un número de teléfono válido.";
      isValid = false;
    }

    if (capturarEmail.trim() === "") {
      newErrors.email = "El email es obligatorio.";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(capturarEmail)
    ) {
      newErrors.email = "Ingrese un email válido.";
      isValid = false;
    }

    if (capturarMensaje.trim() === "") {
      newErrors.mensaje = "El mensaje es obligatorio.";
      isValid = false;
    } else if (capturarMensaje.trim().length <= 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres";
      isValid = false;
    } else if (capturarMensaje.trim().length >= 200) {
      newErrors.mensaje = "El mensaje tiene un límite de 200 caracteres";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setResult("Por favor, completá todos los campos.");
      return;
    }

    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "bef8a01e-8777-42f5-9390-10e86de92262");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("¡Formulario enviado correctamente!");
      event.target.reset();
      setCapturarNombre("");
      setCapturarTelefono("");
      setCapturarEmail("");
      setCapturarMensaje("");
      setErrors({});
    } else {
      console.log("Error", data);
      setResult(
        "Ocurrió un errror al enviar el formulario. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center text-sm text-slate-800"
        >
          <div className="max-w-96 w-full px-4">
            <label className="font-medium text-white">Nombre</label>
            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-white transition-all overflow-hidden">
              <input
                type="text"
                name="Nombre"
                className="h-full text-white px-2 w-full outline-none bg-transparent autofill:bg-transparent"
                placeholder="Ingrese su nombre completo"
                value={capturarNombre}
                onChange={(e) => setCapturarNombre(e.target.value)}
              />
              {errors.nombre && (
                <span className="text-red-400 text-xs mt-1">
                  {errors.nombre}
                </span>
              )}
            </div>
            <label className="font-medium text-white">Teléfono</label>
            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-white transition-all overflow-hidden">
              <input
                type="tel"
                name="Teléfono"
                className="h-full text-white px-2 w-full outline-none bg-transparent autofill:bg-transparent"
                placeholder="Ingrese un teléfono"
                value={capturarTelefono}
                onChange={(e) => setCapturarTelefono(e.target.value)}
              />
              {errors.telefono && (
                <span className="text-red-400 text-xs mt-1">
                  {errors.telefono}
                </span>
              )}
            </div>
            <label className="font-medium text-white">Email</label>
            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-white transition-all overflow-hidden">
              <input
                type="mail"
                name="Email"
                className="h-full text-white px-2 w-full outline-none bg-transparent autofill:bg-transparent"
                placeholder="Ingrese su email"
                value={capturarEmail}
                onChange={(e) => setCapturarEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red-400 text-xs mt-1">
                  {errors.email}
                </span>
              )}
            </div>
            <label className="font-medium mt-4 text-white">Mensaje</label>
            <textarea
              rows="6"
              name="Mensaje"
              className="text-white w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-white transition-all"
              placeholder="Ingrese su mensaje"
              value={capturarMensaje}
              onChange={(e) => setCapturarMensaje(e.target.value)}
            ></textarea>
            {errors.mensaje && (
              <span className="text-red-400 text-xs mt-1">
                {errors.mensaje}
              </span>
            )}
            <button
              type="submit"
              className="bg-white/80 cursor-pointer flex items-center justify-center text-black gap-1 mt-10 border hover:border-slate-400/70 text-black/80 py-2 px-6 w-full rounded-full"
            >
              Enviar
            </button>
          </div>
        </form>
        {result && (
          <span
            className={`text-sm mt-4 block text-center ${
              result.includes("correctamente")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {result}
          </span>
        )}
        <button className="mt-10 bg-white/10 text-white/80 border hover:border-slate-400/70 rounded-full px-6 py-2 text-sm sm:text-base">
          <Link to={"/"}>Volver al inicio</Link>
        </button>
      </div>
    </div>
  );
};

export default ContactoForm;
