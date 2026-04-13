import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search...' }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative bg-background-alt border rounded-lg transition-all ${
      focused ? 'border-gold ring-2 ring-gold/20' : 'border-border'
    }`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-text-secondary" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none rounded-lg pl-12 pr-12 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0"
      />

      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => {
            onClear && onClear();
            setFocused(false);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
