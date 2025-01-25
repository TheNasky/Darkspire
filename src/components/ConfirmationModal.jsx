import { motion } from "framer-motion";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#F5E6D3] rounded-xl p-6 border-4 border-[#2A160C]/20 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-[1rem] lg:text-[1.3rem] font-bold text-[#2A160C] mb-4">
          {title}
        </h2>
        <p className="text-[0.8rem] lg:text-[1rem] text-[#8B4513] mb-6">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[0.7rem] lg:text-[0.9rem] font-medium text-[#2A160C] hover:bg-[#2A160C]/10"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-[0.7rem] lg:text-[0.9rem] font-medium bg-[#2A160C] text-white hover:bg-[#2A160C]/80"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 