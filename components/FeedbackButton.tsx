"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MessageSquareHeart } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
        title="Send feedback"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 240, damping: 18 }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        className="fixed bottom-5 right-5 z-[90] inline-flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/30 hover:bg-black focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
      >
        <span className="relative inline-flex">
          <MessageSquareHeart size={18} />
          {!reduce && (
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-ping"
            />
          )}
        </span>
        <span className="text-sm font-semibold tracking-tight">Feedback</span>
      </motion.button>

      <FeedbackModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
