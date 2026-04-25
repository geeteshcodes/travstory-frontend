"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

export interface AttractionCardProps {
  title: string;
  description: string;
  image: string;
}

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'>
       <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
         <stop offset='0' stop-color='#0ea5e9'/><stop offset='1' stop-color='#0284c7'/>
       </linearGradient></defs>
       <rect width='100%' height='100%' fill='url(#g)'/>
     </svg>`
  );

export default function AttractionCard({ title, description, image }: AttractionCardProps) {
  const [src, setSrc] = useState(image);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="w-[180px] shrink-0 bg-white rounded-xl overflow-hidden border border-slate-100 shadow-md cursor-pointer group"
    >
      <div className="h-24 overflow-hidden bg-slate-100">
        <img
          src={src}
          alt={title}
          onError={() => src !== FALLBACK && setSrc(FALLBACK)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-3">
        <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{title}</h4>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>
        <button className="w-full py-1.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95">
          Add to Trip
          <Plus size={12} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}