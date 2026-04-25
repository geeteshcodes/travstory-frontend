"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Star, X, Check, Loader2 } from "lucide-react";
import { submitFeedback, type FeedbackCategory } from "@/lib/api";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES: { value: FeedbackCategory; label: string }[] = [
  { value: "praise", label: "Praise" },
  { value: "suggestion", label: "Suggestion" },
  { value: "bug", label: "Bug" },
  { value: "other", label: "Other" },
];

export default function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descId = useId();
  const ratingLabelId = useId();
  const categoryId = useId();
  const messageId = useId();
  const emailId = useId();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState<FeedbackCategory>("suggestion");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setRating(0);
    setHoverRating(0);
    setCategory("suggestion");
    setMessage("");
    setEmail("");
    setSubmitting(false);
    setDone(false);
    setError(null);
  }, []);

  // Focus management and scroll lock
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 50);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // Keyboard: ESC + focus trap
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (rating < 1) {
      setError("Please select a star rating.");
      return;
    }
    if (!message.trim()) {
      setError("Please tell us a little about your experience.");
      return;
    }

    setSubmitting(true);
    try {
      await submitFeedback({
        rating,
        category,
        message: message.trim(),
        email: email.trim() || undefined,
        page_url: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
      setDone(true);
      setTimeout(() => {
        onClose();
        setTimeout(reset, 300);
      }, 1400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleStarKey(e: React.KeyboardEvent<HTMLButtonElement>, value: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setRating(Math.min(5, (rating || value) + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setRating(Math.max(1, (rating || value) - 1));
    }
  }

  const displayRating = hoverRating || rating;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-2 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h2 id={titleId} className="text-xl font-semibold text-gray-900">
                  Send feedback
                </h2>
                <p id={descId} className="text-sm text-gray-500 mt-1">
                  Help us make TravStory better. Takes 15 seconds.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close feedback form"
                className="p-2 -mr-2 -mt-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            {!done ? (
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                {/* Star Rating */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span
                      id={ratingLabelId}
                      className="text-sm font-medium text-gray-700"
                    >
                      How was your experience?
                    </span>
                    {displayRating > 0 && (
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        {displayRating}/5
                      </span>
                    )}
                  </div>
                  <div
                    role="radiogroup"
                    aria-labelledby={ratingLabelId}
                    aria-required="true"
                    className="flex items-center gap-2"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => {
                      const filled = n <= displayRating;
                      return (
                        <button
                          ref={n === 1 ? firstFieldRef : undefined}
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={rating === n}
                          aria-label={`${n} of 5 stars`}
                          onClick={() => setRating(n)}
                          onMouseEnter={() => setHoverRating(n)}
                          onFocus={() => setHoverRating(n)}
                          onBlur={() => setHoverRating(0)}
                          onKeyDown={(e) => handleStarKey(e, n)}
                          className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 transition-transform hover:scale-110 active:scale-95"
                        >
                          <Star
                            size={32}
                            className={`${filled ? "fill-amber-400 text-amber-400" : "text-gray-300"} transition-colors`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor={categoryId}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id={categoryId}
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor={messageId}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    What&apos;s on your mind?
                  </label>
                  <textarea
                    id={messageId}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    maxLength={4000}
                    placeholder="Tell us what worked, what didn't, or what you wish existed…"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition resize-none"
                  />
                </div>

                {/* Email (optional) */}
                <div>
                  <label
                    htmlFor={emailId}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="font-normal text-gray-400">(optional, for reply)</span>
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting && <Loader2 size={16} className="animate-spin" />}
                    {submitting ? "Sending…" : "Send feedback"}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                role="status"
                aria-live="polite"
                className="px-6 py-12 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4"
                >
                  <Check size={32} strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900">Thanks for the note!</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-xs">
                  We&apos;ll read every word. Closing in a moment…
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}