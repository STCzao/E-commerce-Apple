import { AnimatePresence, motion } from "framer-motion";
import useConfirmStore from "../../../store/confirmStore";

const ConfirmModal = () => {
  const { isOpen, title, message, confirmLabel, cancelLabel, danger, onConfirm, close } =
    useConfirmStore();

  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              className="w-full max-w-sm bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <h2 id="confirm-title" className="font-semibold text-[#1d1d1f] text-base">
                  {title}
                </h2>
                {message && (
                  <p className="text-sm text-[#6e6e73] leading-relaxed">{message}</p>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={close}
                  className="px-4 py-2 rounded-full text-sm text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    danger
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/85"
                  }`}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
