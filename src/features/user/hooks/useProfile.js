import { useState, useEffect } from "react";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import userService from "../../../services/userService";

const useProfile = () => {
  const { user, updateUser } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const [profileForm, setProfileForm] = useState({
    nombreUsuario: user?.nombreUsuario ?? "",
    img: user?.img ?? "",
  });

  const [passForm, setPassForm] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });

  const [saving, setSaving]       = useState(false);
  const [savingPass, setSavingPass] = useState(false);

  useEffect(() => {
    setProfileForm({
      nombreUsuario: user?.nombreUsuario ?? "",
      img: user?.img ?? "",
    });
  }, [user]);

  const handleProfileChange = (e) =>
    setProfileForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePassChange = (e) =>
    setPassForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const setProfileImg = async (url) => {
    if (!url) return;
    setProfileForm((p) => ({ ...p, img: url }));
    try {
      const { data } = await userService.updateProfile({ img: url });
      updateUser(data.usuario ?? { img: url });
      addToast("Foto actualizada", "success");
    } catch {
      addToast("No se pudo guardar la foto", "error");
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (profileForm.nombreUsuario && profileForm.nombreUsuario.length < 3) {
      addToast("El nombre debe tener al menos 3 caracteres", "error");
      return;
    }
    setSaving(true);
    const payload = {};
    if (profileForm.nombreUsuario) payload.nombreUsuario = profileForm.nombreUsuario;
    if (profileForm.img)           payload.img           = profileForm.img;
    try {
      const { data } = await userService.updateProfile(payload);
      updateUser(data.usuario ?? profileForm);
      addToast("Perfil actualizado correctamente", "success");
    } catch {
      addToast("No se pudo actualizar el perfil", "error");
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (passForm.nueva !== passForm.confirmar) {
      addToast("Las contraseñas no coinciden", "error");
      return;
    }
    if (passForm.nueva.length < 8) {
      addToast("La contraseña debe tener al menos 8 caracteres", "error");
      return;
    }
    setSavingPass(true);
    try {
      await userService.changePassword({
        contrasenaActual: passForm.actual,
        nuevaContrasena: passForm.nueva,
      });
      addToast("Contraseña cambiada correctamente", "success");
      setPassForm({ actual: "", nueva: "", confirmar: "" });
    } catch (err) {
      const msg = err?.response?.data?.message ?? "No se pudo cambiar la contraseña";
      addToast(msg, "error");
    } finally {
      setSavingPass(false);
    }
  };

  return {
    user,
    profileForm,
    passForm,
    saving,
    savingPass,
    handleProfileChange,
    handlePassChange,
    saveProfile,
    savePassword,
    setProfileImg,
  };
};

export default useProfile;
