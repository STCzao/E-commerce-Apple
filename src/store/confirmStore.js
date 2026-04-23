import { create } from "zustand";

const useConfirmStore = create((set) => ({
  isOpen: false,
  title: "",
  message: "",
  confirmLabel: "Confirmar",
  cancelLabel: "Cancelar",
  danger: false,
  onConfirm: null,

  confirm: ({ title, message, confirmLabel = "Confirmar", cancelLabel = "Cancelar", danger = false, onConfirm }) =>
    set({ isOpen: true, title, message, confirmLabel, cancelLabel, danger, onConfirm }),

  close: () => set({ isOpen: false, onConfirm: null }),
}));

export default useConfirmStore;
