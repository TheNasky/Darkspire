import { motion } from "framer-motion";
import { useState } from "react";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmationName, highlights }) {
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmationName && inputName !== confirmationName) {
      setError("Character name doesn't match");
      return;
    }
    setInputName("");
    setError("");
    onConfirm();
  };

  const highlightText = (text) => {
    if (!highlights) return text;

    // If highlights is a string, convert it to an array
    const highlightArray = Array.isArray(highlights) ? highlights : [highlights];

    let highlightedText = text;
    highlightArray.forEach(highlight => {
      if (highlight) {
        const regex = new RegExp(`(${highlight})`, 'gi');
        highlightedText = highlightedText.replace(
          regex,
          '<span class="text-red-600 font-semibold">$1</span>'
        );
      }
    });

    return (
      <span dangerouslySetInnerHTML={{ __html: highlightedText  }} />
    );
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#F5E6D3] rounded-xl p-6 max-w-4xl w-full border-4 border-[#2A160C]/20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="text-xl font-bold text-[#2A160C] mb-4">{title}</h2>
        <p className="text-[#2A160C]/80 mb-6">{highlightText(message)}</p>

        {confirmationName && (
          <div className="mb-6">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter character name to confirm"
              className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#2A160C]/20 
                      text-[#2A160C] placeholder-[#8B4513]/50
                      focus:outline-none focus:border-[#2A160C]/40"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        )}

        <div className="flex justify-end space-x-4 mb-[-0.35rem]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[#2A160C] hover:bg-[#2A160C]/10"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 